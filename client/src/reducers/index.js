import { combineReducers } from 'redux';
import NotesReducer from './reducer_notes';

const rootReducer = combineReducers({
  toDoItems: ToDoReducer
});

export default rootReducer;
