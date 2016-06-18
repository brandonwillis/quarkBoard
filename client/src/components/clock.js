import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: (new Date()).toLocaleTimeString()
    };

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.myTime = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myTime);
  }

  updateTime() {
    let currentDate = (new Date()).toLocaleTimeString();
    this.setState({ time: currentDate });
  }

  render() {
   return (
     <div className="clock clockBlock">
       <h3>{this.state.time}</h3>
     </div>
   );
 }
}

export default Clock;
