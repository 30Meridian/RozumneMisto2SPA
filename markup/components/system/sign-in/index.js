import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Row, Col} from 'react-bootstrap';
import {ButtonGreen} from 'components/common-components/buttons';
import Title from 'components/dynamic-title';
import {cleanSignInForm, changeSignInLogin, changeSignInPassword, changeSignInRemember, signIn} from '../../common/redux/actions/auth';
import {Input} from '../../form-components';
import Checkbox from '../../form-components/checkbox';
import Button from '../../form-components/button';
import Box from 'components/box';
import Spinner from '../../spinner';
import config from '../../config';
import history from '../../history';

import styles from './styles.scss';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
	token: state.auth.get('token'),
	login: state.auth.get('login'),
	password: state.auth.get('password'),
	remember: state.auth.get('remember'),
	isLoading: state.auth.get('authIsLoading'),
	hasErrored: state.auth.get('authHasErrored'),
	hostEnable: state.system.get('standaloneHostEnable'),
});

const mapDispatchToProps = (dispatch) => ({
	onMount: () => dispatch(cleanSignInForm()),
	onLoginChange: (event) => dispatch(changeSignInLogin(event.target.value)),
	onPasswordChange: (event) => dispatch(changeSignInPassword(event.target.value)),
	onRememberChange: (event) => dispatch(changeSignInRemember(event.target.checked)),
	onSubmit: (event) => {
		event.preventDefault();
		dispatch(signIn());
	}
});

class SignIn extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
		}
	}

	componentWillMount() {
		if (this.props.token) {
			history.push('/');
		}
		this.props.onMount();
	}

	render() {
		const origin = window.location.origin;

		const textClass = this.state.clicked ? styles.text + " " + styles.visible : styles.text;

		return (
			<div className='row'>
				<Title title={`Вхід до системи. Інформаційна система "Розумне місто" `} />
				<div className={styles.contentWrapper}>
					<div className="container-fluid np">
						<Box>
							<Row className={styles.login}>
								<div className={styles.loginHeader}>
									<p>
										<i className="fa fa-user"></i>
									</p>
									<h1>Вхід на портал "Розумне місто"</h1>
								</div>
								<Col md={12}>
									<div className={styles.how} onClick={() => this.setState({clicked: !this.state.clicked})}>Як зареєструватись на порталі?</div>
									<div className={textClass}>
										<p>Шановні відвідувачі!</p>
										<p className={styles.textSpecial}>Реєстрація на порталі можлива за одним з наступних варіантів:</p>
										<ul>
											<li>- обліковий запис Google;</li>
											<li>- обліковий запис Facebook;</li>
											<li>- BankID (Приватбанк).</li>
										</ul>
										<p>Вхід на портал за адресою електронної пошти та паролем - лише для раніше зареєстрованих користувачів. Реєстрація через адресу електронної пошти для нових користувачів неможлива.</p>
									</div>
								</Col>
								<Col md={6}>
									<Box>
										{this.props.isLoading
											? (<Spinner/>)
											: (
												<form onSubmit={this.props.onSubmit}>
													<Input label="Введіть адресу своєї електронної пошти" value={this.props.login} onChange={this.props.onLoginChange}/>
													<br/>
													<Input label="Введіть свій пароль" type="password" value={this.props.password} onChange={this.props.onPasswordChange}/>
													<br/>
													<Checkbox label="Запам'ятати мене" type="checkbox" checked={this.props.remember} onChange={this.props.onRememberChange}/>
													<div className={styles.reset}>
														<Link to="/reset-password">Забули пароль?</Link>
													</div>
													{this.props.hasErrored
														? (
															<div className="alert alert-danger">
																<span>Неправильний логін або пароль</span>
															</div>
														)
														: null}
													<ButtonGreen size="16px" iconClass="fa fa-power-off" type="submit" value="Увійти"/>
												</form>
											)}
									</Box>
								</Col>

								<Col md={6}>
									<Box>

										<p className={styles.loginDescription}>Для входу або реєстрації за допомогою BankID натисніть на кнопку:
										</p>
										<a href={`${config.host}/auth/bank_id/log_in?origin=${origin}`} className="btn btn-default btn-block btn-green">
											<i className="fa fa-university" aria-hidden="true"></i>
											BankID
										</a>

										{!this.props.hostEnable ? <div>
										<p className={styles.loginDescription}>Для входу або реєстрації за допомогою соціальної мережі, натисніть на кнопку однієї з них:
										</p>
										<a href={`${config.host}/accounts/google/login/?method=oauth2`} className="btn btn-default btn-block btn-red">
											<i className="fa fa-google" aria-hidden="true"></i>
											Google
										</a>
										<a href={`${config.host}/accounts/facebook/login/`} className="btn btn-default btn-block btn-blue">
											<i className="fa fa-facebook" aria-hidden="true"></i>
											Facebook
										</a>
										{/* <p className={styles.danger}>
											Увага!
											Підтвердження облікового запису Facebook користувача порталу здійснюється виключно через електронну пошту, зазначену ним на Facebook.
										</p> */}
									</div> : null}

										<hr/>
										<small>Авторизуючий через BankID або OAuth ви надаєте згоду на обробку ваших персональних даних.</small>
									</Box>
								</Col>

							</Row>
						</Box>
					</div>
				</div>
			</div>
		)
	}
};

SignIn.propTypes = {
	login: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	onLoginChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
