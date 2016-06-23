import { GOALS_FETCH, GOAL_ADD, GOAL_TOGGLE, GOAL_COLLAPSE } from '../actions/types';

const INITIAL_STATE = { all: [], display: "today", expanded: true };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOALS_FETCH:
      return { ...state, all: action.payload };
    case GOAL_ADD:
      return { ...state, all: action.payload, display: action.display }
    case GOAL_TOGGLE:
      return { ...state, display: action.payload };
    case GOAL_COLLAPSE:
      return { ...state, expanded: action.payload }
    default:
      return state;
  }
}
