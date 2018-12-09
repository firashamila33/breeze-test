import { INITIATE_VISUALIZATIONS, ADD_VISUALIZATION } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case INITIATE_VISUALIZATIONS:
      return action.payload;
    case ADD_VISUALIZATION:
      return [action.payload, ...state];
    default:
      return state;
  }
}
