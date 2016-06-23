import { AUTH_USER, UNAUTH_USER } from '../actions/types';

const INITIAL_STATE = { isAuth: false, uid: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, isAuth: true, uid: action.payload };
    case UNAUTH_USER:
      return { isAuth: false};
    default:
      return state;
  }
}
