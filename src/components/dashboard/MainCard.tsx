import { Button, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { ReactComponent as DashboardBackground } from "@svg/dashboard.svg";
import dashboardBackgroundImage from "@media/images/wave-bg.png";
import { AccountBalance, ArrowDropUp, Store } from "@material-ui/icons";
import React from "react";

export interface MainCardProps {}

const styles = makeStyles((theme) => ({
  pageHead: {
    "& .main": {
      fontWeight: "bolder",
      fontSize: "x-large",
      padding: 0,
    },
    "& .secondary": {
      color: theme.palette.grey[700],
      fontSize: "medium",
      fontWeight: 0,
    },
  },
  weeklyEarning: {
    position: "relative",
    padding: theme.spacing(2),
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.grey[100],
    background: "transparent",
    "& .title": {
      color: theme.palette.grey[100],
      fontWeight: 600,
      fontSize: "1.2rem",
    },
    "& .earning": {
      color: "white",
      fontWeight: 600,
    },
    "& .progress": {
      color: theme.palette.grey[400],
      fontSize: "0.8rem",
    },
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.primary.main,
    zIndex: -1,
    "& img": {
      width: "100% !important",
      height: "100% !important",
    },
  },
  divider: {
    color: theme.palette.grey[100],
    padding: theme.spacing(2, 0, 2),
  },
  withdrawButton: {
    textTransform: "none",
    background: "#fc0",
    padding: theme.spacing(0.75, 5, 0.75),
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    "& p, & svg": {
      fontWeight: 600,
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
    },
    "&:hover": {
      background: "#fc0",
    },
  },
  sales: {
    "& .icon": {
      color: "rgb(15, 53, 127)",
    },
    "& .sub-title": {
      color: theme.palette.grey[400],
      fontSize: "0.8rem",
    },
    "& .earning": {
      color: "white",
      fontSize: "0.8rem",
    },
  },
  bottom: {
    padding: theme.spacing(1, 0, 10),
    fontSize: "12px",
    color: theme.palette.grey[100],
  },
  imageBackgroundContainer: {
    position: "absolute",
    right: 10,
    bottom: 25,
    minHeight: 250,
    maxHeight: "100%",
  },
}));
const MainCard: React.FC<MainCardProps> = () => {
  const classes = styles();

  return (
    <Grid className={classes.weeklyEarning} container>
      <Grid className={classes.background} item xs={12}>
        <img src={dashboardBackgroundImage} alt="background" />
      </Grid>
      <Grid xs={12} item>
        <Grid container>
          {/** First section */}
          <Grid xs={12} item>
            <Grid container>
              <Grid xs={12} item>
                <Typography variant="h6" className="title">
                  Weekly Earning
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <Typography variant="h6" className="earning">
                  $2,999.80
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <Grid alignItems="center" container>
                  <Grid className="progress" item>
                    <ArrowDropUp fontSize="small" />
                  </Grid>
                  <Grid item>
                    <Typography className="progress">
                      <strong>32%</strong> increase compare to last week
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/** Second section */}
          <Grid style={{ position: "relative" }} xs={12} item>
            <Grid container>
              <Grid xs={8} item>
                <Grid container>
                  <Grid xs={12} className={classes.divider} item>
                    <Divider />
                  </Grid>
                  <Grid xs={12} item>
                    <Grid container>
                      <Grid xs={6} item>
                        <Grid container className={classes.sales}>
                          <Grid xs={12} item>
                            <Store fontSize="large" className="icon" />
                          </Grid>
                          <Grid xs={12} item>
                            <Typography className="sub-title">Store Sales</Typography>
                          </Grid>
                          <Grid xs={12} item>
                            <Typography className="earning">$1,629.80</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid xs={6} item>
                        <Grid container className={classes.sales}>
                          <Grid xs={12} item>
                            <Store fontSize="large" className="icon" />
                          </Grid>
                          <Grid xs={12} item>
                            <Typography className="sub-title">Refferal Sales</Typography>
                          </Grid>
                          <Grid xs={12} item>
                            <Typography className="earning">$700.00</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={12} className={classes.divider} item>
                    <Divider />
                  </Grid>
                  <Grid xs={12} item>
                    <Button className={classes.withdrawButton} size="small">
                      <Grid spacing={1} container>
                        <Grid item>
                          <AccountBalance />
                        </Grid>
                        <Grid item>
                          <Typography>Withdraw money</Typography>
                        </Grid>
                      </Grid>
                    </Button>
                  </Grid>
                  <Grid xs={12} item>
                    <Typography className={classes.bottom}>
                      It usually takes 3-5 business days for transferring the earning to your bank account.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <DashboardBackground className={classes.imageBackgroundContainer} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(MainCard);
