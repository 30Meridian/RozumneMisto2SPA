import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Footer from './footer';
import Nav from './nav';

import MainPage from './main-page';
import Project from './project';
import Team from './team';
import Results from './results';
import Contacts from './contacts';
import Services from './services';

import Rules from './rules';
import Offer from './offer';
import ConnectPage from './connect';
import Help from './help';

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<Switch>
					<Route exact path="/" component={MainPage}/>
					<Route path="/project" component={Project}/>
					<Route path="/team" component={Team}/>
					<Route path="/results" component={Results}/>
					<Route path="/contacts" component={Contacts}/>
					<Route path="/services" component={Services}/>

					<Route path="/rules" component={Rules}/>
					<Route path="/offer" component={Offer}/>
					<Route path="/connect" component={ConnectPage}/>
					<Route path="/help" component={Help}/>

				</Switch>
				<Footer/>
			</div>
		)
	}
}

export default Landing;
