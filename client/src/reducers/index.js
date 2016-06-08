import { combineReducers } from 'redux';
import NotesReducer from './reducer_notes';

const rootReducer = combineReducers({
  notes: NotesReducer
});

export default rootReducer;
