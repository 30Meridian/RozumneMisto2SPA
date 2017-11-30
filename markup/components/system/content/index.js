import React, {Component} from 'react';
import {Route, Link, Switch, HashRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCommunityBySlug } from '../redux/actions';
import { loadUser } from '../../common/redux/actions/auth';

import {ContentRow, ContentWrap, ContentInner} from './components';
import Sidebar from '../sidebar';
import SidebarBasic from '../sidebar/sidebar-basic';
import MainPage from '../main-page';
import PublicBudget from '../public-budget';
import News from '../news/router';
import KinderRouter from '../kindergarten';
import Petitions from '../petitions/router';
import DefectsRouter from '../defects/router';
import PollsRouter from '../polls/router';
import OpenFinance from '../pages/refactoring-open-finance';
import AboutProject from '../pages/about-project';
import Blood from '../pages/blood';
import ConnectPage from '../pages/connect';
import ConnectMap from '../pages/connect-map';
import Contacts from '../pages/contacts';
import Decental from '../pages/decentral';
import Drugs from '../pages/drugs';
import EProcurement from '../pages/e-procurement';
import EService from '../pages/e-service';
import ExportData from '../pages/export';
import Help from '../pages/help';
import InvestMain from '../pages/invest-map';
import ListAccomodation from '../pages/list-accomodation';
import OpenBudget from '../pages/open-budget';
import ApiBudget from '../pages/apibudget';
import Partners from '../pages/partners';
import Rules from '../pages/rules';
import Safety from '../pages/safety';
import CreateDefect from '../defects/create-defect';
import DefectsList from '../defects/defects-list';
import DefectRules from '../defects/defects-rules';
import DefectsHelp from '../defects/defects-help';
import MyDefects from '../defects/my-defects';
import MainDefects from '../defects/defects-main';
import NewsCard from '../news/card';
import PollsCard from '../polls/card';
import DefectCard from '../defects/card';
import SearchedDocuments from '../documents';
import Page403 from '../pages/not-found/403';
import Page404 from '../pages/not-found';

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	user: state.auth.get('user'),
	community: state.system.get('community'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({});

class Content extends Component {
	render(){
		const path = this.props.hostEnable ? '' : this.props.match.path;

		if(!this.props.community) {
			return <div>Loading...</div>;
		}

		return (
			<ContentRow>
				{this.props.community.get('payment_model') == 1 ? (
					<SidebarBasic match={this.props.match}/>
				):(
					<Sidebar match={this.props.match} />
				)}

				<ContentWrap>
					<ContentInner>
							<Switch>
								<Route exact path={`${path}/`} component={MainPage}/>
								<Route exact path={`${path}/home/`} component={MainPage}/>
								<Route exact path={`${path}/search-documents`} component={SearchedDocuments}/>
								<Route path={`${path}/public-budget`} component={PublicBudget} />
								<Route path={`${path}/news`} component={News}/>
								<Route path={`${path}/kindergarten`} component={KinderRouter}/>
								<Route path={`${path}/defects`} component={DefectsRouter} />
						    <Route path={`${path}/petitions`} component={Petitions}/>
								<Route path={`${path}/polls`} component={PollsRouter}/>
								<Route path={`${path}/about-project`} component={AboutProject}/>
								<Route path={`${path}/blood`} component={Blood}/>
								<Route path={`${path}/connect`} component={ConnectPage}/>
								<Route path={`${path}/connect-map`} component={ConnectMap}/>
								<Route path={`${path}/contacts`} component={Contacts}/>
								<Route path={`${path}/decentral`} component={Decental}/>
								<Route path={`${path}/medicines`} component={Drugs}/>
								<Route exact path={`${path}/e-procurement`} component={EProcurement}/>
								<Route path={`${path}/e-procurement/:page`} component={EProcurement}/>
								<Route path={`${path}/e-service`} component={EService}/>
								<Route path={`${path}/export-data`} component={ExportData}/>
								<Route path={`${path}/help`} component={Help}/>
								<Route path={`${path}/invest-map`} component={InvestMain}/>
								<Route path={`${path}/info/flats`} component={ListAccomodation}/>
								<Route path={`${path}/open-budget`} component={OpenBudget}/>
								<Route path={`${path}/apibudget`} component={ApiBudget}/>
								<Route path={`${path}/open-finance`} component={OpenFinance}/>
								<Route path={`${path}/partners`} component={Partners}/>
								<Route path={`${path}/rules`} component={Rules}/>
								<Route path={`${path}/safety`} component={Safety}/>
								<Route path={`${path}/search-documents/:page`} component={SearchedDocuments}/>
								<Route path="*" component={Page404} />
							</Switch>
					</ContentInner>
				</ContentWrap>
			</ContentRow>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
