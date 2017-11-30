import React, {Component} from 'react';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown/lib/components/Dropdown.js';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import {fetchCommunities, changeCitySearchValue, clearCitySearchValue, submitCitySearch, redirectToCommunity, changeMobileMenu} from '../redux/actions';
import SearchForm from './../top-menu/searchForm';
import {signOut} from '../../common/redux/actions/auth';
import {DropdownWrap, SidebarMenu, SidebarHead, SidebarSwitch, SidebarMobile} from './components';

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	user: state.auth.get('user'),
	token: state.auth.get('token'),
	menu: state.system.get('communityMenu'),
	toggleMobile: state.system.get('toggleMobile'),
	communities: state.system.get('communities'),
	searchedCities: state.system.get('searchedCities'),
	cityValue: state.system.get('cityValue'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	fetchCommunities: () => dispatch(fetchCommunities()),
	onSignOutClick: (event) => dispatch(signOut()),
	changeMobileMenu: (event) => dispatch(changeMobileMenu()),
	changeCityValue: (event) => {
		dispatch(changeCitySearchValue(event.target.value))
		dispatch(submitCitySearch())
	},
	onSelectChange: (id) => {
		dispatch(redirectToCommunity(id))
		dispatch(clearCitySearchValue())
	},
});

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: true,
			search: false,
		};
		this.changeState = this.changeState.bind(this);
		this.clickHandle = this.clickHandle.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location.pathname != nextProps.location.pathname && window.innerWidth < 768) {
			if (this.props.toggleMobile === true) {
				this.props.changeMobileMenu();
			}
		}
	}

	componentDidMount() {
		if (window.innerWidth < 768 && this.props.toggleMobile === true) {
			this.props.changeMobileMenu();
		}
	}

	changeState(bool) {
		this.setState({search: bool});
	}

	clickHandle(event) {
		this.setState({
			clicked: !this.state.clicked
		});
	}

	render() {

		const budgetCheck = this.props.location.pathname.indexOf("apibudget") !== -1
		const path = this.props.hostEnable ? '' : this.props.community && ("/" + this.props.community.get('slug'));
		const netishyn = this.props.match.url.indexOf("/netishyn") !== -1;
		const vyshgorod = this.props.match.url.indexOf("/vyshhorod") !== -1;
		const yuzhny = this.props.match.url.indexOf("/yuzhny") !== -1;

		if (this.props.menu) {
			return (
				<SidebarMenu check={budgetCheck} toggle={this.props.toggleMobile}>
					<div>
						<SidebarHead onClick={this.clickHandle}>
							<i className="fa fa-caret-square-o-down"></i>
							<span>Інструменти для міста</span>
						</SidebarHead>
						{this.props.menu.get('children').map((item, index) => {
							if (item.has('children')) {
								return (
									<DropdownWrap key={index}>
										<DropdownTrigger>
											<div to={`${path}/` + item.get('path')}>
												<i className={"fa " + item.get('icon_class')}></i>
												<span>{item.get('title')}</span>
												<span>
													<i className="fa fa-angle-left pull-right destroy"></i>
												</span>
											</div>
										</DropdownTrigger>
										<div>
											<DropdownContent>
												{item.get('children').map((child, child_index) => {
													return (
														<Link to={`${path}` + child.get('path')} key={child_index}>
															<i className={"fa " + child.get('icon_class')}></i>
															<span>{child.get('title')}</span>
														</Link>
													);
												})}
											</DropdownContent>
										</div>
									</DropdownWrap>
								);
							} else {
								return (
									<Link to={`${path}` + item.get('path')} key={index} >
										<i className={"fa " + item.get('icon_class')}></i>
										<span>{item.get('title')}</span>
									</Link>
								);
							}
						})}
					</div>
				</SidebarMenu>
			)
		}

		return (
			<SidebarMenu check={budgetCheck} toggle={this.props.toggleMobile}>
				<div>
					{this.props.token
						? (
							<SidebarMobile>
								{this.props.community && this.props.community.size > 0
									? (
										<div>
											{this.state.search
												? (
													<SidebarSwitch>
														<i className="fa fa-caret-square-o-up" onClick={() => this.setState({search: false})}></i>
														<SearchForm
															cityValue={this.props.cityValue}
															changeCityValue={this.props.changeCityValue}
															searchedCities={this.props.searchedCities}
															onSelectChange={this.props.onSelectChange}
															changeState = {this.changeState}
														/>
													</SidebarSwitch>
												)
												: (
													<SidebarSwitch>
														<i className="fa fa-caret-square-o-down" onClick={() => this.setState({search: true})}></i>
														<Link to={`/${this.props.community.get('slug')}/`}>
															Розумне місто: {this.props.community.get('name')}
														</Link>

													</SidebarSwitch>
												)}
										</div>
									)
									: (

										<div>
											<SearchForm
												cityValue={this.props.cityValue}
												changeCityValue={this.props.changeCityValue}
												searchedCities={this.props.searchedCities}
												onSelectChange={this.props.onSelectChange}
												changeState = {this.changeState}
											/>
										</div>

									)}
								{this.props.community && this.props.community.size > 0
									? (

										<Link to={`${path}/cabinet`}>
											<i className="fa fa-user"></i>
											Мій кабінет
										</Link>
									)
									: null}
								{this.props.user && this.props.user.get('is_workflow_staff')
									? (

										<Link to="/admin/">
											<i className="fa fa-user"></i>
											Службовий кабінет
										</Link>
									)
									: null}

								<Link to="/sign-in" onClick={this.props.onSignOutClick}>
									<i className="fa fa-sign-out"></i>
									Вийти
								</Link>

							</SidebarMobile>
						)
						: (
							<SidebarMobile>

								{this.state.search
									? (
										<SidebarSwitch>

											<i className="fa fa-caret-square-o-up" onClick={() => this.setState({search: false})}></i>
											<SearchForm
												cityValue={this.props.cityValue}
												changeCityValue={this.props.changeCityValue}
												searchedCities={this.props.searchedCities}
												onSelectChange={this.props.onSelectChange}
												changeState = {this.changeState}
											/>
										</SidebarSwitch>
									)
									: (
										<SidebarSwitch>
											<i className="fa fa-caret-square-o-down" onClick={() => this.setState({search: true})}></i>
											<Link to={path} >
												Розумне місто: {this.props.community.get('name')}
											</Link>
										</SidebarSwitch>
									)}

								<Link to="/sign-in">
									<i className="fa fa-sign-out"></i>
									Увійти
								</Link>

							</SidebarMobile>
						)}

					<SidebarHead onClick={this.clickHandle}>
						<i className="fa fa-caret-square-o-down"></i>
						<span>Інструменти для міста</span>
					</SidebarHead>

					<Link to={`${path}`}>
						<i className="fa fa-home"></i>
						{this.props.hostEnable ? <span>Головна сторінка</span> : <span>Головна сторінка громади</span>}
					</Link>
					{!this.props.hostEnable ?
					<Link to={`/`}>
						<i className="fa fa-reply"></i>
						<span>Головна сторінка проекту</span>
					</Link>
					: null}
					<Link to={`${path}/news`}>
						<i className="fa fa-newspaper-o"></i>
						{this.props.hostEnable ? <span>Новини проекту</span> : <span>Новини міста</span>}
					</Link>

					<DropdownWrap>
						<DropdownTrigger>

							<i className="fa fa-search"></i>
							<span>Заявки ЖКГ</span>
							<span>
								<i className="fa fa-angle-left pull-right destroy"></i>
							</span>

						</DropdownTrigger>
						<div>
							<DropdownContent>
								<Link to={`${path}/defects`}>
									<i className="fa fa-th-list"></i>
									<span>Реєстр заявок</span>
								</Link>
								{this.props.token && (

									<Link to={`${path}/defects/create`}>
										<i className="fa fa-plus-square-o"></i>
										<span>Додати заявку</span>
									</Link>
								)}
								<Link to={`${path}/defects/rules`}>
									<i className="fa  fa-info"></i>
									<span>Правила</span>
								</Link>
								<Link to={`${path}/defects/help`}>
									<i className="fa fa-question-circle"></i>
									<span>Допомога</span>
								</Link>

							</DropdownContent>
						</div>
					</DropdownWrap>

					<DropdownWrap>
						<DropdownTrigger>
							<div>
								<i className="fa fa-check"></i>
								<span>Петиції</span>
								<span>
									<i className="fa fa-angle-left pull-right destroy"></i>
								</span>
							</div>
						</DropdownTrigger>

						<div>
							<DropdownContent>
								{this.props.token && (

									<Link to={`${path}/petitions/create`}>
										<i className="fa fa-plus-square-o"></i>
										<span>Додати петицію</span>
									</Link>

								)}

								<Link className="teal item" to={`${path}/petitions/`}>
									<i className="fa fa-circle-o text-light-blue"></i>
									<span>Активні петиції</span>
								</Link>

								<Link to={`${path}/petitions/checking`}>
									<i className="fa fa-circle-o text-black"></i>
									<span>На перевірці голосів</span>
								</Link>

								<Link to={`${path}/petitions/considering`}>
									<i className="fa fa-circle-o text-yellow"></i>
									<span>Розглядаються</span>
								</Link>

								<Link to={`${path}/petitions/considered`}>
									<i className="fa fa-circle-o text-green"></i>
									<span>Розглянуті</span>
								</Link>

								<Link to={`${path}/petitions/declined`}>
									<i className="fa fa-circle-o text-red"></i>
									<span>Відхилені</span>
								</Link>

								<Link to={`${path}/petitions/archive`}>
									<i className="fa fa-circle-o"></i>
									<span>Архівні</span>
								</Link>

								<Link to={`${path}/petitions/rules`}>
									<i className="fa fa-info"></i>
									<span>Правила</span>
								</Link>

								<Link to={`${path}/petitions/help`}>
									<i className="fa fa-question-circle"></i>
									<span>Допомога</span>
								</Link>

							</DropdownContent>
						</div>

					</DropdownWrap>

					<Link to={`${path}/polls`}>
						<i className="fa fa-check"></i>
						<span>Опитування</span>
					</Link>

					{vyshgorod && (
					<DropdownWrap>
						<DropdownTrigger>

							<i className="fa fa-search"></i>
							<span>Запис до дитячого садку</span>
							<span>
								<i className="fa fa-angle-left pull-right destroy"></i>
							</span>

						</DropdownTrigger>
						<div>
							<DropdownContent>
								<Link to={`${path}/kindergarten`}>
									<i className="fa fa-th-list"></i>
									<span>Список</span>
								</Link>
								{this.props.token && (

									<Link to={`${path}/kindergarten/create`}>
										<i className="fa fa-plus-square-o"></i>
										<span>Записатися</span>
									</Link>
								)}


							</DropdownContent>
						</div>
					</DropdownWrap>
				)}



					{netishyn || vyshgorod ? (
					<DropdownWrap>
						<DropdownTrigger>

							<i className="fa fa-money" aria-hidden="true"></i>
							<span>Громадський бюджет</span>
							<span>
								<i className="fa fa-angle-left pull-right destroy"></i>
							</span>

						</DropdownTrigger>
						<div>
							<DropdownContent>

								<Link to={`${path}/public-budget`}>
									<i className="fa fa-home"></i>
									<span>Про Громадський бюджет</span>
								</Link>

								<Link to={`${path}/public-budget/projects`}>
									<i className="fa fa-th-list"></i>
									<span>Проекти</span>
								</Link>

								<Link to={`${path}/public-budget/projects/archive`}>
									<i className="fa fa-th-list"></i>
									<span>Архів</span>
								</Link>

								<Link to={`${path}/public-budget/help`}>
									<i className="fa fa-question-circle"></i>
									<span>Допомога</span>
								</Link>

								<Link to={`${path}/public-budget/statistic`}>
									<i className="fa fa-line-chart"></i>
									<span>Статистика</span>
								</Link>

							</DropdownContent>
						</div>
					</DropdownWrap>
				):null}



					<Link to={`${path}/open-finance`}>
						<i className="fa fa-credit-card"></i>
						<span>Публічні фінанси</span>
					</Link>

					<Link to={`${path}/open-budget`}>
						<i className="fa fa-pie-chart"></i>
						<span>Відкритий бюджет</span>
					</Link>

					<Link to={`${path}/blood`}>
						<i className="fa fa-heartbeat"></i>
						<span>Донорство крові</span>
					</Link>

					<Link to={`${path}/e-procurement`}>
						<i className="fa fa-money"></i>
						<span>Електронні закупівлі</span>
					</Link>

					<Link to={`${path}/info/flats`}>
						<i className="fa fa-calendar"></i>
						<span>Черги на житло</span>
					</Link>

					{ yuzhny ?
					<Link to={`${path}/medicines`}>
						<i className="fa fa-calendar"></i>
						<span>Реєстр ліків</span>
					</Link>
					: null }

					{netishyn ? (
						<Link to={`${path}/invest-map`}>
							<i className="fa fa-line-chart"></i>
							<span>Інвестиційна карта</span>
						</Link>
						// <DropdownWrap>
						// 	<DropdownTrigger>
						// 		<div>
						// 			<i className="fa fa-check"></i>
						// 			<span>Інвестиційна карта</span>
						// 			<span className={styles.destroy}>
						// 				<i className="fa fa-angle-left pull-right destroy"></i>
						// 			</span>
						// 		</div>
						// 	</DropdownTrigger>
						//
						// 	<div className={styles.dropdownList}>
						// 		<DropdownContent>
						//
						// 			<Link to={`${path}/invest-map/projects`}>
						// 				<i className="fa fa-line-chart"></i>
						// 				<span>Інвестиційні пропозиції</span>
						// 			</Link>
						//
						// 			<Link to={`${path}/invest-map/about-city`}>
						// 				<i className="fa fa-line-chart"></i>
						// 				<span>Інформація про громаду</span>
						// 			</Link>
						//
						// 			<Link to={`${path}/invest-map/characteristic`}>
						// 				<i className="fa fa-line-chart"></i>
						// 				<span>Інвестиційна характеристика</span>
						// 			</Link>
						//
						// 		</DropdownContent>
						// 	</div>
						//
						// </DropdownWrap>

					) : null}

					<a href="http://rozumneosbb.org/" target="_blank" onClick={(event) => {
						if (window.innerWidth < 768) {
							this.props.changeMobileMenu();
						}
					}}>
						<i className="fa fa-building-o" aria-hidden="true"></i>
						<span>Розумне ОСББ</span>
					</a>

					{!this.props.hostEnable ? <div>
					<SidebarHead>
						<span>Проект "Розумне місто"</span>
					</SidebarHead>

					<Link to={`/project`}>
						<i className="fa fa-circle-o"></i>
						<span>Про проект</span>
					</Link>

					<Link to={`/team`}>
						<i className="fa fa-users"></i>
						<span>Команда</span>
					</Link>

					<Link to={`/contacts`}>
						<i className="fa fa-phone"></i>
						<span>Контакти</span>
					</Link>

					<Link to={`/help`}>
						<i className="fa fa-question-circle"></i>
						<span>Допомога</span>
					</Link>

					<Link to={`/rules`}>
						<i className="fa fa-exclamation"></i>
						<span>Правила</span>
					</Link>

					<Link to={`/offer`}>
						<i className="fa fa-file"></i>
						<span>Публічна оферта</span>
					</Link>

					<Link to={`/connect`}>
						<i className="fa fa-compress"></i>
						<span>Підключити місто</span>
					</Link>
				</div> : null }

				{/* {!this.props.hostEnable ? <div>
					<div className={styles.sidebarHead}>
						<span>Інформація</span>
					</div>

					<Link to={`${path}/decental`} onClick={(event) => {
						if (window.innerWidth < 768) {
							this.props.changeMobileMenu();
						}
					}}>
						<i className="fa fa-asterisk"></i>
						<span>Децентралізація влади</span>
					</Link>
				</div> : null } */}
				</div>
			</SidebarMenu>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
