import { INITIATE_VISUALIZATIONS, ADD_VISUALIZATION } from "./types";

export const initiateVisualizations = data => {
  return {
    type: INITIATE_VISUALIZATIONS,
    payload: data
  };
};

export const addNewVisualization = data => {
  return {
    type: ADD_VISUALIZATION,
    payload: data
  };
};
