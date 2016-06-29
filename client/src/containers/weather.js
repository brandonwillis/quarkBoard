import React, { Component } from 'react';
import { getGeolocation, fetchWeather } from '../actions/index';
import { connect } from 'react-redux';
import { tempConverter } from '../helpers/helperfunctions';
import { Button } from 'react-bootstrap';

class Weather extends Component {
  weatherInfo(){
    const { currWeather } = this.props;

    if (currWeather === null) {
      return <Button className="btn btn-primary weatherButton" onClick={ () => this.props.getGeolocation() }>Get Weather</Button>
    }

    const weatherIcon = currWeather.weather[0].icon;

    return (
      <div className="weatherWrapper">
        <img className="wi" src={'./src/images/weather-icons/' + weatherIcon + '.svg'} />
        <div className="weatherRight">
          <span><h2>{ currWeather.name }</h2></span>
          <span className="temp-number"><h2>{ tempConverter(currWeather.main.temp) }</h2></span>
        </div>
      </div>
    );
  }

  render(){
    return (
      <div className="weatherBlock">
        { this.weatherInfo() }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { currWeather: state.weather.currWeather };
}

export default connect(mapStateToProps, { getGeolocation, fetchWeather })(Weather);
