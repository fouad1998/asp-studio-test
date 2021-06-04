import { Grid, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, ChevronRight } from "@material-ui/icons";

export interface CardProps {
  title: string;
  amount: string;
  progressBarPercent: number;
  percentProgress: number;
  subTitle: string;
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
  },
  backgroundImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "40%",
  },
}));
const Card: React.FC<CardProps> = (props) => {
  const { amount, percentProgress, progressBarPercent, subTitle, title, BackgroundImage } = props;
  const classes = styles();

  return (
    <Grid className={classes.container} container>
      <Grid xs={12} item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid xs={12} item>
        <Typography>{amount}</Typography>
      </Grid>
      <Grid xs={12} item>
        <LinearProgress variant="determinate" value={progressBarPercent} />
      </Grid>
      <Grid xs={12} item>
        <Grid alignItems="center" container>
          <Grid item>{percentProgress >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}</Grid>
          <Grid item>
            <Typography>
              {Math.abs(percentProgress).toFixed(0)} {percentProgress >= 0 ? "increse" : "decrease"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Grid container>
          <Grid item>
            <Typography>View report</Typography>
          </Grid>
          <Grid item>
            <ChevronRight />
          </Grid>
        </Grid>
      </Grid>
      <BackgroundImage className={classes.backgroundImage} />
    </Grid>
  );
};

export default Card;
