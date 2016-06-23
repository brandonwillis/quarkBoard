import React, { Component } from 'react';
import NoteHeader from '../containers/notes/note_header';
import Clock from './clock';
import Timer from './timer';
import Weather from '../containers/weather';
import GoalHeader from '../containers/goals/goal_header';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Clock/>
        <Weather/>
        <GoalHeader/>
        <NoteHeader />
        <Timer />
      </div>
    );
  }
}
