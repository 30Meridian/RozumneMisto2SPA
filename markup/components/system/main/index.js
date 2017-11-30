import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';

import BankIdSign from '../bank-id/sign';
import SignIn from '../sign-in';
import SignUp from '../sign-in/sign-up';
import ResetPassword from '../sign-in/reset-password';
import ResetPasswordKey from '../sign-in/reset-password-key';
import ContentWrapper from '../content-wrapper';
import Header from '../header';
import Footer from 'components/footer';
import TopMenu from '../top-menu';
import Profile from '../../profile';
import { loadUser } from '../../common/redux/actions/auth';
import {AppContainer, ShadowContainer} from './components';
import styles from './styles.scss';


const mapStateToProps = state => ({
	token: state.auth.get('token'),
	hostEnable: state.system.get('standaloneHostEnable'),
})

const mapDispatchToProps = dispatch => ({
	userLoad: () => dispatch(loadUser()),
})

class Main extends Component {
	componentWillMount() {
    if (this.props.token)
      this.props.userLoad()
  }

	render() {

		const budgetCheck = this.props.location.pathname.indexOf("apibudget");

		return (
			<div>
				<AppContainer visible={budgetCheck}>
					<TopMenu url={this.props.match.url} />
					<ShadowContainer>
						<Header/>
						<Switch>
			        <Route path="/sign-in/oauth/:code" component={BankIdSign} />
			        <Route exact path="/sign-in" component={SignIn} />
							<Route exact path="/sign-up" component={SignUp} />
							<Route exact path="/reset-password" component={ResetPassword} />
							<Route path="/reset-password/key/:key" component={ResetPasswordKey} />
							<Route path="/profile/:user_id" component={Profile} />
			        <Route strict path={this.props.hostEnable ? "*" : "/:community_slug"} component={ContentWrapper} />
			      </Switch>
						<Footer/>
					</ShadowContainer>
				</AppContainer>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
