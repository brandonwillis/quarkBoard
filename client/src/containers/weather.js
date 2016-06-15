import React, { Component } from 'react';
import { getGeolocation, fetchWeather } from '../actions/index';
import { connect } from 'react-redux';
import { tempConverter } from '../helpers/helperfunctions';

class Weather extends Component {


  weatherInfo(){
    if (this.props.currWeather === null) {
      return <button className="btn btn-primary" onClick={() => this.props.getGeolocation()}>Get Weather</button>
    }
    const weatherIcon = this.props.currWeather.weather[0].icon;
    console.log(weatherIcon);
    return (
      <div>
        <h1>{this.props.currWeather.name}</h1>
        <div>
          <img className="wi" src={'./src/images/weather-icons/' + weatherIcon + '.svg'} alt='Weather' />
        </div>
        <section>
          <div>{tempConverter(this.props.currWeather.main.temp)}</div>
        </section>
      </div>
    )
  }

  render(){
    console.log("")
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
