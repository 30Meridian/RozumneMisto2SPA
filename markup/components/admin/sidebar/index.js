import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {SidebarWrap, SidebarInner, SidebarHead} from './components';
import styles from './styles.scss';

import {changeMobileMenu} from '../../system/redux/actions';
import {signOut} from '../../common/redux/actions/auth';

const mapStateToProps = (state) => ({
	user: state.auth.get('user'),
	toggleMobile: state.system.get('toggleMobile'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	changeMobileMenu: (event) => dispatch(changeMobileMenu()),
	onSignOutClick: (event) => dispatch(signOut()),
});

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
		const mobileMenu = this.props.toggleMobile
			? styles.sidebar
			: styles.sidebar + " " + styles.sidebarOpen;

		const path = this.props.path || "";

		const sidebarHead = !this.props.toggleMobile
			? styles.sidebarHead
			: styles.noneDisplay;

		let communityLink = null;

		if (this.props.user.get('community_list').size > 0) {
			communityLink = (
				<Link to={this.props.hostEnable ? '' : '/' + this.props.user.get('community_list')[0].slug}>
					<i className="fa fa-long-arrow-left"></i>
					До громади
				</Link>
			);
		}

		return (
			<SidebarWrap visible={this.props.toggleMobile}>

					<SidebarInner>
		       <SidebarHead visible={this.props.toggleMobile}>
		        Головне меню:
		       </SidebarHead>

					 {communityLink}

		       <Link to={`${path}/`}>
		      	 <i className="fa fa-home"></i>
						 <span>Документи</span>
	         </Link>
		       <Link to={`${path}/documents/list`}>
		      	 <i className="fa fa-plus"></i>
						 <span>
							 Створити документ
						 </span>
	         </Link>
					 <Link to={`${path}/help`}>
						 <i className="fa fa-question-circle"></i>
						 <span>
							 Допомога
						 </span>
					 </Link>

		      {this.props.user && this.props.user.get('is_superuser') && (
						<div>
					<SidebarHead visible={this.props.toggleMobile}>
		        Адміністрування
		      </SidebarHead>

					<Link to={`${path}/documents/admin`}>
						<i className="fa fa-circle-o"></i>
						<span>
						  Документи
						</span>
					</Link>

	         <Link to={`${path}/builder`}>
		      	 <i className="fa fa-asterisk"></i>
		       	 <span>
							 Бізнес-процеси
						 </span>
	         </Link>

	 				<Link className="item" to={`${path}/settings/communities`}>
	 					<i className="fa fa-asterisk"></i>
	 					<span>
							Громади
						</span>
	 				</Link>

					<Link className="item" to={`${path}/settings/department`}>
	 					<i className="fa fa-asterisk"></i>
	 					<span>
							Департаменти
						</span>
	 				</Link>

					<Link className="item" to={`${path}/settings/users`}>
						<i className="fa fa-asterisk"></i>
						<span>
							Користувачі
						</span>
					</Link>
					{/*
					// TODO: System dictionaries
	         <Link className="item" to="/settings/system">
		      	 <i className="fa fa-asterisk"></i>
		       	 Системні налаштування
	         </Link>

	         <Link className="item" to="/settings/dictionaries">
		      	 <i className="fa fa-asterisk"></i>
		       	 Керування довідниками
	         </Link>

	         <Link className="item" to="/settings/modules">
		      	 <i className="fa fa-asterisk"></i>
		       	 Додаткові модулі
	         </Link>
	 			 	*/}

					<Link className="item" to="/sign-in">
						<i className="fa fa-sign-out"></i>
						<span>
							Вийти
						</span>

					</Link>
					  </div>
					 )}
	     	 </SidebarInner>
	   	 </SidebarWrap>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
