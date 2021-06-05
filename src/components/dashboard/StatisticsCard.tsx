import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import React from "react";

export interface StatisticsCardProps {
  title: string;
  subTitle: string;
}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    background: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[100],
  },
  title: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  reload: {
    fontSize: "1.3rem",
    fontWeight: 600,
    transform: "rotateY(180deg)",
  },
  subTitle: {
    padding: theme.spacing(0.075, 0, 0.75),
    fontSize: "0.87rem",
  },
  children: {
    margin: theme.spacing(1.5, 0, 0),
  },
}));
const StatisticsCard: React.FC<StatisticsCardProps> = (props) => {
  const { subTitle, title, children } = props;
  const classes = styles();

  return (
    <Grid className={classes.container} container>
      <Grid xs={12} item>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
          <Grid item>
            <IconButton size="small">
              <Replay className={classes.reload} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Typography className={classes.subTitle}>{subTitle}</Typography>
      </Grid>
      <Grid className={classes.children} xs={12} item>
        {children}
      </Grid>
    </Grid>
  );
};

export default StatisticsCard;
