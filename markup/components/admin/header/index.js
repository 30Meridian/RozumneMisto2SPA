import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Row, Col} from 'react-bootstrap';

import {signOut} from '../../common/redux/actions/auth';
import {searchDocuments, changeSearchValue} from '../redux/actions/documents';
import {changeMobileMenu} from '../../system/redux/actions';

import {HeaderWrap, LogoItem, Toggle, SearchWrap, HeadInput, HeaderRight} from './components';
import {Input} from '../../form-components';

import styles from './styles.scss';

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	user: state.auth.get('user'),
	query: state.adminDocuments.get('query'),
	community: state.system.get('community'),
	toggleMobile: state.system.get('toggleMobile'),
	isFetching: state.adminDocuments.get('searchedDocumentsIsLoading'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	onSignOutClick: (event) => dispatch(signOut()),
	searchDocuments: (event) => dispatch(changeSearchValue(event.target.value)),
	changeMobileMenu: (event) => dispatch(changeMobileMenu()),
	onSubmitSearch: (event) => {
		event.preventDefault();
		dispatch(searchDocuments());
	}
});

class Header extends Component {
	render() {

		const header = !this.props.toggleMobile
			? styles.header
			: styles.header + " " + styles.headerMobile;

		const first_community_slug = this.props.user
			? this.props.user.get('community_list')[0]
				? this.props.user.get('community_list')[0].slug
					: undefined
			: undefined

		return (
			<Row>
				<Col md={12} className="np">
					<HeaderWrap>
						<LogoItem>
							{this.props.community
								? (!this.props.toggleMobile
									? (
										<Link to={this.props.hostEnable ? '/' : `/${this.props.community.get('slug')}`}>
											<img src="/assets/img/general/logo.png" alt=""/>
										</Link>
									)
									: (
										<Link to={this.props.hostEnable ? '/' : `/${this.props.community.get('slug')}`}>
											РМ
										</Link>
									))
								: (!this.props.toggleMobile
									? (
										<Link to={`/${first_community_slug}`}>
											<img src="/assets/img/general/logo.png" alt=""/>
										</Link>
									)
									: (
										<Link to={`/${first_community_slug}`}>
											РМ
										</Link>
									))}

						</LogoItem>
						<Toggle onClick={(event) => this.props.changeMobileMenu()}>
							<i className="fa fa-bars" aria-hidden="true"></i>
						</Toggle>
						<SearchWrap visible={this.props.toggleMobile}>
							<form onSubmit={(event) => this.props.onSubmitSearch(event)}>
								<i className="fa fa-search"></i>

								<HeadInput value={this.props.query} onChange={this.props.searchDocuments} placeholder="Пошук матеріалу по назві або змісту"/> {this.props.isFetching && <div className="small-spinner">
									<i className="fa fa-spinner"></i>
								</div>
							}
							</form>
						</SearchWrap>
						<HeaderRight>
							<Link to="/">Перейти на портал Розумне Місто</Link>
							<Link to="/sign-in" onClick={this.props.onSignOutClick}>Вийти</Link>
						</HeaderRight>
					</HeaderWrap>
				</Col>
			</Row>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
