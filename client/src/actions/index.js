import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';
import { weatherAPIKEY } from '../../config.js';

//Type Constants Imports
import { AUTH_USER, UNAUTH_USER, SIGN_IN, NOTES_FETCH, NOTE_ADD, NOTE_SELECTED, NOTE_DELETE, NOTE_TOGGLE, WEATHER_FETCH, GOALS_FETCH, GOAL_TOGGLE, GOAL_DELETE, GOAL_ADD } from './types';

const ROOT_URL = 'http://localhost:8200';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${weatherAPIKEY}`;

//Authentication Action Creators
export function signIn(props) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, props)
    .then(response => {
      dispatch({ type: AUTH_USER, payload: response.data.uid });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/dashboard');
    })
  }
}

export function signUp(props) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, props)
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/dashboard');
    })
  }
}

export function signOut(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

//Notes
export function notesFetch(uid) {
  const userId = { uid: uid };
  return function(dispatch) {
    axios.post(`${ROOT_URL}/notes`, userId)
    .then(response => {
      dispatch({ type: NOTES_FETCH, payload: response.data.notes, display: "index"})
    })
  }
}

export function noteFetch(note) {
  return {
    type: NOTE_SELECTED,
    payload: note,
    display: "show"
  }
}

export function noteAdd(note) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/noteAdd`, note)
    .then(response => {
      dispatch({ type: NOTE_ADD, payload: response.data.notes, display: "index" });
    })
  }
}

export function noteDelete(notePackage) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/noteDelete`, notePackage)
    .then(response => {
      dispatch({ type: NOTES_FETCH, payload: response.data.notes });
      browserHistory.push('/dashboard');
    })
  }
}

export function noteToggle(type) {
  return {
    type: NOTE_TOGGLE,
    payload: type
  }
}

//Weather
export function getGeolocation() {
  return function(dispatch) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `${WEATHER_URL}&lat=${lat}&lon=${lon}`;
        axios.post(url).then(response => {
          dispatch({ type: WEATHER_FETCH, payload: response.data.main });
        })
      });
    }
  }
}

//Goal
export function goalsFetch(uid) {
  const userId = { uid: uid };
  return function(dispatch) {
    axios.post(`${ROOT_URL}/goals`, userId)
    .then(response => {
      dispatch({ type: GOALS_FETCH, payload: response.data.goals })
    })
  }
}

export function goalAdd(goal) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/goalAdd`, goal)
    .then(response => {
      dispatch({ type: GOAL_ADD, payload: response.data.goals, display: "today" });
    })
  }
}

export function goalDelete(goalPackage) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/goalDelete`, goalPackage)
    .then(response => {
      dispatch({ type: GOALS_FETCH, payload: response.data.goals });
    })
  }
}

export function goalToggle(type) {
  return {
    type: GOAL_TOGGLE,
    payload: type
  }
}
