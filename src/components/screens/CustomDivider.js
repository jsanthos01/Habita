import React from "react";
import { Grid, Divider as MuiDivider, Typography } from "@material-ui/core";

const Divider = ({ children, ...props }) => (
  <Grid container alignItems="center" spacing={3} {...props}>
    <Grid item xs>
      <MuiDivider />
    </Grid>
    <Grid item> 
        <Typography color="textSecondary" variant="body2">
            {children}
        </Typography>
    </Grid>
    <Grid item xs>
      <MuiDivider />
    </Grid>
  </Grid>
);

export default Divider;
