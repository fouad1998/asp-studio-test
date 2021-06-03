import { Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from "@material-ui/core";
import { Email, Equalizer, Favorite, Language, Laptop, PieChart, Room, TableChart, Widgets } from "@material-ui/icons";

export interface MenuProps {}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    maxWidth: 250,
  },
}));
const Menu: React.FC<MenuProps> = () => {
  const classes = styles();
  const navigationOptions = [
    {
      title: "Dashboard",
      icon: <Laptop />,
    },
    {
      title: "Analytics",
      icon: <PieChart />,
    },
    {
      title: "Email",
      icon: <Email />,
    },
  ];
  const componentOptions = [
    {
      title: "Widgets",
      icon: <Widgets />,
    },
    {
      title: "UI Kits",
      icon: <Favorite />,
    },
    {
      title: "Forms",
      icon: "",
    },
    {
      title: "Tables",
      icon: <TableChart />,
    },
    {
      title: "Charts",
      icon: <Equalizer />,
    },
    {
      title: "Map",
      icon: <Room />,
    },
    {
      title: "Pages",
      icon: <Language />,
    },
  ];

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} item>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Navigation
            </ListSubheader>
          }
          dense
          disablePadding
        >
          {navigationOptions.map((option) => (
            <ListItem key={option.title} dense button>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid xs={12} item>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Components
            </ListSubheader>
          }
          dense
          disablePadding
        >
          {componentOptions.map((option) => (
            <ListItem key={option.title} button>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Menu;
