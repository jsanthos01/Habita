import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabz from "../Tabz/Tabz";
const useStyles = makeStyles((theme) => ({
  featureTitle: {
    marginTop: "2em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "4em",
    },
  },
  featuresSubtitle: {
    maxWidth: "50%",
    margin: "0 auto",
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

const Features = () => {
      const classes = useStyles();

    return (
        <Grid container direction="column">
        {/* ---Features Header & subtitle--- */}
        <Grid item>
            <Typography
            variant="h4"
            align="center"
            paragraph
            className={classes.featureTitle}
            >
            Features
            </Typography>
            <Typography
            variant="subtitle1"
            align="center"
            paragraph
            className={classes.featuresSubtitle}
            >
            Our aim is to make it quick and easy for you to access your favourite
            websites. Your bookmarks sync between your devices so you can access
            them on the go.
            </Typography>
        </Grid>
        {/* ---Features tabs--- */}
        <Grid item>
            <Tabz />
        </Grid>
        </Grid>
    );
}

export default Features;
