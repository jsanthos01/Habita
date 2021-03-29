import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  MenuItem,
  Menu,
  Container,
  Button, 
  Avatar,
  Link,
  Popover,
  Typography,
  Hidden
} from '@material-ui/core';
import logo from './images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    color: "#000",
    textTransform: "capitalize",
  },
  menuButton: {
      marginRight: 36,
  },
  menuButtonHidden: {
      display: 'none',
  },
  toolbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  loginButton: {
    fontWeight: 800,
    // textTransform: "capitalize",
    marginRight: 50,
    color: "white",
    backgroundColor: "#FA5757",
    "&:hover": {
      color: "#FA5757",
      borderColor: "#FA5757",
    },
  },
  avatar: {
    width: 60,
    height: 60
  },
  navigationButton: {
    fontWeight: 800,
    textTransform: "capitalize",
    marginRight: 20,
    "&:hover": {
      color: "#FA5757",
    },
  },
  logo: {
    width: "40%",
    height: "30%",
  },
  typography: {
    padding: theme.spacing(2),
  },
  navButton: {
    backgroundColor: "#FA5D63",
    color: "white",
    textTransform: 'capitalize'
  }, 
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const AppbarButtons = ["features", "pricing", "contact"];
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));


  return (
    <AppBar className={classes.root} elevation={1} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <img className={classes.logo} src={logo} />
        </RouterLink>

        <Box flexGrow={1} />
        <Hidden smDown>
          {AppbarButtons.map((button, index) => {
            return (
              <Button
                key={index}
                disableRipple
                className={classes.navigationButton}
              >
                {button}
              </Button>
            );
          })}
          {
            !user ? <Button
            href="/login"
            variant="outlined"
            size="large"
            className={classes.loginButton}
          >
            login
          </Button>
          : ""}
        </Hidden>   
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
