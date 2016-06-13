import { combineReducers } from 'redux';
import NotesReducer from './reducer_notes';
import AuthReducer from './reducer_auth';
import WeatherReducer from './reducer_weather';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  auth: AuthReducer,
  notes: NotesReducer,
  weather: WeatherReducer,
  form: formReducer
})

const rootReducer = ( state, action ) => {
  if(action.type === "UNAUTH_USER") {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
