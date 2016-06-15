import React, { Component } from 'react';
import { getGeolocation, fetchWeather } from '../actions/index';
import { connect } from 'react-redux';
import { tempConverter } from '../helpers/helperfunctions';

class Weather extends Component {
  weatherInfo(){
    if (this.props.currWeather === null) {
      return <button className="btn btn-primary" onClick={() => this.props.getGeolocation()}>Get Weather</button>
    }
    return <div>{tempConverter(this.props.currWeather.temp)}</div>
  }

  render(){
    return (
      <div>
        <h1>Weather holder</h1>
        <div>{this.weatherInfo()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currWeather: state.weather.currWeather };
}

export default connect(mapStateToProps, { getGeolocation, fetchWeather })(Weather);
