import React, { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { addNewVisualization } from "../actions";
import { visualisationSubscription, visualizationListQuery } from "../graphql";
import VisualizationCard from "./VisualizationCard";
import Grid from "@material-ui/core/Grid";


class VisualizationsList extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: visualisationSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        //adds each new visualization sent from server through websocket to the reducer State
        this.props.addNewVisualization(subscriptionData.data.newVisualization);
      }
    });
  }
  render() {
    return (
      <div style={{marginTop:40}}>
        {this.props.clientCachedvisualizationsList.map(v => {
          return(
            <Grid style={{margin:'0 auto'}} key={v._id} item  xs={60}>
                <VisualizationCard  visualization={v} />
            </Grid>
          ) 
        })}
      </div>
    );
  }
}

function mapStateToProps({ clientCachedvisualizationsList }) {
  return { clientCachedvisualizationsList };
}

export default connect(
  mapStateToProps,
  { addNewVisualization }
)(graphql(visualizationListQuery)(VisualizationsList));
