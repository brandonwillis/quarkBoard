import React, { Component } from 'react';
import NoteHeader from '../containers/notes/note_header';
import Clock from './clock';
import Weather from '../containers/weather';
import GoalHeader from '../containers/goals/goal_header';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="centerBlock">
          <div className="clockBlock">
            <Clock/>
          </div>
          <div className="weatherBlock">
            <Weather/>
          </div>
        </div>
        <div className="bottomBlock">
          <div className="noteBlock">
            <NoteHeader/>
          </div>
          <div className="goalBlock">
            <GoalHeader/>
          </div>
        </div>
      </div>
    );
  }
}
