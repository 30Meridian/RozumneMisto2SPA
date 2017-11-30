import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import Header from './header';
import ItemsList from './all-items-list';
import Charts from './charts';
import RecipientItemsList from './recipient-list';
import PayerItemsList from './payer-list';

import styles from './styles.scss';

import {changeStartDate, changeEndDate} from '../../redux/actions';

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	financeInfo: state.system.get('financeInfo'),
});

const mapDispatchToProps = (dispatch) => ({
});

class Filters extends Component {
	render() {
		const connection_error = this.props.financeInfo ? this.props.financeInfo.connection_error : false

		return (
			<div>
				{connection_error ? (
					<div>Портал "E-DATA" не доступний</div>
			): (
				<div>
					<Header />
						<Switch>
							<Route exact path={`${this.props.match.path}/`} component={ItemsList}/>
							<Route exact path={`${this.props.match.path}/recipient/`} component={RecipientItemsList}/>
							<Route exact path={`${this.props.match.path}/payer/`} component={PayerItemsList}/>
							<Route path={`${this.props.match.path}/payer/:page`} component={PayerItemsList}/>
							<Route path={`${this.props.match.path}/recipient/:page`} component={RecipientItemsList}/>
							<Route path={`${this.props.match.path}/:page`} component={ItemsList}/>
						</Switch>
					<Charts />
				</div>
			)}
		</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
