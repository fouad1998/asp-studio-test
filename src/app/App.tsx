import { Grid, makeStyles } from "@material-ui/core";
import Header from "./Header";
import Menu from "./Menu";

export interface AppProps {}

const styles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
}));
const App: React.FC<AppProps> = () => {
  const classes = styles();

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} item>
        <Header />
      </Grid>
      {/** Menu */}
      <Grid item>
        <Menu />
      </Grid>
    </Grid>
  );
};

export default App;
