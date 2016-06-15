import { GOALS_FETCH, GOAL_ADD, GOAL_TOGGLE } from '../actions/types';

const INITIAL_STATE = { all: [], display: "today" };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOALS_FETCH:
      return { ...state, all: action.payload };
    case GOAL_ADD:
      return { ...state, all: action.payload, display: action.display }
    case GOAL_TOGGLE:
      return { ...state, display: action.payload };
    default:
      return state;
  }
}
