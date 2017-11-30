import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';

import {ButtonGreen} from 'components/common-components/buttons';
import Title from 'components/dynamic-title';
import {setEmail, resetPassword, checkToken} from '../../common/redux/actions/auth';
import history from '../../history';
import {Input} from '../../form-components';
import Button from '../../form-components/button';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
  email: state.auth.get('email'),
  error: state.auth.get('emailError'),
  emailModal: state.auth.get('emailModal'),
  emailNoError: state.auth.get('emailNoError')
});

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (event) => {
    dispatch(resetPassword());
    event.preventDefault();
  },
	onEmailChange: (event) => dispatch(setEmail(event.target.value))
});

class ResetPassword extends Component {

	render() {

    if (this.props.emailNoError) {
      setTimeout(() => history.push('/sign-in'), 7000);
    }

		return (
			<div className='row'>
        <Title title={`Відновлення паролю. Інформаційна система "Розумне місто" `} />
				<div className={styles.contentWrapper}>
					<div className="container-fluid np">
						<Box>
							<Row>
								<Col md={12}>
									<form className="ui form step1-form" onSubmit={(event) => {
										this.props.onSubmit(event);
									}}>
										<Input label="Введіть адресу своєї електронної пошти" value={this.props.email} onChange={this.props.onEmailChange}/>
                    {this.props.error &&
                    <div className={styles.emailError}>
                      Невірна пошта. Спробуйте ще.
                    </div>
                  }
                    <div className={styles.sendBtn}>
											<ButtonGreen iconClass="fa fa-power-off" type="submit" value="Відправити"/>
										</div>
									</form>
								</Col>
							</Row>
						</Box>
					</div>
				</div>
				<ReactModal isOpen={this.props.emailNoError} className={{
					base: 'cardModal',
					afterOpen: 'myClass_after-open',
					beforeClose: 'myClass_before-close'
				}} contentLabel="Підтвердження запису" overlayClassName={{
					base: 'doctorOverlay',
					afterOpen: 'myOverlayClass_after-open',
					beforeClose: 'myOverlayClass_before-close'
				}}>
					<Row>
						<Col md={12}>
							<div>
								<h4>Для того, щоб завершити зміну пароля, зайдіть на пошту та відкрийте лист, який вам надійшов</h4>
							</div>
						</Col>
					</Row>
				</ReactModal>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
