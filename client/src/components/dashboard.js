import React, { Component } from 'react';
import Notes from '../containers/notes/notes_index';
import Clock from './clock';
import Modal from './modal';
import Weather from '../containers/weather';
export default class Dashboard extends Component {
  render() {
    return (
      <div>
        {/*<Modal>
          <h1> A really long amount of Modal Content</h1>
          <p>Etc.</p>
          <Clock />
        </Modal>*/}
        <Notes />
        <Weather />
      </div>
    );
  }
}
