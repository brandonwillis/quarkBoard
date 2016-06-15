import { combineReducers } from 'redux';
import NotesReducer from './reducer_notes';
import GoalsReducer from './reducer_goals';
import AuthReducer from './reducer_auth';
import WeatherReducer from './reducer_weather';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  auth: AuthReducer,
  notes: NotesReducer,
  weather: WeatherReducer,
  goals: GoalsReducer,
  form: formReducer
})

const rootReducer = ( state, action ) => {
  if(action.type === "UNAUTH_USER") {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
