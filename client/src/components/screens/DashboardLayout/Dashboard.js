import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import {
  makeStyles,
  Snackbar
} from '@material-ui/core';
import TopBar from '../TopBar';
import NavBar from './Navbar';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 256
      }
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden'
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto'
    }
  }));
  
const Dashboard = () => {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // # error message snackbar #
    const [state, setState] = React.useState({
      open: true,
      vertical: 'top',
      horizontal: 'center',
    });
  
    const { vertical, horizontal, open } = state;
    const handleClose = () => {
      setState({ ...state, open: false });
    };
    // # error message snackbar #

    useEffect(() => {
      const fetchPrivateDate = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        try {
          const { data } = await axios.get("/api/private", config);
          setPrivateData(data.data);
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };
  
      fetchPrivateDate();
    }, []);

    return error ? (
      <Snackbar 
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000} 
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert onClose={handleClose}severity="error">{ error }</Alert>
      </Snackbar>
    ) : (
      <div className={classes.root}>
        <TopBar />
        <NavBar/>
    </div>
    );
    
}

export default Dashboard
