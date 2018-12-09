import React, { Component } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { initiateVisualizations, addNewVisualization } from "./actions";
import { visualisationSubscription, visualizationList } from "./graphql";

class App extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: visualisationSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        this.props.addNewVisualization(subscriptionData.data.newVisualization);
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.clientCachedvisualizationsList.map(v => {
          return <p key={v._id}>{`- ${v.createdAt} , level :${v.level}`}</p>;
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
  { initiateVisualizations, addNewVisualization }
)(graphql(visualizationList)(App));
