import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

		if (this.props.user.get('community_list')) {
			communityLink = (
				<Link to={this.props.hostEnable ? '' : '/' + this.props.user.get('community_list')[0].slug}>
					<i className="fa fa-long-arrow-left"></i>
					До громади
				</Link>
			);
		}

		return (
			<div className={mobileMenu}>
				<div className={styles.sidebarMenu}>
	      	<div className={sidebarHead}>
		      	Головне меню:
		      </div>
					{communityLink}
					<Link className="item" to="/sign-in">
						<i className="fa fa-sign-out"></i>
						<span>
							Вийти
						</span>
					</Link>
			  </div>
   	  </div>
	  );
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
