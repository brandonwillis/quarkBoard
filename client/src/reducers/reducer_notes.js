import { NOTES_FETCH, NOTE_SELECTED, NOTE_DELETE } from '../actions/types';

const INITIAL_STATE = { all: [], note: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_FETCH:
      console.log("Notes fetch :", action.payload)
      return { ...state, all: action.payload };
    case NOTE_SELECTED:
      return { ...state, note: action.payload };
    case NOTE_DELETE:
      // return { ...state, all: action.payload };
    default:
      return state;
  }
}
