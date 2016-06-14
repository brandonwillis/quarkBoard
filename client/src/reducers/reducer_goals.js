import { GOALS_FETCH, GOAL_SHOWTOGGLE } from '../actions/types';

const INITIAL_STATE = { all: [], show: "today" };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOALS_FETCH:
      return { ...state, all: action.payload };
    case GOAL_SHOWTOGGLE:
      return { ...state, show: action.payload };
    default:
      return state;
  }
}
