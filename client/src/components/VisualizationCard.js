import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import Grow from "@material-ui/core/Grow";

class VisualizationCard extends Component {
  render() {
    let { visualization, classes } = this.props;
    let cardColor = "yellow";
    if (visualization.level < 2000) {
      cardColor = "green";
    } else if (visualization.level > 3000) {
      cardColor = "red";
    }
    return (
      <Grow
        in={true}
        style={{ marginTop: 6, transformOrigin: "0 0 0" }}
        {...{ timeout: 1500 }}
      >
        <Card
          className={classes.card}
          style={{ width: 403, backgroundColor: cardColor }}
        >
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Co2 : {visualization.level} mmp
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <AccessTime /> {visualization.createdAt}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grow>
    );
  }
}

VisualizationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const styles = theme => ({
  time: {
    flex: 1,
    flexDirection: "row"
  }
});
export default withStyles(styles, { withTheme: true })(VisualizationCard);
