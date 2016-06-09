import { combineReducers } from 'redux';
import NotesReducer from './reducer_notes';
import AuthReducer from './reducer_auth';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  auth: AuthReducer,
  notes: NotesReducer,
  form: formReducer
})

const rootReducer = ( state, action ) => {
  if(action.type === "UNAUTH_USER") {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
