import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, NavLink} from 'react-router-dom';

import history from '../../../history';

 
import weather from '../../../../assets/js/libraries/weather';

import {loadUser, signOut} from '../../../common/redux/actions/auth';
import {fetchCommunities} from '../../redux/actions';

const mapStateToProps = (state) => ({token: state.auth.get('token'), user: state.auth.get('user'), community: state.system.get('community'), communities: state.system.get('communities')});

const mapDispatchToProps = (dispatch) => ({
	loadUser: () => dispatch(loadUser()),
	onSignOutClick: (event) => dispatch(signOut()),
	fetchCommunities: () => dispatch(fetchCommunities())
});

class Nav extends Component {

	componentWillMount() {
		this.props.loadUser();
		this.props.fetchCommunities();
	}

	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			modibleClick: false,
			mobileMenu: false,
			cityClicked: false
		}

		this.clickHandle = this.clickHandle.bind(this);
		this.clickHandleMobile = this.clickHandleMobile.bind(this);
		this.clickHandleMobileMenu = this.clickHandleMobileMenu.bind(this);
		this.clickHandleCity = this.clickHandleCity.bind(this);
	};

	clickHandleCity(event) {
		this.setState({
			cityClicked: !this.state.cityClicked,
			clicked: false
		});
	}

	clickHandle(event) {
		this.setState({
			clicked: !this.state.clicked,
			cityClicked: false
		});
	}

	clickHandleMobile(event) {
		this.setState({
			modibleClick: !this.state.modibleClick,
			mobileMenu: false
		});
	}

	clickHandleMobileMenu(event) {
		this.setState({
			mobileMenu: !this.state.mobileMenu,
			modibleClick: false
		});
	}

	render() {

		const cityDropdown = this.state.cityClicked
			? "nav-item dropdown menu-icon textselect-off open"
			: "nav-item dropdown menu-icon textselect-off"

		const dropdown = this.state.clicked
			? "nav-item dropdown hidden-sm-down menu-icon textselect-off open"
			: "nav-item dropdown hidden-sm-down menu-icon textselect-off"

		const mobileDropdown = this.state.modibleClick
			? "navbar-toggleable-custom dropdown-menu-custom p-x-1 hidden-md-up collapse in"
			: "navbar-toggleable-custom dropdown-menu-custom p-x-1 hidden-md-up collapse"

		const mobileMenu = this.state.mobileMenu
			? "navbar-toggleable-custom collapse in"
			: "navbar-toggleable-custom collapse"

		const item = this.props.user;

		return (

			<nav className="navbar navbar-dark bg-inverse bg-inverse-custom navbar-fixed-top navbar-pic">
				<div className="container">

					<Link className="navbar-brand" to="/">
						<img src="/assets/img/general/logo.png" width="230px"/>
						<span className="sr-only">Розумне місто</span>
					</Link>
					<div className="navbar-toggler hidden-md-up pull-xs-right" onClick={this.clickHandleMobileMenu} data-toggle="collapse" aria-expanded="false" aria-controls="collapsingNavbar">
						<i className="fa fa-bars" aria-hidden="true"></i>
					</div>
					{this.props.token ? (
					<div className="navbar-toggler navbar-toggler-custom hidden-md-up pull-xs-right" data-toggle="collapse" aria-expanded="false" aria-controls="collapsingMobileUser">
						<span className="icon-user" onClick={this.clickHandleMobile}></span>
					</div>
					):null}
					<div id="collapsingNavbar" className={mobileMenu} role="tabpanel" aria-labelledby="collapsingNavbar">
						<ul className="nav navbar-nav pull-xs-right">

							<li className="nav-item nav-item-toggable">
								<Link to="/" className="nav-link">Головна</Link>
							</li>

							<li className="nav-item nav-item-toggable project-item">
								<div className="project-item-wrap">
									<NavLink activeClassName="selected"
										to="/project" className="nav-link dropdown-toggle" id="dropdownMenu2" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Проект
									</NavLink>
									<span className="icon-caret-down"></span>
								</div>

								<div className="project-dropdown">
									<Link to="/project" className="dropdown-item">Про проект</Link>
                  <a className="dropdown-item" href="https://drive.google.com/drive/folders/0B1NO5RoNKst7WUlmUzNLWnFsVzA?usp=sharing" target="_blank">Документація</a>
                  <a className="dropdown-item" href="https://drive.google.com/drive/folders/0B1NO5RoNKst7TzFPQ0lhR3lGVFE?usp=sharing" target="_blank">Презентації</a>
                  <a className="dropdown-item" href="https://drive.google.com/drive/folders/0B1NO5RoNKst7NTlJMmhsaG9GUTg?usp=sharing" target="_blank">Логотипи і графіка</a>
                  <a className="dropdown-item" href="https://www.youtube.com/channel/UCRK-b3HwqcdJd-KisCp64Dg" target="_blank">Відеоматеріал </a>
                  <a className="dropdown-item" href="https://drive.google.com/open?id=1YdXqzEJzKyqaUn5aKsZY6k58VHiuE2Ja5d88gpH3Adk" target="_blank">API-інтерфейс</a>
                  <Link to="/contacts" className="dropdown-item">Партнерство</Link>
                </div>

							</li>

							<li className="nav-item nav-item-toggable">
								<NavLink activeClassName="selected"
									to="/team" className="nav-link">Команда</NavLink>
							</li>

							{/* <li className="nav-item nav-item-toggable">
								<NavLink activeClassName="selected" to="/results" className="nav-link">Результати</NavLink>
							</li> */}

							<li className="nav-item nav-item-toggable">
								<NavLink activeClassName="selected" to="/services" className="nav-link">Послуги</NavLink>
							</li>

							<li className="nav-item nav-item-toggable">
								<NavLink activeClassName="selected" to="/contacts" className="nav-link">Контакти</NavLink>
							</li>

							 <li>

							 </li>

							{this.props.token ?

								item ? (
									<span className="span-wrap">
										{item.get('community_list') && item.get('community_list').length > 0 ? (
										item.get('community_list').length > 1
											? (
												<li className={cityDropdown} onClick={this.clickHandleCity}>
													<a className="nav-link dropdown-toggle nav-dropdown-user" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														Мої громади
														<span className="icon-caret-down"></span>
													</a>
													<div className="dropdown-menu dropdown-menu-right dropdown-menu-user dropdown-menu-animated" aria-labelledby="dropdownMenu3">
														<ul>
															{item.get('community_list').map((value) => (
																<Link to={`/${value.slug}`} className="dropdown-item text-uppercase">
																	<li>{value.name}</li>
																</Link>
															))}
														</ul>
													</div>
												</li>
											)
											: <li className="nav-item nav-item-toggable">
														<Link to={`/${item.get('community_list')[0].slug}`} className="nav-link">
															{item.get('community_list')[0].name}
														</Link>
												</li>
										) : null}

										<li className={dropdown} onClick={this.clickHandle}>
											<a className="nav-link dropdown-toggle nav-dropdown-user" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<i className="fa fa-user" aria-hidden="true"></i>
												<span className="icon-caret-down"></span>
											</a>
											<div className="dropdown-menu dropdown-menu-right dropdown-menu-user dropdown-menu-animated" aria-labelledby="dropdownMenu2">
												<div className="media">
													<div className="media-body media-middle">
														<h5 className="media-heading">{item.get('first_name')} {item.get('last_name')}</h5>
														<h6>{item.get('email')}</h6>
													</div>
												</div>
												{item.get('community_list') && item.get('community_list').length > 0 ? (
												<Link to={`/${item.get('community_list')[0].slug}/cabinet`} className="dropdown-item text-uppercase">Мій кабінет</Link>
												) : null }
												{item.get('community_list') && item.get('community_list').length > 0 ? (
												<Link to={`/${item.get('community_list')[0].slug}/cabinet/user-info`} className="dropdown-item text-uppercase">Мій профіль</Link>
												) : null }
												{item.get('is_workflow_staff')
												?(
													<Link to='/admin' className="dropdown-item text-uppercase">Службовий кабінет</Link>
												)
												:null}
												<br/>
												<Link to="/sign-in" className="dropdown-item text-uppercase" onClick={this.props.onSignOutClick}>Вийти</Link>
											</div>
										</li>
									</span>
								) : (<div></div>)
								: (
									<span className="span-wrap login-wrap">

										<li className="nav-item nav-item-toggable">
											<Link className="nav-link span-link" to="/sign-in">Увійти</Link>
										</li>
									</span>
								)}

						</ul>
					</div>
					{this.props.token && item ?
					(<div id="collapsingMobileUser" className={mobileDropdown} role="tabpanel" aria-labelledby="collapsingMobileUser">
						<div className="media m-t-1">
							<div className="media-body media-middle">
								<h5 className="media-heading">{item.get('first_name')} {item.get('last_name')}</h5>
								<h6>{item.get('email')}</h6>
							</div>
						</div>
						{item.get('community_list') && item.get('community_list').length > 0 ? (
						<Link to={`/${item.get('community_list')[0].slug}/cabinet`} className="dropdown-item text-uppercase">Мій кабінет</Link>
						) : null }
						{item.get('community_list') && item.get('community_list').length > 0 ? (
						<Link to={`/${item.get('community_list')[0].slug}/cabinet/user-info`} className="dropdown-item text-uppercase">Мій профіль</Link>
						) : null }
						{item.get('is_workflow_staff')
						?(
							<Link to='/admin' className="dropdown-item text-uppercase">Службовий кабінет</Link>
						)
						:null}
						<br/>
						<Link to="/sign-in" className="dropdown-item text-uppercase" onClick={this.props.onSignOutClick}>Вийти</Link>

					</div>):null}
				</div>
			</nav>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
