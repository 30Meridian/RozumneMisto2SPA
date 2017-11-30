import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';

import {TopMenuWrapper, TabWrapper, TabList, TabItem, ToggleMenu} from './components';
import config from '../../config';
import {signOut} from '../../common/redux/actions/auth';
import {fetchCommunities, changeCitySearchValue, clearCitySearchValue, submitCitySearch, redirectToCommunity} from '../redux/actions';
import SearchForm from './searchForm';
import TimeWeather from './timeWeather';
import {Row, Col} from 'react-bootstrap';
// import styles from './styles.scss';

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	user: state.auth.get('user'),
	community: state.system.get('community'),
	communities: state.system.get('communities'),
	searchedCities: state.system.get('searchedCities'),
	cityValue: state.system.get('cityValue'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	fetchCommunities: () => dispatch(fetchCommunities()),
	onSignOutClick: (event) => dispatch(signOut()),
	changeCityValue: (event) => {
		dispatch(changeCitySearchValue(event.target.value))
		dispatch(submitCitySearch())
	},
	onSelectChange: (id) => {
		dispatch(redirectToCommunity(id))
		dispatch(clearCitySearchValue())
	},
	onLoad: (slug) => dispatch(fetchCommunityBySlug(slug))
});



class TopMenu extends Component {

	componentWillMount() {
		this.props.fetchCommunities();
	}

	constructor(props) {
		super(props);
		this.state = {
			search: false
		};
		this.changeState = this.changeState.bind(this);
	}

	changeState(bool) {
		this.setState({search: bool});
	}

	render() {
		const cabinet = window.location.href.indexOf("cabinet") !== -1;
		const item = this.props.community;
		const login = this.props.url;
		const is_login = login.indexOf("sign-in") !== -1;

		let communityMember = false;
		if (this.props.user) {
			const filteredList = this.props.user.get('community_list')
				.filter(item => (login.indexOf(item.slug) !== -1 ||
				this.props.community && this.props.community.get('slug') == item.slug));
			communityMember = filteredList.length > 0 || this.props.user.get('is_superuser');
		}

		if (this.props.hostEnable) {
			return (
				<TopMenuWrapper>
					<Row className="top-row">
						<Col md={4} sm={12}>
							<TimeWeather community={this.props.community} />
						</Col>
						<Col md={8} sm={12}>
							<TabWrapper>
								{this.props.token && this.props.user
									? (
										<TabList>

											<TabItem cabinet={!cabinet}>
												<ToggleMenu>
													<Link to={"/"}>
														Розумне місто: {this.props.community.get('name')}
													</Link>
												</ToggleMenu>
											</TabItem>
											{this.props.community && this.props.community.size > 0 && communityMember
												? (
													<TabItem cabinet={cabinet}>
														<Link to={"/cabinet"}>
															<i className="fa fa-user"></i>
															Мій кабінет
														</Link>
													</TabItem>
												)
												: null}
											{this.props.user.get('is_workflow_staff')
												? (
													<TabItem>
														<Link to="/admin/">
															<i className="fa fa-user"></i>
															Службовий кабінет
														</Link>
													</TabItem>
												)
												: null}
											<TabItem>
												<Link to="/sign-in" onClick={this.props.onSignOutClick}>
													<i className="fa fa-sign-out"></i>
													Вийти
												</Link>
											</TabItem>
										</TabList>
									)
									: (
										<TabList>
											{is_login ? (null) : (
													<TabItem cabinet={!cabinet}>
														<ToggleMenu>
															{this.props.community == undefined
																? (null)
																: (
																	<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}`}>
																		Розумне місто: {this.props.community.get('name')}
																	</Link>
																)}
														</ToggleMenu>
													</TabItem>
												)}
											<TabItem>
												<Link to="/sign-in">
													<i className="fa fa-sign-out"></i>
													Увійти
												</Link>
											</TabItem>
										</TabList>
									)}
							</TabWrapper>
						</Col>
					</Row>
				</TopMenuWrapper>
			);
		}

		return (
			<TopMenuWrapper>
				<Row className="top-row">
					<Col md={4} sm={12}>
						<TimeWeather community={this.props.community} />
					</Col>
					<Col md={8} sm={12}>
						<TabWrapper>
							{this.props.token && this.props.user
								? (
									<TabList>
										{this.props.community && this.props.community.size > 0
											? (
												<TabItem cabinet={!cabinet}>
													{this.state.search
														? (
															<ToggleMenu>
																<div>
																	<SearchForm
																		cityValue={this.props.cityValue}
																		changeCityValue={this.props.changeCityValue}
																		searchedCities={this.props.searchedCities}
																		onSelectChange={this.props.onSelectChange}
																		changeState = {this.changeState}
																	/>
																	<i className="fa fa-caret-square-o-up" onClick={() => this.setState({search: false})}></i>
																</div>
															</ToggleMenu>
														)
														: (
															<ToggleMenu>
																<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/`}>
																	Розумне місто: {this.props.community.get('name')}
																</Link>
																<i className="fa fa-caret-square-o-down" onClick={() => this.setState({search: true})}></i>
															</ToggleMenu>
														)}
												</TabItem>
											)
											: (
												<TabItem>
													<ToggleMenu>
														<div>
															<SearchForm
																cityValue={this.props.cityValue}
																changeCityValue={this.props.changeCityValue}
																searchedCities={this.props.searchedCities}
																onSelectChange={this.props.onSelectChange}
																changeState = {this.changeState}
															/>
															<i className="fa fa-caret-square-o-up" onClick={() => this.setState({search: false})}></i>
														</div>
													</ToggleMenu>
												</TabItem>
											)}
										{this.props.community && this.props.community.size > 0 && communityMember
											? (
												<TabItem cabinet={cabinet}>
													<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}/cabinet`}>
														<i className="fa fa-user"></i>
														Мій кабінет
													</Link>
												</TabItem>
											)
											: null}
										{this.props.user.get('is_workflow_staff')
											? (
												<TabItem>
													<Link to="/admin/">
														<i className="fa fa-user"></i>
														Службовий кабінет
													</Link>
												</TabItem>
											)
											: null}
										{this.props.user.get('is_community_moderator')
											? (
												<TabItem>
													<Link to="/moderator/">
														<i className="fa fa-user"></i>
														Панель модератора
													</Link>
												</TabItem>
											)
											: null}
										<TabItem>
											<Link to="/sign-in" onClick={this.props.onSignOutClick}>
												<i className="fa fa-sign-out"></i>
												Вийти
											</Link>
										</TabItem>
									</TabList>
								)
								: (
									<TabList>
										{is_login
											? (null)
											: (
												<TabItem cabinet>
													{this.state.search
														? (
															<ToggleMenu>
																<div>
																	<SearchForm
																		cityValue={this.props.cityValue}
																		changeCityValue={this.props.changeCityValue}
																		searchedCities={this.props.searchedCities}
																		onSelectChange={this.props.onSelectChange}
																		changeState = {this.changeState}
																	/>
																	<i className="fa fa-caret-square-o-up" onClick={() => this.setState({search: false})}></i>
																</div>
															</ToggleMenu>
														)
														: (
															<ToggleMenu>
																{this.props.community == undefined
																	? (null)
																	: (
																		<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}`}>
																			Розумне місто: {this.props.community.get('name')}
																		</Link>
																	)}
																<i className="fa fa-caret-square-o-down" onClick={() => this.setState({search: true})}></i>
															</ToggleMenu>
														)}
												</TabItem>
											)}
										<TabItem>
											<Link to="/sign-in">
												<i className="fa fa-sign-out"></i>
												Увійти
											</Link>
										</TabItem>
									</TabList>
								)}
						</TabWrapper>
					</Col>
				</Row>
			</TopMenuWrapper>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
