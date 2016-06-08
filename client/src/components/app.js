import React, { Component } from 'react';
import Notes from '../containers/notes';

export default class App extends Component {

  render() {
    return (
      <div>
        <div>Welcome To QuarkBoard</div>
        <Notes />
      </div>
    );
  }
}
