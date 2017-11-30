import React, {Component} from 'react';
import {Route, Link, Switch, HashRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {loadUser} from '../../../common/redux/actions/auth';
import history from '../../../history';

import Sidebar from '../sidebar';
import MainContent from '../main-content';
import Profile from '../profile';
import UserProfile from '../profile/user-profile';
import OrderService from '../pages/order-service';
import Recording from '../pages/recording';
import Subsidy from '../pages/subsidy';
import SchoolRecord from '../pages/school-record';
import Stack from '../pages/stack';
import Bussiness from '../pages/bussiness';
import MyDefectsAll from '../../defects/my-defects-all';
import MyPetitions from '../../petitions/my-petitions';
import Requests from '../main-content/requests';
import AvailableList from '../services/available';
import Documents from '../documents';
import MedicineRouter from '../medicine';

import Page404 from '../../pages/not-found';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	user: state.auth.get('user'),
	community: state.system.get('community'),
});

const mapDispatchToProps = (dispatch) => ({});

class Content extends Component {
	componentWillMount() {
		if (!this.props.token) {
			history.push('/sign-in');
		}
	}

	render() {
		const path = this.props.match.path;
		if (!this.props.user)
			return (
				<div></div>
			);

		if (this.props.user) {
			const filteredList =  this.props.user.get('community_list')
				.filter(item => (this.props.match.url.indexOf(item.slug) !== -1 ||
				this.props.community && this.props.community.get('slug') == item.slug));
			if (!(filteredList.length > 0) && !this.props.user.get('is_superuser')) {
				return <Page404/>;
			}
		}

		return (
			<div className={styles.row}>
				<Sidebar match={this.props.match}/>
				<div className={styles.content}>
					<div className={styles.contentWrap}>
							<div className="cabinet-content">
								<Switch>
									<Route exact path={`${path}/`} component={MainContent}/>
									<Route strict path={`${path}/medicine`} component={MedicineRouter}/>
									<Route exact path={`${path}/user-info`} component={Profile}/>
									<Route exact path={`${path}/my-defects`} component={MyDefectsAll}/>
									<Route path={`${path}/my-defects/:page`} component={MyDefectsAll}/>
									<Route exact path={`${path}/my-petitions`} component={MyPetitions}/>
									<Route path={`${path}/my-petitions/:page`} component={MyPetitions}/>
									<Route exact path={`${path}/my-services`} component={Requests}/>
									<Route exact path={`${path}/available`} component={AvailableList}/>
									<Route exact path={`${path}/available/:page`} component={AvailableList}/>
									<Route path={`${path}/documents`} component={Documents}/>
									<Route exact path={`${path}/my-services/:page`} component={Requests}/>
									<Route exact path={`${path}/user-info/:user_id`} component={UserProfile}/>
									<Route path={`${path}/*`} component={Page404}/>
								</Switch>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
