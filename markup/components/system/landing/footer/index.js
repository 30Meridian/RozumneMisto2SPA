import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

 
import weather from '../../../../assets/js/libraries/weather';
import {loadUser} from '../../../common/redux/actions/auth';

const mapStateToProps = (state) => ({token: state.auth.get('token'), user: state.auth.get('user')});

const mapDispatchToProps = (dispatch) => ({
	loadUser: () => dispatch(loadUser())
});

class Footer extends Component {
	render() {
		const item = this.props.user
		return (

			<footer className="section-footer bg-inverse">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-lg-4 col-sm-12">
							<div className="media">
								<div className="media-left">
									<img src="/assets/img/general/logo.png" width="230px"/>
								</div>

							</div>
						</div>
						<div className="col-md-8 col-lg-8 col-sm-12">
							<ul className="nav nav-inline">
								<li className="nav-item">
									<Link className="nav-link" to="/rules">Правила</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/help">Допомога</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/offer">Публічна оферта</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/connect">Підключитись</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/contacts">Контакти</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
