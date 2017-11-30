import React, {Component} from 'react'
import {connect} from 'react-redux'

import Box from 'components/box';
import Spinner from '../../spinner';
import {Button, Input} from '../../form-components';
import {Row, Col} from 'react-bootstrap';
import InputB from '../../bootstrap-components/input'

import {
	addBindedCommunity,
	removeBindedCommunity,
	saveBindedCommunity,
	changeCitySearchValueSubmit,
	clearCitySearchValueSubmit,
	submitCitySearchSubmit,
	signChangeLastName,
	signChangeFirstName,
	signChangePhone,
	signChangeMiddleName,
	loadSignDefaults,
	submitSignUpRequiredField
} from '../redux/actions'

import styles from './styles.scss'

const mapStateToProps = state => ({
	user: state.auth.get('user'),
	communities: state.system.get('communities'),
	communitiesIsLoading: state.system.get('communitiesIsLoading'),
	binded_community: state.system.get('binded_community'),
	searchedCities: state.system.get('searchedCities'),
	cityValueSubmit: state.system.get('cityValueSubmit'),
	first_name: state.system.get('signFirstName'),
	last_name: state.system.get('signLastName'),
	middle_name: state.system.get('signMiddleName'),
	phone: state.system.get('signPhone'),
	hostEnable: state.system.get('standaloneHostEnable'),
	community: state.system.get('community'),
})

const mapDispatchToProps = dispatch => ({
	onMount: (user) => dispatch(loadSignDefaults(user)),
	onLastNameChange: (event) => dispatch(signChangeLastName(event.target.value)),
	onFirstNameChange: (event) => dispatch(signChangeFirstName(event.target.value)),
	onMiddleNameChange: (event) => dispatch(signChangeMiddleName(event.target.value)),
	onPhoneChange: (event) => dispatch(signChangePhone(event.target.value)),
	changeCityValue: (event) => {
		dispatch(changeCitySearchValueSubmit(event.target.value))
		dispatch(submitCitySearchSubmit())
	},
	onItemsChanged: (obj) => {
		dispatch(addBindedCommunity(obj))
		dispatch(clearCitySearchValueSubmit())
	},
	onDeleteClick: (id) => dispatch(removeBindedCommunity(id)),
	onSubmitClick: () => dispatch(saveBindedCommunity()),
	onSubmitSignUpClick: (event) => {
		event.preventDefault();
		dispatch(submitSignUpRequiredField());
	}
})

class SignUp extends Component {
	checkUser(props) {
		if (props.user && props.user.get('community_list').length > 0 && props.user.get('is_bank_id_auth')) {
			props.history.push('/');
		}
		if (this.props.user && this.props.user.get('community_list').length === 0 && this.props.hostEnable) {
			this.props.onItemsChanged({id: this.props.community.get('id')});
			this.props.onSubmitClick();
		}
	}

	componentWillMount() {
		this.checkUser(this.props);
		if (this.props.user) {
			this.props.onMount(this.props.user);
		}
	}

	componentWillReceiveProps(nextState) {
		this.checkUser(nextState);
	}

	render() {
		if (this.props.communitiesIsLoading || !this.props.user)
			return (
				<div><Spinner/></div>
			);

		const items = this.props.communities.map(item => ({id: item.get('id'), value: item.get('name')})).toJS();

		return (
			<Row>
				<div className={styles.contentWrapper}>
					<div className="container-fluid np">
						<Box>
							<div className="row login">
								<div className={styles.loginHeader}>
									<h2>Завершіть реєстрацію на порталі</h2>
								</div>

								{this.props.user && !this.props.user.get('is_bank_id_auth')
									? <Col md={12}>
											<Col md={6} mdOffset={3}>
												<Box>
													<h3>Заповніть необхідні поля</h3>
													<form onSubmit={this.props.onSubmitSignUpClick}>
														<Input label="E-mail" className="form-group" inputClassName="form-control" disabled={true} value={this.props.user.get('email')} onChange={(event) => {}}/>
														<Input label="Прізвище" className="form-group" inputClassName="form-control" required={true} value={this.props.last_name} onChange={this.props.onLastNameChange}/>
														<Input label="Ім'я" className="form-group" inputClassName="form-control" required={true} value={this.props.first_name} onChange={this.props.onFirstNameChange}/>
														<Input label="По-батькові" className="form-group" inputClassName="form-control" required={true} value={this.props.middle_name} onChange={this.props.onMiddleNameChange}/>
														<Input label="Телефон" className="form-group" inputClassName="form-control" required={true} value={this.props.phone} onChange={this.props.onPhoneChange}/>
														<Button type="submit" className="btn btn-success btn-block" value="Зберегти"/>
													</form>
												</Box>
											</Col>
										</Col>
									: null}

								{this.props.user && this.props.user.get('community_list').length === 0
									? <Col md={12}>
											<Col md={6} mdOffset={3}>

												<Box>
													<h3>Оберіть свою громаду</h3>
													<div className="search-input">
														<form>
															<Input tabIndex="0" className="form-group form-search" value={this.props.cityValueSubmit} onChange={this.props.changeCityValue} inputClassName="form-control form-control-search" placeholder="Знайди своє місто"/> {this.props.searchedCities.length > 0 && this.props.cityValueSubmit.length > 0 && (
																<div className={styles.searchDropdown}>
																	<ul tabIndex="1">
																		{this.props.searchedCities.map((value, i) => <li onClick={() => this.props.onItemsChanged({id: value.id, value: value.name})}>
																			<span>{value.name}</span> ({value.region})</li>)}
																	</ul>
																</div>
															)}
														</form>
													</div>
													{this.props.binded_community.size > 0
														? (
															<div className="form-group names-list">
																<label>
																	<h4>Обрані громади
																		<small>
																			(ви можете обрати до
																			<strong>3</strong>
																			громад)
																		</small>:</h4>
																</label>
																<table className="table">
																	<thead>
																		<tr>
																			<th>Назва</th>
																			<th className="text-right">Видалити</th>
																		</tr>
																	</thead>
																	<tbody>
																		{this.props.binded_community.map((item, index) => (
																			<tr key={item['id']}>
																				<td>{item['value']}</td>
																				<td className="td-actions text-right">
																					<a className="btn btn-danger btn-simple btn-xs" onClick={() => this.props.onDeleteClick(index)}>
																						<i className="fa fa-times"></i>
																					</a>
																				</td>
																			</tr>
																		))}
																	</tbody>
																</table>
															</div>
														)
														: null}
													<div className="form-group cities-list">
														<Col md={10} mdOffset={1}>
															{this.props.binded_community.size > 0
																? (<Button className="btn btn-success btn-block" value="Приєднатися" onClick={this.props.onSubmitClick}/>)
																: (null)}
														</Col>
													</div>
												</Box>
											</Col>
										</Col>
									: null}

							</div>
						</Box>
					</div>
				</div>
			</Row>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
