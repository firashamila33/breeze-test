import { ADD_VISUALIZATION } from "../actions/types";

export default function(state = [], action) {
  let stackLength = 4;
  switch (action.type) {
    case ADD_VISUALIZATION:
      if (state.length > stackLength) {
        //only store 5 latest visualisations in State cache
        return [action.payload, ...state.slice(0, stackLength)];
      }
      return [action.payload, ...state];
    default:
      return state;
  }
}
