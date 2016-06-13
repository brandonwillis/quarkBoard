import React, { Component } from 'react';
import { getGeolocation, fetchWeather } from '../actions/index';
import { connect } from 'react-redux';

class Weather extends Component {
  componentDidUpdate(){
    console.log("me: ", this.props)
    this.props.fetchWeather(this.props.weather);
  }

  getGeo() {
    this.props.getGeolocation();
  }

  render(){
    console.log("Weather props: ", this.props);
    return (
      <div>
      Weather holder
      <button
      className="btn btn-danger pull-xs-right"
      onClick={this.getGeo.bind(this)}>
      Get Location
      </button>
        <h3></h3>
        <h3></h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("weather state: ", state);
  return { weather: state.weather.coords };
}

export default connect(mapStateToProps, { getGeolocation, fetchWeather })(Weather);
