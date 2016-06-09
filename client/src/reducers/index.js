import { combineReducers } from 'redux';
import NotesReducer from './reducer_notes';
import AuthReducer from './reducer_auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: AuthReducer,
  notes: NotesReducer,
  form: formReducer
});

export default rootReducer;
