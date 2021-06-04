import {
  Badge,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemSecondaryActionProps,
  ListItemText,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import {
  ArrowDropDown,
  Email,
  Equalizer,
  Favorite,
  Language,
  Laptop,
  PieChart,
  Room,
  TableChart,
  Widgets,
} from "@material-ui/icons";
import React from "react";

export interface MenuProps {}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    maxWidth: 300,
    minWidth: 250,
  },
  listIcon: {
    padding: theme.spacing(0, 1, 0, 0),
    fontSize: "x-small",
    minWidth: "auto",
  },
  listItem: {
    borderRadius: 6,
  },
  subListContainer: {
    margin: theme.spacing(0, 0, 0, 1),
  },
}));
const Menu: React.FC<MenuProps> = () => {
  const classes = styles();
  const navigationOptions = [
    {
      title: "Dashboard",
      icon: <Laptop fontSize="small" />,
    },
    {
      title: "Analytics",
      icon: <PieChart fontSize="small" />,
    },
    {
      title: "Email",
      icon: <Email fontSize="small" />,
      badgeContent: 6,
      subList: ["Inbox", "Compose", "Details"],
    },
  ];
  const componentOptions = [
    {
      title: "Widgets",
      icon: <Widgets fontSize="small" />,
    },
    {
      title: "UI Kits",
      icon: <Favorite fontSize="small" />,
      subList: ["Bootstrap", "Buttons", "Card", "Icons", "Modal & Notification", "Typography", "Tabs & Accordions"],
    },
    {
      title: "Forms",
      icon: "",
    },
    {
      title: "Tables",
      icon: <TableChart fontSize="small" />,
    },
    {
      title: "Charts",
      icon: <Equalizer fontSize="small" />,
    },
    {
      title: "Map",
      icon: <Room fontSize="small" />,
    },
    {
      title: "Pages",
      icon: <Language fontSize="small" />,
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
            <React.Fragment>
              <ListItem className={classes.listItem} key={option.title} dense button>
                <ListItemIcon
                  classes={{
                    root: classes.listIcon,
                  }}
                >
                  {typeof option.badgeContent === "number" && option.badgeContent > 0 ? (
                    <Badge badgeContent={option.badgeContent} color="error" variant="dot">
                      {option.icon}
                    </Badge>
                  ) : (
                    option.icon
                  )}
                </ListItemIcon>
                <ListItemText>{option.title}</ListItemText>
                {Array.isArray(option.subList) && (
                  <ListItemSecondaryAction>
                    <ArrowDropDown />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {option.subList && (
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List className={classes.subListContainer} dense component="div" disablePadding>
                    {option.subList.map((option) => (
                      <ListItem className={classes.listItem} key={option} button>
                        <ListItemText>{option}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
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
            <React.Fragment>
              <ListItem className={classes.listItem} key={option.title} button>
                <ListItemIcon
                  classes={{
                    root: classes.listIcon,
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText>{option.title}</ListItemText>
                {Array.isArray(option.subList) && (
                  <ListItemSecondaryAction>
                    <ArrowDropDown />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {option.subList && (
                <Collapse in={false} timeout="auto" unmountOnExit>
                  <List className={classes.subListContainer} dense component="div" disablePadding>
                    {option.subList.map((option) => (
                      <ListItem className={classes.listItem} key={option} button>
                        <ListItemText>{option}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default React.memo(Menu);
