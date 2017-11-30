import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import history from '../../../history';
import Content from '../cabinet-content';

const mapStateToProps = (state) => ({
  token: state.auth.get('token'),
});

class Wrapper extends Component {
  componentWillMount() {
    if (!this.props.token) {
			history.push('/sign-in');
		}
  }

  render() {
    return !this.props.token ? (<div></div>) : (
      <Switch>
        <Route path={this.props.match.path} component={Content} />
      </Switch>
    );
  }
}

export default connect(mapStateToProps)(Wrapper);
