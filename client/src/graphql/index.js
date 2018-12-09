import { gql } from "react-apollo";

export const visualisationSubscription = gql`
  subscription newVisualisation {
    newVisualization {
      _id
      createdAt
      level
    }
  }
`;

export const visualizationList = gql`
  query visualizationList {
    visualizationList {
      _id
      createdAt
      level
    }
  }
`;
