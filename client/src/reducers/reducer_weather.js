import { GEO_FETCH, GEO_RECEIVE, WEATHER_FETCH } from '../actions/types';

const INITIAL_STATE = { coords: null, inProgress: false, currWeather: null }

export default function (state = INITIAL_STATE , action) {
  switch (action.type) {
    case GEO_RECEIVE:
      return { ...state, coords: action.coords, inProgress: false};
    case GEO_FETCH:
      return { ...state, inProgress: true };
    case WEATHER_FETCH:
      return { ...state }
    default:
      return state;
  }
}
