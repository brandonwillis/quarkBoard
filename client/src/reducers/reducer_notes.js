import { NOTES_FETCH, NOTES_ADD, NOTE_SELECTED, NOTE_DELETE } from '../actions/types';

const INITIAL_STATE = { all: [], note: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_FETCH:
      return { ...state, all: action.payload };
    case NOTE_SELECTED:
      return { ...state, note: action.payload };
    case NOTE_DELETE:

    default:
      return state;
  }
}
