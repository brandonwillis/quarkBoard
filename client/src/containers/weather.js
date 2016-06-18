import React, { Component } from 'react';
import { getGeolocation, fetchWeather } from '../actions/index';
import { connect } from 'react-redux';
import { tempConverter } from '../helpers/helperfunctions';

class Weather extends Component {


  weatherInfo(){
    if (this.props.currWeather === null) {
      return <button className="btn btn-primary weatherButton" onClick={() => this.props.getGeolocation()}>Get Weather</button>
    }
    const weatherIcon = this.props.currWeather.weather[0].icon;

    return (
        // <div className="weatherBlock">
          <div className="weatherWrapper">
            <div className="weatherLeft">
              <img className="wi" src={'./src/images/weather-icons/' + weatherIcon + '.svg'} />
            </div>
            <div className="weatherRight">
              <span><h1>{this.props.currWeather.name}</h1></span>
              <span className="temp-number"><h1>{tempConverter(this.props.currWeather.main.temp)}</h1></span>
            </div>
          </div>
        // </div>
    )
  }

  render(){
    return (
      <div className="weatherBlock">
        {this.weatherInfo()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { currWeather: state.weather.currWeather };
}

export default connect(mapStateToProps, { getGeolocation, fetchWeather })(Weather);
