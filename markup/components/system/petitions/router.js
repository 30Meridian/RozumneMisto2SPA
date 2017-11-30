import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import Petitions from './index';
import PetitionCard from './card';
import CreatePetition from './create-petition';
import PetitionsArchive from './petitions-archive';
import PetitionsChecking from './petitions-checking';
import PetitionsConsidered from './petitions-considered';
import PetitionsConsidering from './petitions-considering';
import PetitionsDeclined from './petitions-declined';
import PetitionsHelp from './petitions-help';
import PetitionsRules from './petitions-rules';
import MainPetitions from './main-petitions';
import Page403 from '../pages/not-found/403'

const mapStateToProps = (state) => ({token: state.auth.get('token')});

class PetitionsRouter extends Component {
	render(props) {
		const path = this.props.match.path;
		return (
			<Switch>
				<Route exact path={`${path}/`} component={Petitions}/>
				<Route path={`${path}/document/:id/page=:page`} component={PetitionCard}/>
				<Route path={`${path}/document/:id`} component={PetitionCard}/>
				<Route path={`${path}/archive`} component={PetitionsArchive}/>
				<Route path={`${path}/checking`} component={PetitionsChecking}/>
				<Route path={`${path}/considered`} component={PetitionsConsidered}/>
				<Route path={`${path}/considering`} component={PetitionsConsidering}/>
				<Route path={`${path}/declined`} component={PetitionsDeclined}/>
				<Route path={`${path}/help`} component={PetitionsHelp}/>
				<Route path={`${path}/rules`} component={PetitionsRules}/>
				<Route path={`${path}/main-petitions`} component={MainPetitions}/>
				<Route path={`${path}/create`} component={this.props.token ? CreatePetition : Page403}/>
				<Route exact path={`${path}/:page`} component={Petitions}/>
			</Switch>
		)
	}
}

export default connect(mapStateToProps)(PetitionsRouter);
