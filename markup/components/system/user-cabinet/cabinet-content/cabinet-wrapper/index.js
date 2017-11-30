import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Content from '../cabinet-content';
import history from '../../../history';

const mapStateToProps = (state) => ({
  token: state.auth.get('token')
});

const mapDispatchToProps = (dispatch) => ({});

class CabinetWrapper extends Component {
  componentWillMount() {
    if (!this.props.token) {
			history.push('/sign-in');
		}
  }

  render() {
    return !this.props.token ? (<div></div>) :(
      <Content />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetWrapper);
