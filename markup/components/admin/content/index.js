import React, {Component} from 'react';
import {Route, Link, Switch, HashRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {ContentWrapper, ContentInner} from './components';
import Title from 'components/dynamic-title';
import history from '../../history';
import Sidebar from '../sidebar';
import IncomeDocuments from '../documents/filters/income';
import Builder from '../builder';
import Settings from '../settings';
import Documents from '../documents';
import Help from '../help';
import Header from '../header';
import Footer from 'components/footer';

import Box from 'components/box';

import { loadUser } from '../../common/redux/actions/auth';

import styles from './styles.scss';


const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	user: state.auth.get('user')
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch(loadUser()),
});

class Content extends Component {
	componentWillMount() {
		if (!this.props.token) {
			history.push('/sign-in');
		} else {
			this.props.onLoad();
		}
	}

	render() {
		const path = this.props.match.path || "";
		if (!this.props.token || !this.props.user || !this.props.user.get('is_workflow_staff'))
			return (
				<Box>
					<p>403 Permission denied</p>
					<Link to={'/'}>На головну</Link>
				</Box>
			);

		return (
			<div className="container-fluid">
				<Title title={`Службовий кабінет. Інформаційна система "Розумне місто" `} />
				<Header />
				<div className={styles.row}>
					<Sidebar path={path} />
					<ContentWrapper>
						<ContentInner>
							<Switch>
								<Route exact path={`${path}/`} component={IncomeDocuments}/>
								<Route strict path={`${path}/documents`} component={Documents}/>
								<Route strict path={`${path}/builder`} component={Builder}/>
								<Route strict path={`${path}/settings`} component={Settings}/>
								<Route strict path={`${path}/help`} component={Help}/>
								<Route exact path={`${path}/:page`} component={IncomeDocuments}/>
							</Switch>
						</ContentInner>
					</ContentWrapper>
				</div>
			<Footer />
		</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
