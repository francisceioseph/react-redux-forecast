import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWheather(cityData) {
    const { name }   = cityData.city;
    const {lon, lat} = cityData.city.coord;

    const temps      = cityData.list.map(weather => weather.main.temp);
    const pressures  = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    return (
      <tr key={ name }>
        <td> <GoogleMap lat={lat} lon={lon} /></td>
        <td><Chart data={ temps } color="orange" unit="K"/></td> 
        <td><Chart data={ pressures } color="blue" unit="hPa" /></td> 
        <td><Chart data={ humidities } color="black" unit="%" /></td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWheather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);