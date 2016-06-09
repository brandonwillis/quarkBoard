import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';

//Type Constants Imports
import { AUTH_USER, UNAUTH_USER, SIGN_IN, NOTES_FETCH, NOTE_ADD } from './types';

const ROOT_URL = 'http://localhost:8200';

//Authentication Action Creators
export function signIn(props) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, props)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
  }
}

export function signUpUser(props) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, props)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token)
      })
  }
}

export function signOutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

//Notes Action Creators
export function notesFetch() {
  const request = axios.get();

  return {
    type: NOTES_FETCH,
    payload: request
  }
}

export function noteAdd(props) {
  const request = axios.post('/noteAdd', props);

  return {
    type: NOTE_ADD,
    payload: request
  }
}
