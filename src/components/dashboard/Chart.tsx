import { Grid, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useEffect } from "react";
import { axisBottom, axisLeft, line, max, min, scaleLinear, scaleTime, select } from "d3";
// import { roundUpToHumainValue } from "@utils/roundUpToHumainValue";
// import { roundDownToHumainValue } from "@utils/roundDownToHumainValue";
import { betweenDate } from "@utils/betweenDate";

export interface ChartProps {
  earningData: number[];
  dates: string[];
  yellowZone: [number, number];
  greenRange: [string, string];
  annoTestDate: string;
  pointAnnotationDate: string;
  yAxisTickets?: number[];
  xAxisTickets?: string[];
}

const SVG_HEIGHT = 256,
  SVG_WIDTH = 464,
  SVG_PADDING_LEFT = 50,
  SVG_PADDING_RIGHT = 40,
  SVG_PADDING_TOP = 40,
  SVG_PADDING_BOTTOM = 40,
  SVG_INNER_WIDTH = SVG_WIDTH - (SVG_PADDING_LEFT + SVG_PADDING_RIGHT),
  SVG_INNER_HEIGHT = SVG_HEIGHT - (SVG_PADDING_BOTTOM + SVG_PADDING_TOP);
const styles = makeStyles(() => ({
  svg: {
    width: "100%",
    height: "100%",
  },
}));
const Chart: React.FC<ChartProps> = (props) => {
  const {
    earningData,
    dates: datesStrings,
    yAxisTickets,
    xAxisTickets,
    yellowZone,
    greenRange,
    annoTestDate,
    pointAnnotationDate,
  } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const classes = styles();

  useEffect(() => {
    const dates = datesStrings.map((date) => new Date(date));
    const svg = select(svgRef.current);
    const minDate = min(dates)!;
    const maxDate = max(dates)!;
    const xScaleAxis = scaleTime().domain([minDate, maxDate]).range([0, SVG_INNER_WIDTH]);
    const minEarning = 7800; //roundDownToHumainValue(min(earningData, (value) => value)!);
    const maxEarning = 9600; //roundUpToHumainValue(max(earningData, (value) => value)!);
    const yScale = scaleLinear().domain([minEarning!, maxEarning!]).range([0, SVG_INNER_HEIGHT]);
    const yScaleAxis = scaleLinear().domain([maxEarning!, minEarning!]).range([0, SVG_INNER_HEIGHT]);
    const lineDrawer = line<number>()
      .x((_, index) => xScaleAxis(dates[index])!)
      .y((value) => yScale(value)!);
    const mainGroups = svg.html("").append("g").attr("transform", `translate(${SVG_PADDING_LEFT}, ${SVG_PADDING_TOP})`);
    const leftAxisGroup = mainGroups.append("g").attr("stroke", "#EEE8").style("font-size", 8);
    const bottomAxisGroup = mainGroups
      .append("g")
      .attr("transform", `translate(0, ${SVG_INNER_HEIGHT})`)
      .attr("stroke", "#0008")
      .style("font-size", 9)
      .style("font-weight", 200);
    const leftAxis = axisLeft(yScaleAxis).tickPadding(5);
    const bottomAxis = axisBottom(xScaleAxis)
      .ticks(7)
      .tickSizeOuter(0)
      .tickSizeInner(5)
      .tickFormat((date) =>
        (date as Date).toLocaleString("en-ca", {
          month: "short",
          day: "2-digit",
        })
      );
    const gridGroup = mainGroups.append("g");
    const yellowGroup = mainGroups.append("g");
    const pathGroup = mainGroups.append("g");
    const greenGroup = mainGroups.append("g");
    const ticketsGroup = mainGroups.append("g");
    const annoTestGroup = mainGroups.append("g");
    const pointAnnotationGroup = mainGroups.append("g");
    gridGroup
      .selectAll("line")
      .data(Array.isArray(yAxisTickets) ? yAxisTickets : yScaleAxis.ticks())
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("y1", (value) => yScale(value) + 1)
      .attr("x2", SVG_INNER_WIDTH)
      .attr("y2", (value) => yScale(value) + 1)
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 0);
    leftAxisGroup.call(Array.isArray(yAxisTickets) ? leftAxis.tickValues(yAxisTickets) : leftAxis);
    bottomAxisGroup.call(
      Array.isArray(xAxisTickets)
        ? bottomAxis.tickValues(
            xAxisTickets.map((date) => {
              return new Date(date);
            })
          )
        : bottomAxis
    );
    pathGroup
      .selectAll("path")
      .data([earningData.map((earn) => maxEarning - earn + minEarning)])
      .enter()
      .append("path")
      .attr("d", (value) => lineDrawer(value))
      .attr("stroke-dasharray", 0)
      .attr("fill", "none")
      .attr("stroke", "rgba(31,107,255,0.85)")
      .attr("stroke-width", 3);
    yellowGroup
      .selectAll("rect")
      .data([yellowZone])
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (value) => yScale(maxEarning - max(value)! + minEarning))
      .attr("width", SVG_INNER_WIDTH)
      .attr("height", (value) => yScale(max(value)!) - yScale(min(value)!))
      .attr("stroke", "#ff9500")
      .attr("fill", "#ff950055")
      .attr("stroke-dasharray", 1);
    greenGroup
      .selectAll("rect")
      .data([greenRange.map((date) => new Date(date))])
      .enter()
      .append("rect")
      .attr("y", 0)
      .attr("x", (value) => xScaleAxis(min(value)!))
      .attr("height", SVG_INNER_HEIGHT)
      .attr("width", (value) => xScaleAxis(max(value)!) - xScaleAxis(min(value)!))
      .attr("fill", "#0cd09655")
      .attr("stroke", "#c2c2c2")
      .attr("stroke-dasharray", 1)
      .attr("stroke-width", 1);
    greenGroup
      .append("rect")
      .attr("y", 0)
      .attr("x", xScaleAxis(min(greenRange.map((date) => new Date(date)))!) - 15)
      .attr("height", 60)
      .attr("width", 15)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", "#0cd096")
      .attr("stroke", "#0cd096")
      .attr("stroke-dasharray", 1)
      .attr("stroke-width", 1);
    greenGroup
      .append("text")
      .attr("y", 0)
      .attr("x", xScaleAxis(min(greenRange.map((date) => new Date(date)))!) - 15)
      .attr("height", 60)
      .attr("width", 15)
      .attr("rx", 2)
      .attr("ry", 2)
      .text("x-Axis range")
      .attr("transform", "rotate(-90 314.3125, 33.8046875), translate(98, -75)")
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("stroke", "#0cd096")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 0);
    ticketsGroup
      .append("rect")
      .attr("y", yScale((maxEarning - minEarning) / 1.4 + minEarning))
      .attr("x", SVG_INNER_WIDTH - 40)
      .attr("height", 15)
      .attr("width", 40)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", "#640df3")
      .attr("stroke", "#640df3")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 1);
    ticketsGroup
      .append("text")
      .attr("y", yScale((maxEarning - minEarning) / 1.4 + minEarning) + 10)
      .attr("x", SVG_INNER_WIDTH - 35)
      .text("Support")
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 0);
    ticketsGroup
      .append("rect")
      .attr("y", yScale((maxEarning - minEarning) / 5.5 + minEarning))
      .attr("x", SVG_INNER_WIDTH - 40)
      .attr("height", 15)
      .attr("width", 40)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", "#ffcc00")
      .attr("stroke", "#ffcc00")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 1);
    ticketsGroup
      .append("text")
      .attr("y", yScale((maxEarning - minEarning) / 5 + minEarning) + 8)
      .attr("x", SVG_INNER_WIDTH - 35)
      .text("Earning")
      .attr("font-size", 10)
      .attr("fill", "#00")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 0);
    annoTestGroup
      .selectAll("rect")
      .data([new Date(annoTestDate)])
      .enter()
      .append("line")
      .attr("y1", 0)
      .attr("x1", (value) => xScaleAxis(value))
      .attr("y2", SVG_INNER_HEIGHT)
      .attr("x2", (value) => xScaleAxis(value))
      .attr("stroke", "#212837")
      .attr("stroke-width", 1);
    annoTestGroup
      .append("rect")
      .attr("y", 7)
      .attr("x", xScaleAxis(new Date(annoTestDate)) - 15)
      .attr("height", 44)
      .attr("width", 15)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", "#212837")
      .attr("stroke", "#212837")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 1);
    annoTestGroup
      .append("text")
      .attr("y", 0)
      .attr("x", xScaleAxis(new Date(annoTestDate)) - 15)
      .text("Anno test")
      .attr("transform", "rotate(-90 314.3125, 33.8046875), translate(150, -121)")
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("stroke", "#0cd096")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 0);
    const [minIndex, maxIndex] = betweenDate(dates, new Date(pointAnnotationDate));
    pointAnnotationGroup
      .append("circle")
      .attr("y", 7)
      .attr("cx", xScaleAxis(new Date(pointAnnotationDate)))
      .attr("cy", yScale(maxEarning + minEarning - (earningData[maxIndex] + earningData[minIndex]) / 2))
      .attr("r", 8)
      .attr("fill", "#fff")
      .attr("stroke", "#ff2d55")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 2);
    pointAnnotationGroup
      .append("rect")
      .attr("y", yScale(maxEarning + minEarning - (earningData[maxIndex] + earningData[minIndex]) / 2) - 30)
      .attr("x", xScaleAxis(new Date(pointAnnotationDate)) - 37)
      .attr("height", 15)
      .attr("width", 75)
      .attr("fill", "#ff2d55")
      .attr("stroke", "#ff2d55")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 1);
    pointAnnotationGroup
      .append("text")
      .attr("y", yScale(maxEarning + minEarning - (earningData[maxIndex] + earningData[minIndex]) / 2) - 20)
      .attr("x", xScaleAxis(new Date(pointAnnotationDate)) - 35)
      .attr("fill", "#fff")
      .attr("stroke-dasharray", 0)
      .text("Point Annotation")
      .attr("font-size", 10)
      .attr("fill", "#fff")
      .attr("stroke", "#0cd096")
      .attr("stroke-dasharray", 0)
      .attr("stroke-width", 0);

    leftAxisGroup.selectAll("path.domain").remove();
    bottomAxisGroup.selectAll("path.domain").remove();
    leftAxisGroup.selectAll("line").remove();
    bottomAxisGroup.selectAll("line").attr("stroke", "#e0e0e0");
  }, [
    earningData,
    datesStrings,
    yAxisTickets,
    xAxisTickets,
    yellowZone,
    greenRange,
    annoTestDate,
    pointAnnotationDate,
  ]);

  return (
    <Grid container>
      <Grid xs={12} item>
        <svg ref={svgRef} className={classes.svg} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} />
      </Grid>
    </Grid>
  );
};

export default Chart;
