import {
  Badge,
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  ArrowDropDown,
  ArrowDropUp,
  CalendarToday,
  CallMerge,
  Description,
  Email,
  Equalizer,
  Favorite,
  Fingerprint,
  Help,
  Language,
  Laptop,
  PieChart,
  Room,
  Settings,
  TableChart,
  Widgets,
} from "@material-ui/icons";
import React, { useCallback, useState } from "react";

export interface MenuProps {}

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    maxWidth: 300,
    minWidth: 250,
    overflow: "hidden",
    overflowY: "auto",
    height: "100%",
    "-ms-overflow-style": "none" /* IE and Edge */,
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
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
  documentationButtonContainer: {
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(0, 0, 3),
    "& button": {
      textTransform: "none",
      backgroundColor: "#d1d9e7",
      borderRadius: 50,
      padding: theme.spacing(0.5, 3, 0.5),
      display: "flex",
      justify: "center",
      alignItems: "center",
      "& p": {
        fontWeight: 600,
        fontSize: "0.9rem",
      },
      "&:hover": {
        backgroundColor: "#d1d9e7",
      },
    },
  },
}));
const Menu: React.FC<MenuProps> = () => {
  const [openSubList, setOpenSubList] = useState<string | undefined>(void 0);
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
      icon: <Description />,
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
  const userOptions = [
    {
      title: "Profile",
      icon: <AccountCircle fontSize="small" />,
    },
    {
      title: "Calendar",
      icon: <CalendarToday fontSize="small" />,
    },
    {
      title: "Settings",
      icon: <Settings fontSize="small" />,
    },
    {
      title: "Help",
      icon: <Help fontSize="small" />,
    },
    {
      title: "ASP Identity",
      icon: <Fingerprint fontSize="small" />,
    },
  ];

  const onHighListItemClickHandler = useCallback((item?: string) => {
    return () => {
      setOpenSubList((state) => {
        if (state === item) {
          return void 0;
        }

        return item;
      });
    };
  }, []);

  return (
    <Grid container className={classes.container}>
      <Grid xs={12} item>
        <List
          subheader={
            <ListSubheader style={{ position: "static" }} component="div" id="nested-list-subheader">
              Navigation
            </ListSubheader>
          }
          dense
          disablePadding
        >
          {navigationOptions.map((option) => (
            <React.Fragment>
              <ListItem
                onClick={onHighListItemClickHandler(option.title)}
                className={classes.listItem}
                key={option.title}
                dense
                button
              >
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
                    {option.title === openSubList ? <ArrowDropUp /> : <ArrowDropDown />}
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {option.subList && (
                <Collapse in={option.title === openSubList} timeout="auto" unmountOnExit>
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
            <ListSubheader style={{ position: "static" }} component="div" id="nested-list-subheader">
              Components
            </ListSubheader>
          }
          dense
          disablePadding
        >
          {componentOptions.map((option) => (
            <React.Fragment>
              <ListItem
                onClick={onHighListItemClickHandler(option.title)}
                className={classes.listItem}
                key={option.title}
                button
              >
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
                    {option.title === openSubList ? <ArrowDropUp /> : <ArrowDropDown />}
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {option.subList && (
                <Collapse in={option.title === openSubList} timeout="auto" unmountOnExit>
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
            <ListSubheader style={{ position: "static" }} component="div" id="nested-list-subheader">
              Components
            </ListSubheader>
          }
          dense
          disablePadding
        >
          {userOptions.map((option) => (
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
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <Grid xs={12} className={classes.documentationButtonContainer} item>
        <Grid justify="center" container>
          <Grid item>
            <Button>
              <Grid alignItems="center" container>
                <Grid item>
                  <CallMerge />
                </Grid>
                <Grid item>
                  <Typography>Documentation</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Menu);
