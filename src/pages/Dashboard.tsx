import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import MainCard from "@components/dashboard/MainCard";
import Card from "@components/dashboard/Card";
import { ReactComponent as OrderSVG } from "@svg/order.svg";
import { ReactComponent as GmailSVG } from "@svg/email.svg";
import { ReactComponent as BrowserSVG } from "@svg/browser.svg";
import { ReactComponent as VisitorSVG } from "@svg/visitor.svg";
import StatisticsCard from "@components/dashboard/StatisticsCard";
import { ArrowDropUp, QuestionAnswer, ThumbUp } from "@material-ui/icons";
import RepartitionBar from "@components/dashboard/RepartitionBar";

export interface DashboardProps {}

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
}));
const Dashboard: React.FC<DashboardProps> = () => {
  const classes = styles();

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Grid alignItems="center" className={classes.pageHead} container>
          <Grid item>
            <Typography variant="h5" className="main">
              Hi, Sean.
              <small className="secondary"> here's what's happening with your store today.</small>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Grid spacing={2} container>
          <Grid xs={12} lg={6} item>
            <MainCard />
          </Grid>
          <Grid xs={12} lg={6} item>
            <Grid spacing={2} container>
              <Grid xs={6} item>
                <Card
                  amount="56"
                  percentProgress={16}
                  progressBarPercent={80}
                  subTitle="compare to last week"
                  title="New Orders"
                  BackgroundImage={OrderSVG}
                  backgroundGradientStartsColor="#f1957e"
                  backgroundGradientEndsColor="#ee7b5e"
                />
              </Grid>
              <Grid xs={6} item>
                <Card
                  amount="30"
                  percentProgress={-5}
                  progressBarPercent={80}
                  subTitle="compare to last week"
                  title="Unread email"
                  BackgroundImage={GmailSVG}
                  backgroundGradientStartsColor="#da65a0"
                  backgroundGradientEndsColor="#d3488e"
                />
              </Grid>
              <Grid xs={6} item>
                <Card
                  amount="60.5k"
                  percentProgress={33}
                  progressBarPercent={45}
                  subTitle="compare to last week"
                  title="Page Visitors"
                  BackgroundImage={VisitorSVG}
                  backgroundGradientStartsColor="#20c997"
                  backgroundGradientEndsColor="#1aa57c"
                />
              </Grid>
              <Grid xs={6} item>
                <Card
                  amount="320.4k"
                  percentProgress={20}
                  progressBarPercent={80}
                  subTitle="compare to last week"
                  title="Page Views"
                  BackgroundImage={BrowserSVG}
                  backgroundGradientStartsColor="#aa7af8"
                  backgroundGradientEndsColor="#8845f5"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <Grid spacing={2} container>
              <Grid xs={6} lg={3} item>
                <Grid spacing={2} container>
                  <Grid xs={12} item>
                    <StatisticsCard title="Total Users" subTitle="Store user account registration">
                      <Grid container>
                        <Grid item>
                          <Grid container>
                            <Grid xs={12} item>
                              <Typography style={{ fontSize: "1.5rem", fontWeight: 900 }}>184.593</Typography>
                            </Grid>
                            <Grid xs={12} item>
                              <Grid style={{ color: "green" }} alignItems="center" container>
                                <Grid style={{ display: "flex", alignItems: "center", fontWeight: 600 }} item>
                                  <ArrowDropUp />
                                </Grid>
                                <Grid item>
                                  <Typography style={{ fontWeight: 600, fontSize: "0.8rem" }}>+3.59%</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Avatar color="primary" />
                        </Grid>
                      </Grid>
                    </StatisticsCard>
                  </Grid>
                  <Grid xs={12} item>
                    <StatisticsCard title="Social Media" subTitle="Facebook page stats overview">
                      <Grid wrap="nowrap" justify="space-evenly" container>
                        <Grid item>
                          <Grid justify="center" container>
                            <Grid style={{ padding: "0.25rem 0" }} item>
                              <Avatar>
                                <ThumbUp />
                              </Avatar>
                            </Grid>
                            <Grid xs={12} item>
                              <Typography
                                style={{ fontSize: "1rem", fontWeight: 900, padding: "0.25rem 0" }}
                                align="center"
                              >
                                306.5k
                              </Typography>
                            </Grid>
                            <Grid xs={12} item>
                              <Typography style={{ fontSize: "0.8rem" }} align="center">
                                Likes
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid justify="center" container>
                            <Grid style={{ padding: "0.25rem 0" }} item>
                              <Avatar>
                                <QuestionAnswer />
                              </Avatar>
                            </Grid>
                            <Grid xs={12} item>
                              <Typography
                                style={{ fontSize: "1rem", fontWeight: 900, padding: "0.25rem 0" }}
                                align="center"
                              >
                                27.5k
                              </Typography>
                            </Grid>
                            <Grid xs={12} item>
                              <Typography style={{ fontSize: "0.8rem" }} align="center">
                                Comments
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </StatisticsCard>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={6} lg={3} item>
                <StatisticsCard subTitle="Traffic source and category" title="Web Traffic">
                  <RepartitionBar
                    amount="320,958"
                    elements={[
                      {
                        title: "Direct visit",
                        percent: 42.66,
                        color: "#1f6bff",
                      },
                      {
                        title: "Organic Search",
                        percent: 36.8,
                        color: "#20c997",
                      },
                      {
                        title: "Refferal Website",
                        percent: 15.34,
                        color: "#ff9500",
                      },
                      {
                        title: "Social Networks",
                        percent: 9.2,
                        color: "#e6180d",
                      },
                      {
                        title: "Other",
                        percent: 5,
                        color: "#c1cbdf",
                      },
                    ]}
                    progress={20.9}
                  />
                </StatisticsCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
