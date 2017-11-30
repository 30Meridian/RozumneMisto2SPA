import React, {Component} from 'react';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown/lib/components/Dropdown.js';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {DropdownWrap, SidebarMenu, SidebarHead, SidebarSwitch, SidebarMobile, Alert} from './components';
import {fetchCommunities, changeCitySearchValue, clearCitySearchValue, submitCitySearch, redirectToCommunity, changeMobileMenu} from '../redux/actions';

import {signOut} from '../../common/redux/actions/auth';
import SearchForm from './../top-menu/searchForm';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
	community: state.system.get('community'),
	user: state.auth.get('user'),
	token: state.auth.get('token'),
	menu: state.system.get('communityMenu'),
	toggleMobile: state.system.get('toggleMobile'),
	communities: state.system.get('communities'),
	searchedCities: state.system.get('searchedCities'),
	cityValue: state.system.get('cityValue'),
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

class SidebarBasic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: true,
			search: false,
		};
		this.clickHandle = this.clickHandle.bind(this);
		this.changeState = this.changeState.bind(this);
	};

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
		const path = this.props.community && this.props.community.get('slug');
		const netyshin = this.props.match.url.indexOf("netyshin") !== -1;

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
									<Dropdown key={index}>
										<DropdownTrigger>
											<div to={`/${path}/` + item.get('path')}>
												<i className={"fa " + item.get('icon_class')}></i>
												<span>{item.get('title')}</span>
												<span className={styles.destroy}>
													<i className="fa fa-angle-left pull-right destroy"></i>
												</span>
											</div>
										</DropdownTrigger>
										<div className={styles.dropdownList}>
											<DropdownContent>
												{item.get('children').map((child, child_index) => {
													return (
														<Link to={`/${path}` + child.get('path')} key={child_index}>
															<i className={"fa " + child.get('icon_class')}></i>
															<span>{child.get('title')}</span>
														</Link>
													);
												})}
											</DropdownContent>
										</div>
									</Dropdown>
								);
							} else {
								return (
									<Link to={`/${path}` + item.get('path')} key={index}>
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
			<SidebarMenu check={budgetCheck}>
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

										<Link to={`/${this.props.community.get('slug')}/cabinet`}>
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

								<Link className={styles.tabsLink} to="/sign-in" onClick={this.props.onSignOutClick}>
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
											<Link to={`/${this.props.community.get('slug')}/`}>
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
					<Link to={`/${path}/`}>
						<i className="fa fa-home"></i>
						<span>Головна сторінка громади</span>
					</Link>
					<Link to={`/`}>
						<i className="fa fa-reply"></i>
						<span>Головна сторінка проекту</span>
					</Link>
					<Link to={`/${path}/news`}>
						<i className="fa fa-newspaper-o"></i>
						<span>Новини міста <Alert> (не активно)</Alert></span>
					</Link>

          <Link to={`/${path}/defects`}>
            <i className="fa fa-search"></i>
            <span>Заявки ЖКГ <Alert> (не активно)</Alert></span>
          </Link>

          <Link className="teal item" to={`/${path}/petitions/`}>
            <i className="fa fa-check"></i>
            <span>Петиції <Alert> (не активно)</Alert></span>
          </Link>


					<Link to={`/${path}/polls`}>
						<i className="fa fa-check"></i>
						<span>Опитування <Alert> (не активно)</Alert></span>
					</Link>

					<Link to={`/${path}/open-finance`}>
						<i className="fa fa-credit-card"></i>
						<span>Публічні фінанси</span>
					</Link>

					<Link to={`/${path}/open-budget`}>
						<i className="fa fa-pie-chart"></i>
						<span>Відкритий бюджет <Alert> (не активно)</Alert></span>
					</Link>

					<Link to={`/${path}/blood`}>
						<i className="fa fa-heartbeat"></i>
						<span>Донорство крові</span>
					</Link>

					<Link to={`/${path}/e-procurement`}>
						<i className="fa fa-money"></i>
						<span>Електронні закупівлі</span>
					</Link>

					<Link to={`/${path}/info/flats`}>
						<i className="fa fa-calendar"></i>
						<span>Черги на житло <Alert> (не активно)</Alert></span>
					</Link>

					<Link to={`/${path}/invest-map`}>
						<i className="fa fa-line-chart"></i>
						<span>Інвестиційна карта <Alert> (не активно)</Alert></span>
					</Link>

					<a href="http://rozumneosbb.org/" target="_blank">
						<i className="fa fa-building-o" aria-hidden="true"></i>
						<span>Розумне ОСББ</span>
					</a>

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

					<SidebarHead>
						<span>Інформація</span>
					</SidebarHead>

					<Link to={`/${path}/decental`}>
						<i className="fa fa-asterisk"></i>
						<span>Децентралізація влади</span>
					</Link>

				</div>
			</SidebarMenu>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarBasic));
