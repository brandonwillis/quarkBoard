import { GOALS_FETCH } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOALS_FETCH:
      return { ...state, all: action.payload };
    default:
      return state;
  }
}
