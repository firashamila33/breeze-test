import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Timeline from "@material-ui/icons/Timeline";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10
  }
};

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#2fc4ff" }}>
        <Toolbar style={{ flexDirection: "row", alignItems: "space-between" }}>
          <Typography variant="h6" color="red" className={classes.grow}>
            Breeze Dashbord
          </Typography>
          <div style={{ marginLeft: 20 }} className={classes.sectionDesktop}>
            <Timeline fontSize={"default"} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DenseAppBar);
