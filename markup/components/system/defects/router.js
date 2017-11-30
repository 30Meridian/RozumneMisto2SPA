import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import Defects from './index';
import DefectCard from './card';
import DefectsList from './defects-list';
import MainDefects from './defects-main';
import MyDefects from './my-defects';
import DefectRules from './defects-rules';
import DefectsHelp from './defects-help';
import CreateDefect from './create-defect';
import Page403 from '../pages/not-found/403'

const mapStateToProps = (state) => ({token: state.auth.get('token')});

class DefectsRouter extends Component {
	render(props) {
		const path = this.props.match.path;
		return (
			<Switch>
				<Route exact path={`${path}/`} component={DefectsList}/>
				<Route path={`${path}/document/:id`} component={DefectCard}/>
        <Route path={`${path}/main`} component={MainDefects}/>
        <Route path={`${path}/my`} component={MyDefects}/>
        <Route path={`${path}/rules`} component={DefectRules}/>
        <Route path={`${path}/help`} component={DefectsHelp}/>
        <Route path={`${path}/create`} component={this.props.token ? CreateDefect : Page403}/>
        <Route exact path={`${path}/:page`} component={DefectsList}/>
			</Switch>
		)
	}
}

export default connect(mapStateToProps)(DefectsRouter);
