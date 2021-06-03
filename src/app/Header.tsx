import { Avatar, Badge, Button, Grid, IconButton, InputBase, makeStyles, Paper, Typography } from "@material-ui/core";
import { FiberManualRecord, Menu, Notifications, Search } from "@material-ui/icons";

export interface HeaderProps {}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: 0,
    width: "100%",
  },
  searchBarContainer: {
    margin: theme.spacing(0, 3, 0, 10),
    flex: "1 1 auto",
  },
  searchBar: {
    background: "#ebeef4",
    borderRadius: 6,
  },
}));
const Header: React.FC<HeaderProps> = () => {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Grid className={classes.container} justify="space-between" alignItems="center" spacing={1} container>
        <Grid item>
          <IconButton size="small">
            <Menu />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5">AspStudio</Typography>
        </Grid>
        <Grid item style={{ flex: "1 1 auto" }}>
          <Grid alignItems="center" justify="space-between" spacing={2} container>
            <Grid item className={classes.searchBarContainer}>
              <Grid alignItems="center" className={classes.searchBar} container>
                <Grid item>
                  <Button>
                    <Search />
                  </Button>
                </Grid>
                <Grid item>
                  <InputBase placeholder="Search menu..." />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <Badge color="error" badgeContent={4}>
                  <Notifications />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <Grid alignItems="center" spacing={1} container>
                <Grid item>
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={<FiberManualRecord fontSize="small" color="error" />}
                  >
                    <Avatar src="https://material-ui.com//static/images/avatar/1.jpg" />
                  </Badge>
                </Grid>
                <Grid item>
                  <Typography>seantheme@gmail.com</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
