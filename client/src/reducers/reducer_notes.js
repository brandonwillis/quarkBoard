import { NOTES_FETCH, NOTES_ADD } from '../actions/types';

const INITIAL_STATE = { all: [], post: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_FETCH:
      return { ...state, all: action.payload };
    default:
      return state;
  }
}
