import React, { Component } from 'react';
import NoteHeader from '../containers/notes/note_header';
import Clock from './clock';
import Weather from '../containers/weather';
import GoalHeader from '../containers/goals/goal_header';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashBoardBody">
        <Clock/>
        <Weather/>
        <GoalHeader/>
        <NoteHeader />
      </div>
    );
  }
}
