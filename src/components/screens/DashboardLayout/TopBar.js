import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    color: "#000"
  },
  toolbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  loginButton: {
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
    fontWeight: "800px",
    marginRight: 20,
    "&:hover": {
      color: "#FA5757",
    },
  },
  logo: {
    width: "50%",
    height: "40%",
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const AppbarButtons = ["features", "pricing", "contact"];

  const handleMenu = (event, action) => {
    switch (action) {
      case "open": 
        setAnchorEl(event.currentTarget);
        break;
      case "close": 
        setAnchorEl(null);
        break;
      default:
        setAnchorEl(null);
        break;
    }
  };

  // const user = null;
  const user = {
    result: {
      name: "Jeanette", 
      imageUrl: "https://i.pinimg.com/originals/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f.jpg",
    }
  }

  return (
    <AppBar className={classes.root} elevation={0} {...rest}>
      <Toolbar  >
        {/* LOGO */}
        <RouterLink to="/">
          <img className={classes.logo} src={logo} />
        </RouterLink>

        <Box flexGrow={1} />

        {/* Side Bar - Profile Pic */}
          { user ? (
            <div className={classes.profile}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleMenu(e, "open")}
                color="inherit"
              >
                <Avatar 
                  color="inherit" 
                  alt={user.result.name} 
                  src={user.result.imageUrl}  
                >
                  {user.result.name.charAt(0)}
                </Avatar>
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={(e) => handleMenu(e, "close")}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={(e) => handleMenu(e, "close")}
              >
                <MenuItem onClick={(e) => handleMenu(e, "close")}>Profile</MenuItem>
                <MenuItem onClick={(e) => handleMenu(e, "close")}>Logout</MenuItem>
              </Menu>
                {/* <Typography className={classes.typography}>The content of the Popover.</Typography> */}
              </Popover>
              
             </div>
            
            ) : (
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
              <Button
                href="/login"
                variant="outlined"
                size="large"
                className={classes.loginButton}
              >
                login
              </Button>
            </Hidden>

            )}
          
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
