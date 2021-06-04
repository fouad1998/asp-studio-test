import { Avatar, Badge, Button, Grid, IconButton, InputBase, makeStyles, Paper, Typography } from "@material-ui/core";
import { FiberManualRecord, Menu, Notifications, Search } from "@material-ui/icons";
import { useCallback, useState } from "react";

export interface HeaderProps {}

const styles = makeStyles((theme) => ({
  container: {
    height: "100% !important",
  },
  paper: {
    padding: 0,
    width: "100%",
    height: 60,
    borderRadius: 0,
    boxShadow: "0 6px 6px rgb(31 107 255 / 10%)",
  },
  menuButton: {
    margin: theme.spacing(0, 1, 0, 1),
  },
  brand: {
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 0, 1),
  },
  searchBarContainer: {
    margin: theme.spacing(0, 1.5, 0, 10),
    flex: "1 1 auto",
    height: 40,
  },
  searchBar: {
    background: "#ebeef4",
    borderRadius: 6,
    height: 40,
    "&.focused": {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
      borderStyle: "solid",
    },
  },
  notificationButton: {
    margin: theme.spacing(0, 4, 0, 0),
    color: "black",
  },
  userMail: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    padding: theme.spacing(0, 2, 0, 0.25),
  },
}));
const Header: React.FC<HeaderProps> = () => {
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const classes = styles();

  const onSearchInputFocusChangeHandler = useCallback((status: boolean) => {
    return () => {
      setSearchInputFocused(status);
    };
  }, []);

  return (
    <Paper className={classes.paper}>
      <Grid className={classes.container} justify="space-between" alignItems="center" container>
        <Grid item>
          <IconButton className={classes.menuButton}>
            <Menu />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.brand}>
            AspStudio
          </Typography>
        </Grid>
        <Grid item style={{ flex: "1 1 auto", height: "100%" }}>
          <Grid alignItems="center" justify="space-between" style={{ height: "100%" }} container>
            <Grid item className={classes.searchBarContainer}>
              <Grid
                alignItems="center"
                className={classes.searchBar + (searchInputFocused ? " focused" : "")}
                container
              >
                <Grid item>
                  <Button>
                    <Search />
                  </Button>
                </Grid>
                <Grid item style={{ flex: "1 1 auto" }}>
                  <InputBase
                    placeholder="Search menu..."
                    style={{ fontSize: "1rem" }}
                    onFocus={onSearchInputFocusChangeHandler(true)}
                    onBlur={onSearchInputFocusChangeHandler(false)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton size="small" className={classes.notificationButton}>
                <Badge color="primary" badgeContent={4}>
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
                    badgeContent={<FiberManualRecord style={{ fontSize: "small", color: "green" }} color="error" />}
                  >
                    <Avatar src="https://material-ui.com//static/images/avatar/1.jpg" />
                  </Badge>
                </Grid>
                <Grid item>
                  <Typography className={classes.userMail}>seantheme@gmail.com</Typography>
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
