import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = { time: (new Date()).toLocaleTimeString() };

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.myTime = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myTime);
  }

  updateTime() {
    const currentDate = (new Date()).toLocaleTimeString();

    this.setState({ time: currentDate });
  }

  render() {
   return (
     <div className="clockBlock">
       <p className="clockTime">{ this.state.time }</p>
     </div>
   );
 }
}

export default Clock;
