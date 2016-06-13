import axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';
import { weatherAPIKEY } from '../../config.js';

//Type Constants Imports
import { AUTH_USER, UNAUTH_USER, SIGN_IN, NOTES_FETCH, NOTE_ADD, NOTE_SELECTED, NOTE_DELETE, GEO_FETCH, GEO_RECEIVE, WEATHER_FETCH } from './types';

const ROOT_URL = 'http://localhost:8200';
const WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${weatherAPIKEY}`;

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
      dispatch({ type: NOTES_FETCH, payload: response.data.notes})
    })
  }
}

export function noteAdd(props) {
  console.log("Note add action creator props :", props);
  return function(dispatch) {
    axios.post(`${ROOT_URL}/noteAdd`, props)
    .then(response => {
      dispatch({ type: NOTE_ADD });
      browserHistory.push('/dashboard')
    })
  }
}

export function noteFetch(note) {
  return {
    type: NOTE_SELECTED,
    payload: note
  }
}

export function noteDelete(notePackage) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/noteDelete`, notePackage)
    .then(response => {
      console.log("receiving this response: ", response)
      dispatch({ type: NOTE_DELETE });
      browserHistory.push('/dashboard');
    })
  }
}

//Weather
export function getGeolocation() {
  console.log("get geo called")
  return function(dispatch) {
    dispatch({ type: 'GEO_FETCH' });
    if( navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: 'GEO_RECEIVE',
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      });
    }
  }
}

export function fetchWeather(coords) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  const url = `${ROOT_URL}&lat=${lat}&lon=${lon}`;
  const request = axios.get(url);
  return {
    type: WEATHER_FETCH,
    payload: request
  }
  // return function(dispatch) {
  //   axios.get(url)
  //   .then(response => {
  //     console.log("get weather response: ", response)
  //   });
  // }
}
