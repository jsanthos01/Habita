import React from 'react';
import clsx from 'clsx';
import { 
    makeStyles,
    Paper ,
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    IconButton,
    Badge,
    Container,
    Link,
    Grid,
    MuiThemeProvider,
    createMuiTheme,
    Divider
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import MyCalendar from './MyCalendar';
import SpeedDial from './SpeedDial';
import { HabitLayout } from './components';
import illustrationHero from "../images/hello.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        backgroundColor:"rgba(0,184,255, 0.15)",
        height: 300,
    },
    heroBlock: {
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
    },
    heroTitle: {
        fontWeight: 700,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
        textAlign: "center",
      },
    },
    heroSubtitle: {
        color: "#000",
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
        maxWidth: "80%",
        margin: "1em auto",
        fontSize: ".75rem",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "90%",
      },
    },
    illustrationHero: {
        width: "300px",
        height: "200px",
    },
    hero: {
        position: "relative"
    }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Dashboard
            </Typography>
            <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
                </Badge>
            </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7} lg={7} className={classes.hero}>
                        <Paper className={fixedHeightPaper}>
                            {/* <Chart /> */}
                            <Grid item className={classes.heroBlock}>

                                    <div>
                                        <Typography variant="h4" paragraph className={classes.heroTitle}>
                                            Welcome Janice
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            paragraph
                                            className={classes.heroSubtitle}
                                        >
                                            Get started on your new goals for today and improve yourself.
                                            Build the best version of yourself by mastering your habits one day at a time!
                                        </Typography>
                                    </div>
                                    <img
                                        src={illustrationHero}
                                        alt="illustration Hero"
                                        className={classes.illustrationHero}
                                    />        
                            </Grid>
                        </Paper>
                        <SpeedDial />
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                        <MyCalendar />
                    </Grid>
                </Grid>

                
                <Grid container spacing={3}>
                    <HabitLayout />
                </Grid>

                
            </Container>

        </main>
    </div>
  );
}