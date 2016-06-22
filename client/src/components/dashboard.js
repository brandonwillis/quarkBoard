import React, { Component } from 'react';
import NoteHeader from '../containers/notes/note_header';
import Clock from './clock';
import Timer from './timer';
import Weather from '../containers/weather';
import GoalHeader from '../containers/goals/goal_header';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashBoardBody background fullscreen" data-img-width="1600" data-img-height="1064">
        <Clock/>
        <Timer />
        <Weather/>
        <GoalHeader/>
        <NoteHeader />
      </div>
    );
  }
}
