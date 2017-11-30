import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Route, Switch} from 'react-router-dom';

 
import Tab from '../../../../assets/js/libraries/tab';

import Filters from './filters';
import Help from './help';
import Terms from './terms';

import Box from 'components/box';

import styles from './styles.scss';

const mapStateToProps = state => ({
	community: state.system.get('community'),
});

class OpenFinance extends Component {
	componentDidMount() {
		$('.tabular.menu .item').tab();
	}

	render() {
		return (
			<Box>
				<div className={styles.center}>
					<h3>
						<i className="fa fa-credit-card"></i><br/>Публічні фінанси.
					</h3>
					<small>Платежі державних організацій {this.props.community.get('name')}</small>
				</div>
				<div className="ui tabular menu bt">
					<div className="item active" data-tab="tab-name">Фільтр платежів</div>
					<div className="item" data-tab="tab-name2">Допомога</div>
					<div className="item" data-tab="tab-name3">Умови використання</div>
				</div>
				<div className="ui tab active" data-tab="tab-name">
					<Switch>

						<Route exact path={`${this.props.match.path}/`} component={Filters}/>
						<Route path={`${this.props.match.path}/:page`} component={Filters}/>

					</Switch>
				</div>
				<div className="ui tab" data-tab="tab-name2">
					<Help/>
				</div>
				<div className="ui tab" data-tab="tab-name3">
					<Terms/>
				</div>
			</Box>
		)
	}
}

export default connect(mapStateToProps)(OpenFinance);
