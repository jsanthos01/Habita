import React from "react";
import { Grid, Button, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import illustrationHero from "../images/health1.svg";

const useStyles = makeStyles((theme) => ({
  illustrationHero: {
    width: "80%",
    zIndex: 1,
    margin: "0 auto",
    paddingTop: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2em",
    },
  },
  illustrationHeroBackDiv: {
    width: "70%",
    height: "50%",
    backgroundColor: "#FA5757",
    opacity: "0.2",
    position: "relative",
    top: "-50%",
    borderBottomLeftRadius: 250,
    marginLeft: "auto",
    zIndex: -1,
    [theme.breakpoints.down("md")]: {
      top: "-30%",
      height: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      top: "-30%",
      height: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      top: "-50%",
      height: "50%",
    },
  },
  heroText: {
    padding: "8em",
    marginTop: "3em",
    [theme.breakpoints.down("sm")]: {
      padding: "2em",
      marginTop: "2em",
    },
  },
  chromeButton: {
    textTransform: "none",
    backgroundColor: "#5368DF",
    color: "white",
    "&:hover": {
      backgroundColor: "white",
      borderColor: "#5368DF",
      color: "#5368DF",
    },
  },
  firefoxButton: {
    textTransform: "none",
    "&:hover": {
      borderColor: "black",
    },
  },
  heroTitle: {
      fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      textAlign: "center",
    },
  },
  heroSubtitle: {
      color: "hsl(229, 8%, 60%)",
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
}));


const HeroBlock = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Grid container wrap="wrap-reverse">
      <Grid item xs={12} sm={6} className={classes.heroText}>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h3" paragraph className={classes.heroTitle}>
              Transform your life one habit at a time.
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              className={classes.heroSubtitle}
            >
              {" "}
              A clean and simple interface to organize your favourite websites.
              Open a new browser tab and see your sites load instantly. Try it
              for free.{" "}
            </Typography>
          </Grid>
          <Grid item container justify="center" spacing={2}>
            <Grid item>
              <Button
                href="/register"
                size={matchesSm ? "small" : "large"}
                variant="outlined"
                className={classes.chromeButton}
              >
                Register Now
              </Button>
            </Grid>
            <Grid item>
              <Button
                size={matchesSm ? "small" : "large"}
                variant="outlined"
                className={classes.firefoxButton}
              >
                View Demo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* ---image--- */}
      <Grid item container alignItems="flex-end" xs={12} sm={6}>
        <img
          src={illustrationHero}
          alt="illustration Hero"
          className={classes.illustrationHero}
        />
        <div className={classes.illustrationHeroBackDiv}></div>
      </Grid>
    </Grid>
  );
}
export default HeroBlock;
