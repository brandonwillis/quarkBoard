import axios from 'axios';
import React from 'react';

//Type Constants
export const NOTES_FETCH = 'NOTES_FETCH';
export const NOTE_ADD = 'NOTE_ADD';

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
