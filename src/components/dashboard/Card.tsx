import { Button, Grid, IconButton, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, ChevronRight } from "@material-ui/icons";
import React from "react";

export interface CardProps {
  title: string;
  amount: string;
  progressBarPercent: number;
  percentProgress: number;
  subTitle: string;
  backgroundGradientStartsColor: string;
  backgroundGradientEndsColor: string;
  BackgroundImage: React.FC<any>;
}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    position: "relative",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[100],
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    right: -5,
    bottom: -18,
    height: 80,
    width: 80,
  },
  title: {
    color: theme.palette.grey[100],
    fontWeight: 600,
    fontSize: "1.2rem",
    padding: theme.spacing(0, 0, 1),
  },
  amount: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
  },
  progressBar: {
    height: 7,
    borderRadius: 5,
    background: "#0008",
  },
  progressBarDeterminated: {
    background: "white",
  },
  progress: {
    color: "rgba(255,255,255,.8)",
    padding: theme.spacing(0.5, 0, 0.25),
    "& p": {
      fontSize: 13,
    },
    "& svg": {
      fontWeight: "bolder",
    },
  },
  subTitle: {
    color: "rgba(255,255,255,.8)",
    fontSize: 13,
  },
  viewReport: {
    margin: theme.spacing(3, 0, 0.7),
    "& button": {
      textTransform: "none",
      color: "white",
      "& p": {
        fontSize: "small",
      },
      "& svg": {
        fontSize: "1.2rem",
        margin: theme.spacing(0, 0, 0, 1),
      },
    },
  },
}));
const Card: React.FC<CardProps> = (props) => {
  const {
    amount,
    percentProgress,
    progressBarPercent,
    subTitle,
    title,
    BackgroundImage,
    backgroundGradientStartsColor,
    backgroundGradientEndsColor,
  } = props;
  const classes = styles();

  return (
    <Grid
      className={classes.container}
      style={{
        background: `linear-gradient(to right, ${backgroundGradientStartsColor}, ${backgroundGradientEndsColor})`,
      }}
      container
    >
      <Grid xs={12} item>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography className={classes.amount}>{amount}</Typography>
      </Grid>
      <Grid xs={12} item>
        <LinearProgress
          classes={{ determinate: classes.progressBar, bar1Determinate: classes.progressBarDeterminated }}
          variant="determinate"
          value={progressBarPercent}
        />
      </Grid>
      <Grid xs={12} item>
        <Grid alignItems="center" className={classes.progress} container>
          <Grid item>{percentProgress >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}</Grid>
          <Grid item>
            <Typography>
              {Math.abs(percentProgress).toFixed(0)} {percentProgress >= 0 ? "increase" : "decrease"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Typography className={classes.subTitle}>{subTitle}</Typography>
      </Grid>
      <Grid className={classes.viewReport} xs={12} item>
        <Button variant="text" size="small">
          <Grid alignItems="center" container>
            <Grid item>
              <Typography>View report</Typography>
            </Grid>
            <Grid style={{ display: "flex", alignItems: "center" }} item>
              <ChevronRight />
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <BackgroundImage className={classes.backgroundImage} />
    </Grid>
  );
};

export default React.memo(Card);
