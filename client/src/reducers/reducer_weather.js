import { WEATHER_FETCH } from '../actions/types';

const INITIAL_STATE = { currWeather: null }

export default function (state = INITIAL_STATE , action) {
  switch (action.type) {
    case WEATHER_FETCH:
      return { ...state, currWeather: action.payload };
    default:
      return state;
  }
}
