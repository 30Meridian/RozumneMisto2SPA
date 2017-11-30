import React, {Component} from 'react';
import {connect} from 'react-redux';
 
import styled from 'styled-components';
import { withRouter } from 'react-router';

import {fetchCommunities, changeSearchValue, searchDocuments, changeMobileMenu} from '../redux/actions';
import {signOut} from '../../common/redux/actions/auth';
import {HeaderRow, Head, Fonts, Search, Toggle, Logo, HeadInput, RightHeader} from './components';

import {Link} from 'react-router-dom';
import {Input} from '../../form-components';
import form from '../../common-components/form.scss';

const mapStateToProps = state => ({
	community: state.system.get('community'),
	communities: state.system.get('communities'),
	token: state.auth.get('token'),
	query: state.system.get('query'),
	toggleMobile: state.system.get('toggleMobile'),
	isFetching: state.system.get('searchIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable')
});


const mapDispatchToProps = dispatch => ({
	searchDocuments: (event) => dispatch(changeSearchValue(event.target.value)),
	onSignOutClick: (event) => dispatch(signOut()),
	changeMobileMenu: (event) => {
		dispatch(changeMobileMenu());
	},
	onSubmitSearch: (event, slug) => {
		event.preventDefault();
		dispatch(searchDocuments(slug));
	}
});

class Header extends Component {

	componentDidMount() {
		$(document).ready(function() {
			var fontSize = parseInt($('body').css('font-size'), 10);
			$('#plus').on('click', function() {
				fontSize += 0.5;
				$('html').css('font-size', fontSize + 'px');
			})
			$('#minus').on('click', function() {
				fontSize -= 0.5;
				$('html').css('font-size', fontSize + 'px');
			})
		});
	}

	render() {
		let header = true;
		if (window.innerWidth < 768) {
			header = this.props.toggleMobile;
		}
		const budgetCheck = this.props.location.pathname.indexOf("apibudget") !== -1
		const check = this.props.hostEnable;
		const data = !this.props.toggleMobile;
		const community = this.props.hostEnable
			? ""
			: this.props.community
				? this.props.community.get('slug')
				: "";

		return (
			<HeaderRow visible={budgetCheck}>
				<Head header check>
					<Logo>
						{!this.props.toggleMobile
							? (
								<Link to={`/${community}`}>
									<img src={this.props.community && this.props.community.get('logo') && this.props.hostEnable
										? this.props.community.get('logo')
										: "/assets/img/general/logo.png"} alt=""/>
								</Link>
							)
							: (
								<Link to={`/${community}`}>
									РМ
								</Link>
							)}

					</Logo>
					<Toggle onClick={(event) => this.props.changeMobileMenu()}>
						<i className="fa fa-bars" aria-hidden="true"></i>
					</Toggle>

					{header && (
						<Search>
							<form onSubmit={(event) => this.props.onSubmitSearch(event, this.props.community.get('slug'))}>
								<i className="fa fa-search"></i>
								<HeadInput value={this.props.query} onChange={this.props.searchDocuments} placeholder="Пошук матеріалу по назві або змісту"/> {this.props.isFetching && <div className="small-spinner">
									<i className="fa fa-spinner"></i>
								</div>
							}
							</form>
						</Search>
					)}
					<RightHeader>
						<Fonts>
							<div id="plus">A+</div>
							<div id="minus">A-</div>
						</Fonts>
					</RightHeader>
				</Head>
			</HeaderRow>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
