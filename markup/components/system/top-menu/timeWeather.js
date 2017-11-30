import React, { Component } from 'react';
import styled from 'styled-components';
 
import weather from '../../../assets/js/libraries/weather';

import styles from './styles.scss';

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled.div`
  padding-left: 20px;
  font-size: 1.14286rem;
`;

const Weather = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-size: 1.14286rem;
  height: 53px;

  span {
    line-height: 38px;
  }
`;

class TimeWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      weather: null,
    };
    this.check = this.check.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {
    this.getCurrentDate();
    setInterval(this.getCurrentDate, 6000);
  }

  check(temp) {
    if (temp < 10) {
      return `0${temp}`;
    }
    return temp;
  }

  getCurrentDate() {
    let date = new Date();

    this.setState({ date: `${this.check(date.getDate())}/${this.check(date.getMonth() + 1)}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()},` });
  }

  getWeather(location) {
		$.simpleWeather({
			location: location,
			woeid: '',
			unit: 'f',
			success: function(weather) {
				let html = '<span class="weather"><i class="icon-' + weather.code + '"></i> ' + weather.alt.temp + '&deg; </span>';
				$("#weather").html(html);
			},
			error: function(error) {
				$("#weather").html('<p>' + error + '</p>');
			}
		});
  }

  render() {
    if (this.props.community) {
      const location = this.props.community.get('map_lat') + ',' + this.props.community.get('map_lon');
      this.getWeather(location);
    }
    return (
      <LeftMenu>
        <Time>{this.state.date}</Time>
        <Weather>
          <div id="weather"></div>
        </Weather>

      </LeftMenu>
    );
  }
}

export default TimeWeather;
