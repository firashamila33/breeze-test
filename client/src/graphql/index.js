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

export const visualizationListQuery = gql`
  query visualizationList {
    visualizationList {
      _id
      createdAt
      level
    }
  }
`;

