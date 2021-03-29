import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { GoogleLogin } from "react-google-login";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Grid,
    Link,
    Typography,
    Snackbar,
    makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import CustomDivider from "../CustomDivider";
import TopBar from "../TopBar";
import gmail from "../images/gmail.png"
import { AUTH, LOGOUT } from "../../../constants/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70vh',
  },
  image: {
    backgroundImage: `url(https://source.unsplash.com/WI30grRfBnE/900x900)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(20, 12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FA5D63",
  },
  top : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "900px"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#FA5D63",
    color: "white",
    textTransform: 'capitalize'

  },
  section2: {
    display: 'flex',
  },
  button : {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    textTransform: 'capitalize'
    // fontStyle: "capitalize"
    // color: "white"
  }
}));

const LoginScreen = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      console.log()
      history.push("/dashboard");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`,            
      },
    };


    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );
      
      localStorage.setItem("profile", JSON.stringify({
        result: {
          email: email,
          picture: "https://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png"
        }
      }));
      localStorage.setItem("authToken", data.token);

      history.push("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  // Signing up with google oauth
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch({ type: AUTH , data: { result, token } });

    const { data } = await axios.post(
      "/api/auth/googleSignIn",
      {
        token,
        result
      }
    );

    history.push("/dashboard");
  }

  const googleFailure = () => setError('Google Sign In was unsuccessful. Try again later')

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <TopBar />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {
            error &&
            <Snackbar 
              open={open}
              anchorOrigin={{ vertical, horizontal }}
              autoHideDuration={6000} 
              key={vertical + horizontal}
              onClose={handleClose}
            >
              <Alert onClose={handleClose}severity="error">{ error }</Alert>
            </Snackbar>
          }

          <div className={classes.top} >
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon  />
            </Avatar>
            <Typography component="h1" variant="h5" style={{fontWeight: "800px"}}>
              Welcome Back ! Login
            </Typography>
          </div>
          
          <GoogleLogin 
            clientId="198122039548-gp2a9kco71cun5re25frn67958jqlk2o.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                fullWidth            
                className={classes.button}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={
                  <Avatar 
                    src={gmail} 
                  />
                }
              >
                Sign in with Google
              </Button>
            )}

            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <CustomDivider 
            style={{
              margin: "16px 0",
              fontSize: "13px"
            }} 
            spacing={3}
          >or Sign in with Email</CustomDivider>
          <form className={classes.form} onSubmit={loginHandler}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{ inputProps: { tabIndex: 2 } }}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{ inputProps: { tabIndex: 3 } }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword"  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Signup"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginScreen;