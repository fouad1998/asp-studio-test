import { Grid, makeStyles, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, FiberManualRecord } from "@material-ui/icons";

export interface RepartitionBarProps {
  amount: string;
  progress: number;
  elements: {
    title: string;
    color: string;
    percent: number;
  }[];
}

const styles = makeStyles((theme) => ({
  bar: {
    borderRadius: 10,
    height: 10,
    overflow: "hidden",
    margin: theme.spacing(2, 0, 2),
  },
  elementList: {
    margin: theme.spacing(0, 0, 2),
  },
}));
const RepartitionBar: React.FC<RepartitionBarProps> = (props) => {
  const { elements, amount, progress } = props;
  const classes = styles();

  return (
    <Grid container>
      <Grid xs={12} item>
        <Grid container>
          <Grid xs={12} item>
            <Typography style={{ fontSize: "1.5rem", fontWeight: 900 }}>{amount}</Typography>
          </Grid>
          <Grid xs={12} item>
            <Grid style={{ color: progress >= 0 ? "green" : "red" }} alignItems="center" container>
              <Grid style={{ display: "flex", alignItems: "center", fontWeight: 600 }} item>
                {progress >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 600, fontSize: "0.8rem" }}>
                  {progress >= 0 ? "+" : "-"}
                  {progress}%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Grid wrap="nowrap" className={classes.bar} container>
          {elements.map((el, index) => (
            <Grid style={{ backgroundColor: el.color, width: `${el.percent}%` }} key={index} item></Grid>
          ))}
        </Grid>
      </Grid>
      <Grid xs={12} className={classes.elementList} item>
        {elements.map((el, index) => (
          <Grid key={index} justify="space-between" alignItems="center" spacing={1} container>
            <Grid item>
              <FiberManualRecord style={{ color: el.color, fontSize: "0.8rem" }} />
            </Grid>
            <Grid style={{ flex: "1 1 auto" }} item>
              <Typography style={{ fontSize: "0.8rem" }}>{el.title}</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 600, fontSize: "0.8rem" }}>{el.percent}%</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid xs={12} item>
        <Typography style={{ fontSize: "0.8rem" }} align="right">
          Powered by
          <span style={{ fontWeight: 600, padding: "0 2px" }}>
            <span style={{ color: "#1f6bff " }}>G</span>
            <span style={{ color: "#1f6bff " }}>o</span>
            <span style={{ color: "#e6180d " }}>o</span>
            <span style={{ color: "#ff9500 " }}>g</span>
            <span style={{ color: "#1f6bff " }}>l</span>
            <span style={{ color: "#e6180d " }}>e</span>
          </span>
          Analytics API
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RepartitionBar;
