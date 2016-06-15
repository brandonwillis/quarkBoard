import { NOTES_FETCH, NOTE_SELECTED, NOTE_ADD, NOTE_TOGGLE } from '../actions/types';

const INITIAL_STATE = { all: [], note: null, display: "index"};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_FETCH:
      return { ...state, all: action.payload, display: action.display};
    case NOTE_SELECTED:
      return { ...state, note: action.payload, display: action.display };
    case NOTE_ADD:
      return { ...state, note: action.payload, display: action.display };
    case NOTE_TOGGLE:
      return { ...state, display: action.payload };
    default:
      return state;
  }
}
