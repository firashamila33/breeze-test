import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { graphql } from "react-apollo";
import { visualisationSubscription, visualizationListQuery } from "../graphql";

class Chart extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      //handdling websocket subscription , add each new visualisation sent from the server to the Visualisations List
      document: visualisationSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        const { newVisualization } = subscriptionData.data;
        return Object.assign({}, prev, {
          __typename: prev.__typename,
          visualizationList: [newVisualization, ...prev.visualizationList]
        });
      }
    });
  }

  render() {
    let {
      data: { loading, error, visualizationList }
    } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    if (!visualizationList) {
      return <p>No data To Display !!!</p>;
    }

    return (
      <LineChart
        width={800}
        height={500}
        data={visualizationList
          .map(e => {
            return { createdAt: e.createdAt, co2Level: e.level };
          })
          .reverse()}
        margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="createdAt" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="co2Level"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}

export default graphql(visualizationListQuery)(Chart);
