import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import ReactModal from 'react-modal';

import {ButtonGreen} from 'components/common-components/buttons';
import { setNewPassword, confirmNewPassword, submitNewPassword } from '../../common/redux/actions/auth';
import history from '../../history';
import {Input} from '../../form-components';
import Button from '../../form-components/button';
import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';
import form from '../../common-components/form.scss';

const mapStateToProps = (state) => ({
  email: state.auth.get('email'),
  newPassword: state.auth.get('newPassword'),
  newPasswordConfirm: state.auth.get('newPasswordConfirm'),
  passwordError1: state.auth.get('passwordError1'),
  passwordError2: state.auth.get('passwordError2'),
  noErrors: state.auth.get('noErrors')
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (event, key) => {
    dispatch(submitNewPassword(key));
    event.preventDefault();
  },
  newPasswordChange: (event) => dispatch(setNewPassword(event.target.value)),
  confirmNewPassword: (event) => {
    dispatch(confirmNewPassword(event.target.value))
  }
});

class ResetPasswordKey extends Component {
	render() {
		return (
			<div className='row'>
				<div className={styles.contentWrapper}>
					<div className="container-fluid np">
            <Box>
              <Row>
                <Col md={12}>
                  <form className="ui form step1-form" onSubmit={(event) => {
                    this.props.onSubmit(event, this.props.match.params.key);
                  }}>
                    <Input label="Введіть новий пароль" type="password" value={this.props.newPassword}
			                onChange={this.props.newPasswordChange}/>
                    {this.props.passwordError1.length > 0 &&
                      <div className={styles.emailError}>
                        {this.props.passwordError1}
                      </div>
                    }
                    <Input label="Підтвердіть новий пароль" type="password" value={this.props.newPasswordConfirm}
    									onChange={this.props.confirmNewPassword}/>
                      {this.props.passwordError2.length > 0 &&
                        <div className={styles.emailError}>
                          {this.props.passwordError2}
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
        <ReactModal isOpen={this.props.noErrors} className={{
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
								<h4>Ваш пароль успішно змінено</h4>
							</div>
						</Col>
					</Row>
				</ReactModal>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordKey));
