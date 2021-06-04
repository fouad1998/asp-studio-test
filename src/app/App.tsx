import { Grid, makeStyles } from "@material-ui/core";
import Dashboard from "@pages/Dashboard";
import Header from "./Header";
import Menu from "./Menu";

export interface AppProps {}

const styles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  menu: {
    borderRight: "1px solid #dae0ec",
  },
  mainApp: {
    padding: theme.spacing(4, 6, 4),
    overflow: "hidden",
    overflowY: "auto",
    height: "100%",
  },
}));
const App: React.FC<AppProps> = () => {
  const classes = styles();

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} item>
        <Header />
      </Grid>
      <Grid style={{ height: "calc(100%-60px)" }} xs={12}>
        <Grid style={{ height: "100%" }} wrap="nowrap" container>
          <Grid className={classes.menu} item>
            <Menu />
          </Grid>
          <Grid style={{ flex: "1 1 auto" }} item>
            <Grid className={classes.mainApp} container>
              <Grid xs={12}>
                <Dashboard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
