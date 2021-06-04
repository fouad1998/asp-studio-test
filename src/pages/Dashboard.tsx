import { Grid, makeStyles, Typography } from "@material-ui/core";
import MainCard from "@components/dashboard/MainCard";
import Card from "@components/dashboard/Card";
import { ReactComponent as OrderSVG } from "@svg/order.svg";
import { ReactComponent as GmailSVG } from "@svg/email.svg";
import { ReactComponent as BrowserSVG } from "@svg/browser.svg";
import { ReactComponent as VisitorSVG } from "@svg/visitor.svg";

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
          <Grid xs={6} lg={3} item>
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
          <Grid xs={6} lg={3} item>
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
          <Grid xs={6} lg={3} item>
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
          <Grid xs={6} lg={3} item>
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
    </Grid>
  );
};

export default Dashboard;
