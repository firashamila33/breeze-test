import { ADD_VISUALIZATION } from "./types";

export const addNewVisualization = data => {
  return {
    type: ADD_VISUALIZATION,
    payload: data
  };
};