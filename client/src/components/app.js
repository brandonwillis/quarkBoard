import React, { Component } from 'react';
import Header from './header';
import Clock from './clock';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
