import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    InputAdornment, 
    IconButton,
    makeStyles,
    Snackbar
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import gmail from "./images/gmail.png"
import { AUTH, LOGOUT } from "../../constants/actionTypes";
import { register } from "../../actions/auth";
import Divider from "./CustomDivider";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#FA5D63",
    color: "white",
    textTransform: 'capitalize'
  },
  button : {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    textTransform: 'capitalize'
  }
}));

const initialState = { username: "", email: "", password: ""};

const RegisterScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // visibility toggle of password field
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // snackbar error message handling
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });
 
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Signing up with email
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if password and confirm password is valid
    if (formData.password !== confirmPassword) {
      setFormData({...formData, password: ""});
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          customAuth: true
        },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("profile", JSON.stringify({
        result: {
          name: formData.username,
          email: formData.email,
          picture: "https://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png"
        }
      }));
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
              Create an Account !
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
                Sign up with Google
              </Button>
            )}

            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Divider 
            style={{
              margin: "16px 0",
              fontSize: "13px"
            }} 
            spacing={3}
          >or Sign in with Email</Divider>
          <form className={classes.form}  onSubmit={handleSubmit}>
            <TextField
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              InputProps={{ inputProps: { tabIndex: 1 } }}
            />
            <TextField
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type={showPassword ? "confirmpassword" : "password"}
              autoComplete="confirmpassword"
              InputProps={{
                inputProps: { tabIndex: 4 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              tabIndex={5}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default RegisterScreen;