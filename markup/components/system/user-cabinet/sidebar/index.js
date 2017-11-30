import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown/lib/components/Dropdown.js';

import {changeMobileMenu} from '../../redux/actions';
import {signOut} from '../../../common/redux/actions/auth';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
 menu: state.system.get('communityOfficeMenu'),
 toggleMobile: state.system.get('toggleMobile'),
 community: state.system.get('community'),
 user: state.auth.get('user'),
 token: state.auth.get('token'),
 hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
  changeMobileMenu: (event) => dispatch(changeMobileMenu()),
	onSignOutClick: (event) => dispatch(signOut()),
})

class Sidebar extends Component {

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

	render() {
		const url = this.props.match.url;
		const mobileMenu = this.props.toggleMobile
			? styles.sidebar
			: styles.sidebar + " " + styles.sidebarOpen;
		const target_city = url.indexOf("drohobych") !== -1 || (
      this.props.community && this.props.community.get('slug') === "drohobych");
    const medicine = url.indexOf("pryluky/cabinet") !== -1 || url.indexOf("voznesensk/cabinet") !== -1;

    if (this.props.menu) {
			return (
				<div className={mobileMenu}>
					<div className={styles.sidebarMenu}>
						<div className={styles.sidebarHead}>
							<i className="fa fa-caret-square-o-down"></i>
							Кабінет користувача
						</div>
						{this.props.menu.get('children').map((item, index) => {
							if (item.has('children')) {
								return (
									<Dropdown key={index}>
										<DropdownTrigger>
											<div to={`/${url}/` + item.get('path')}>
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
														<Link to={`/${url}` + child.get('path')} key={child_index}>
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
									<Link to={`/${url}` + item.get('path')} key={index}>
										<i className={"fa " + item.get('icon_class')}></i>
										<span>{item.get('title')}</span>
									</Link>
								);
							}
						})}
					</div>
				</div>
			)
		}

		return (
			<div className={mobileMenu}>
				<div className={styles.sidebarMenu}>

					<div className="sidebar-mobile">
						<div className={styles.sidebarHead}>
							Основне меню
						</div>
						<Link to={`${this.props.hostEnable ? '' : '/' + this.props.community.get('slug')}`}>
							<i className="fa fa-long-arrow-left"></i>
							До громади
						</Link>
						{this.props.user && this.props.user.get('is_workflow_staff')
							? (

								<Link to="/admin/">
									<i className="fa fa-user"></i>
									<span>Службовий кабінет</span>
								</Link>
							)
							: null}
						<Link className={styles.tabsLink} to="/sign-in" onClick={this.props.onSignOutClick}>
							<i className="fa fa-sign-out"></i>
							<span>Вийти</span>
						</Link>
					</div>


					<div className={styles.sidebarHead}>
						<span>Кабінет користувача</span>
					</div>
					<Link to={url}>
						<i className="fa fa-table"></i>
						<span>Кабінет користувача</span>
					</Link>
					<Link to={`${url}/user-info`}>
						<i className="fa fa-user"></i>
						<span>Мій профіль</span>
					</Link>
					<Link to={`${url}/available`}>
						<i className="fa fa-bandcamp "></i>
						<span>Доступні послуги</span>
					</Link>
					<Link to={`${url}/my-services`}>
						<i className="fa fa-male"></i>
						<span>Мої послуги</span>
					</Link>
          <Link to={`${url}/my-petitions`}>
            <i className="fa fa-file-text-o"></i>
						<span>Мої петиції</span>
					</Link>
					<Link to={`${url}/my-defects`}>
						<i className="fa fa-wrench"></i>
						<span>Мої заявки ЖКГ</span>
					</Link>

          {medicine ? (
          <Link to={`${url}/medicine`}>
            <i className="fa fa-plus"></i>
            <span>Медицина</span>
          </Link>
          ) : null}

					{target_city
						? (
							<a href="http://sadok.loda.gov.ua/viewapplication" target="_blank" onClick={(event) => {
   						 if (window.innerWidth < 768) {
   							 this.props.changeMobileMenu();
   						 }
   					 }}>
								<i className="fa fa-child"></i>
								<span>Електронний реєстр дітей</span>
							</a>
						)
						: null}

					{target_city
						? (
							<a href="http://drohobych-rada.gov.ua/viddily/tsnap/" target="_blank" onClick={(event) => {
   						 if (window.innerWidth < 768) {
   							 this.props.changeMobileMenu();
   						 }
   					 }}>
								<i className="fa fa-link"></i>
								<span>Веб сайт ЦНАП</span>
							</a>
						)
						: null}

					{target_city
						? (
							<a href="http://drohobych-rada.gov.ua/blagodijni-vnesky-ta-batkivska-plata-online/" target="_blank" onClick={(event) => {
   						 if (window.innerWidth < 768) {
   							 this.props.changeMobileMenu();
   						 }
   					 }}>
								<i className="fa fa-money"></i>
								<span>Благодійні внески</span>
							</a>
						)
						: null}
				</div>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
