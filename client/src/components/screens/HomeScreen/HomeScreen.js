import React from "react";

import { Grid, Fab, useScrollTrigger, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import HeroBlock from "./HeroBlock";
// import Features from "../Features/Features";
// import Download from "../Download/Download";
// import Questions from "../Questions/Questions";
// import EmailForm from "../EmailForm/EmailForm";
// import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  x: {
    color: "black"
  },
  blockroot: {
    marginTop: "55px",
    fontWeight: "bold"
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const HomeScreen = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid className={classes.blockroot} container direction="column">
        <Grid item id="back-to-top-anchor">
          <HeroBlock />
        </Grid>
        {/* <Grid item>
          <Features />
        </Grid> */}
        {/* <Grid item>
          <Download />
        </Grid>
        <Grid item>
          <Questions />
        </Grid>
        <Grid item>
          <EmailForm />
        </Grid>
        <Grid item>
          <Footer />
        </Grid> */}
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Grid>
    </React.Fragment>
  );
}

export default HomeScreen;
