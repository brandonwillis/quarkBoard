import { NOTES_FETCH, NOTES_ADD } from '../actions/types';

const INITIAL_STATE = { all: [{title: 'testing', date: '2/29/1990', id: '001', body: 'helloasdfal'}], post: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NOTES_FETCH:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
