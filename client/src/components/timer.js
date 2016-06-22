import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = { min: "25", sec: "00", totalTime: "1500", maxTime:"1500", isActive: false, working: true, inRest: false };

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

    this.setState({ min: "25", sec: "00", totalTime: "1500", isActive: false, working: true, inRest: false })
  }

  pauseClock() {
    this.intervals.forEach( clearInterval );

    this.setState({ isActive: false });
  }

  startRest() {
    this.intervals.forEach( clearInterval );

    this.setState({ inRest: true, working: false });

    if( this.state.inRest === true ) {
      this.setState ({ min: "5", sec: "00" , maxTime: "300" });
    }
    this.intervals.push( setInterval.apply( null, [ this.startWork, 1000 ] ) );
  }

  timePercent() {
    return 100 - ((this.state.maxTime - this.state.totalTime) / this.state.maxTime * 100);
  }

  render() {
    return (
      <div className="timerBlock">
        <p className="timerHeader">Productivity Timer</p>
        <p className={ this.state.isActive ? "timerMSG" : "hide" }>{ this.state.working ? "Let's Get To Work" : "Time For A Break "}</p>
        <div className="time">
          <p>{ this.state.min }<span className="timerWords">min</span> { this.state.sec }<span className="timerWords">sec</span></p>
        </div>
        <div>
          <ProgressBar now={this.timePercent()} />
          <button className={ this.state.isActive ? "hide" : "" } onClick={ this.clockInterval.bind(this) }> Start Timer </button>
          <button className={ this.state.isActive ? "" : "hide" } onClick={ this.stopClock.bind(this) }> Stop Timer </button>
          <button className={ this.state.isActive ? "" : "hide" } onClick={ this.pauseClock.bind(this) }> Pause Timer </button>
        </div>
      </div>
    )
  }
}

export default Timer;
