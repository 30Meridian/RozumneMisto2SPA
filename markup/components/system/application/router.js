import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { checkStandaloneHost } from '../redux/actions/index';

import Spinner from 'components/spinner';
import Title from 'components/dynamic-title';
import Main from '../main';
import Landing from '../landing';
import Admin from 'components/admin/content';
import ChatraWrapper from './chatra-wrapper';
import ModeratorDashboard from 'components/moderator-dashboard';


const mapStateToProps = state => ({
	user: state.auth.get('user'),
	hostIsLoading: state.system.get('standaloneHostIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = dispatch => ({
	checkHost: (origin) => dispatch(checkStandaloneHost(origin)),
})

class AppRouter extends Component {
	componentWillMount() {
    this.props.checkHost(window.location.origin);
  }

	render() {
		if (this.props.hostIsLoading) {
			return <Spinner />;
		}

		if (this.props.hostEnable) {
			return (
				<ChatraWrapper url={this.props.match.url}>
				<Switch>
					<Route strict path="/admin" component={Admin} />
					<Route path="*" component={Main} />
				</Switch>
				</ChatraWrapper>
			);
		}

		return (
			<ChatraWrapper url={this.props.match.url}>
			<div>
				<Title title={`Інформаційна система "Розумне місто"`} />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exect path="/project" component={Landing} />
					<Route exect path="/team" component={Landing} />
					<Route exect path="/results" component={Landing} />
					<Route exect path="/contacts" component={Landing} />
					<Route exect path="/services" component={Landing} />

					<Route exect path="/rules" component={Landing} />
					<Route exect path="/help" component={Landing} />
					<Route exect path="/offer" component={Landing} />
					<Route exect path="/connect" component={Landing} />

					<Route strict path="/admin" component={Admin} />
					<Route strict path="/moderator" component={ModeratorDashboard} />
					<Route path="*" component={Main} />
				</Switch>
			</div>
			</ChatraWrapper>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
