import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';

import InvestForm from './form';
// import Projects from './projects';
import MapInvest from './map';
import InvestCard from './card';
import InvestPlaceholder from './placeholder';
import AboutCity from './about-city';
import Managment from './managment';
import Logistic from './logistic';
// import Characteristic from './characteristic';
import Box from 'components/box';

import styles from './styles.scss';

import {fetchCommunityBySlug} from '../../redux/actions';
import {loadUser} from '../../../common/redux/actions/auth';

const mapStateToProps = (state) => ({community: state.system.get('community')});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (slug) => {
		dispatch(fetchCommunityBySlug(slug));
		dispatch(loadUser());
	}
});

class InvestMain extends Component {

	componentWillMount() {
		this.props.onLoad(this.props.match.params.community_slug);
	}

	render() {

		const path = this.props.match.url;
		const detail = this.props.location.pathname.indexOf("detail") !== -1;
		return (
			<div className={styles.investPage}>

				{!detail
					? (
						<Box>
						<div>
							<h1 className="text-center">Інвестиційна мапа - Нетішин</h1>
							{this.props.community.get('payment_model') == 1
								? (null)
								: (
									<div className={styles.btnGroup}>
										<div className="btn-group">
											<Link className="btn btn-default" to={`${path}`}>Мапа</Link>
											<Link className="btn btn-default" to={`${path}/about-city`}>Про місто</Link>
											<Link className="btn btn-default" to={`${path}/managment`}>Керівництво міста</Link>
											<Link className="btn btn-default" to={`${path}/logistic`}>Логістика</Link>
											<Link className="btn btn-default" to={`${path}/map`}>Відправити ваш проект на розгляд</Link>
										</div>

									</div>
								)}
						</div>
						</Box>
					)
					: null}

				<Switch>
					{this.props.community.get('payment_model') == 1
						? (<Route exact path={`${path}`} component={InvestPlaceholder}/>)

						: (<Route exact strict path={`${path}`} component={MapInvest}/>)}
					<Route path={`${path}/map`} component={InvestForm}/>
					<Route path={`${path}/about-city`} component={AboutCity}/>
					<Route path={`${path}/managment`} component={Managment}/>
					<Route path={`${path}/logistic`} component={Logistic}/>
					<Route exact path={`${path}/:page`} component={MapInvest}/>
					<Route path={`${path}/detail/:id`} component={InvestCard}/>
					{/* <Route path={`${path}/characteristic`} component={Characteristic}/>
					<Route exact path={`${path}/projects/detail/:id`} component={InvestCard}/>
					<Route exact path={`${path}/projects`} component={Projects}/>
					<Route path={`${path}/projects/:page`} component={Projects}/> */}
				</Switch>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestMain);
