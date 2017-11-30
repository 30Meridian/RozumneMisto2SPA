import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, Switch} from 'react-router-dom';
import history from '../../../history';
import {loadPublicTypes, loadPrivateTypes, loadCommunityTypes, changeWorkflowType} from '../../redux/actions';

import Title from 'components/dynamic-title';
import TypeTable from './type-table';
import PublicTable from './public-table';
import AvailableTable from './available-table';
import CommunityTable from './community-table';

import Box from 'components/box';
import Spinner from '../../../spinner';

class TypeList extends Component {

	render() {

		return (
			<Box>
				<Title title={`Службовий кабінет. Доступні бізнес-процеси. Інформаційна система "Розумне місто" `} />
				<div className="box-head">
					<h3 className="types-list">Доступні бізнес-процеси:
						<span><Link to={`${this.props.match.path}/`}> Документи громади</Link></span> /
						<span><Link to={`${this.props.match.path}/private`}> Документи організації</Link></span> /
						<span><Link to={`${this.props.match.path}/community`}> Публічні документи</Link></span>
					</h3>
				</div>
				<Switch>
	        <Route exact path={`${this.props.match.path}/`} component={CommunityTable} />
	        <Route path={`${this.props.match.path}/private`} component={AvailableTable} />
					<Route path={`${this.props.match.path}/private/:page`} component={AvailableTable} />
					<Route exact path={`${this.props.match.path}/community`} component={PublicTable} />
					<Route path={`${this.props.match.path}/community/:page`} component={PublicTable}/>
					<Route path={`${this.props.match.path}/:page`}  component={CommunityTable} />
	      </Switch>

			</Box>
		);
	}
};

export default TypeList;
