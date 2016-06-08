import { NOTES_FETCH, NOTES_ADD } from '../actions/index';

const INITIAL_STATE = { all: ['hi','test','123'], post: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_FETCH:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
