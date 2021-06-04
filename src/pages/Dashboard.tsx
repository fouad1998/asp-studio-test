import { Grid, makeStyles, Typography } from "@material-ui/core";
import MainCard from "@components/dashboard/MainCard";
import Card from "@components/dashboard/Card";
import { ReactComponent as OrderSVG } from "@svg/order.svg";

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
      <Grid xs={12} lg={6} item>
        <MainCard />
      </Grid>
      <Grid xs={6} lg={3}>
        <Card
          amount="56"
          percentProgress={16}
          progressBarPercent={80}
          subTitle="compare to week"
          title="New Orders"
          BackgroundImage={OrderSVG}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
