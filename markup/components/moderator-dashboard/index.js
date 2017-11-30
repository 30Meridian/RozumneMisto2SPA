import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import history from 'components/history';
import Footer from 'components/footer';
import Sidebar from './sidebar';
import Header from './header';
import Content from './content';
import Box from 'components/box';
import { loadUser } from 'components/common/redux/actions/auth';

import styles from './styles.scss';


const mapStateToProps = (state) => ({
	user: state.auth.get('user'),
	token: state.auth.get('token')
});

const mapDispatchToProps = dispatch => ({
	loadUser: () => dispatch(loadUser()),
})

class ModeratorDashboard extends Component {
	componentWillMount() {
		if (!this.props.token) {
			history.push('/sign-in');
		} else {
			this.props.loadUser();
		}
	}

	render() {
		const path = this.props.match.path || "";
		if (!this.props.token || !this.props.user || !this.props.user.get('is_community_moderator'))
			return (
				<Box>
					<p>403 Permission denied</p>
					<Link to={'/'}>На головну</Link>
				</Box>
			);

		return (
			<div className="container-fluid">
				<Header />
				<div className={styles.row}>
					<Sidebar />
					<div className={styles.content}>
						<div className={styles.contentBox}>
							<div>
								<Switch>
									<Route exact path={`${path}/`} component={Content}/>
									<Route path={`${path}/:page`} component={Content} />
								</Switch>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
