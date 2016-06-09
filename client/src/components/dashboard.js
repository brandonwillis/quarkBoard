import React, { Component } from 'react';
import Notes from '../containers/notes';
import Clock from './clock';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Clock />
        <Notes />
      </div>
    );
  }
}
