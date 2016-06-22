import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = { min: "25", sec: "00", totalTime: "1500", isActive: false, inRest: false };

    this.clockInterval = this.clockInterval.bind(this);
    this.startWork = this.startWork.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.pauseClock = this.pauseClock.bind(this);
  }

  componentWillMount() {
    this.intervals = [];
  }

  startWork() {
    var timeRemaining = ( this.state.min * 60 + this.state.sec );

    if ( this.state.sec === "00" || this.state.sec === 0 && timeRemaining !== 0 ) {
      this.setState({ min: this.state.min - 1, sec: 59, totalTime: timeRemaining });
    }
    else if ( timeRemaining  > 0 ) {
      this.setState({ sec: this.state.sec - 1, totalTime: timeRemaining });
    }
    else if ( this.state.inRest === true ) {
      this.intervals.forEach( clearInterval );
    }
    else {
      this.startRest();
    }
  }

  clockInterval() {
    this.setState({ isActive: true });

    this.intervals.push( setInterval.apply( null, [ this.startWork, 1000] ) );
  }

  stopClock() {
    this.intervals.forEach( clearInterval );
  }

  pauseClock() {
    this.intervals.forEach( clearInterval );

    this.setState({ isActive: false });
  }

  startRest() {
    this.intervals.forEach( clearInterval );

    this.setState({ inRest: true });

    if( this.state.inRest === true ) {
      this.setState ({ min: "5", sec: "00" });
    }
    this.intervals.push( setInterval.apply( null, [ this.startWork, 1000 ] ) );
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={ this.clockInterval.bind(this) }> Start Timer </button>
          <button onClick={ this.stopClock.bind(this) }> Stop Timer </button>
          <button onClick={ this.pauseClock.bind(this) }> Pause Timer </button>
        </div>
        <div>
          <div>{ this.state.min } min</div><div> { this.state.sec } sec</div>
        </div>
      </div>
    )
  }
}


export default Timer;
