import React, { Component } from 'react';
import { connect } from 'react-redux';

import Title from 'components/dynamic-title';
import history from '../../../history';
import Input from '../../../form-components/input';
import Checkbox from '../../../form-components/checkbox';
import Button from '../../../form-components/button';
import {ButtonGreen, ButtonDanger} from 'components/common-components/buttons';
import { fetchUser, changeFirstName, changeLastName, changeMiddleName, changeEmail, changePhone,
changeActive, changeStaff, changeSuperuser, submitUserChanges, patchUserChanges,
} from '../../redux/actions/settings/users';
import Box from 'components/box';
import form from '../../../common-components/form.scss';

const mapStateToProps = state => ({
	last_name: state.settings.users.get('user').get('last_name'),
	first_name: state.settings.users.get('user').get('first_name'),
	middle_name: state.settings.users.get('user').get('middle_name'),
	email: state.settings.users.get('user').get('email'),
	phone: state.settings.users.get('user').get('phone'),
	is_staff: state.settings.users.get('user').get('is_staff'),
	is_active: state.settings.users.get('user').get('is_active'),
	is_superuser: state.settings.users.get('user').get('is_superuser'),
});

const mapDispatchToProps = dispatch => ({
	onLoad: (user_id) => dispatch(fetchUser(user_id)),
	onFirstNameChange: (event) => dispatch(changeFirstName(event.target.value)),
	onLastNameChange: (event) => dispatch(changeLastName(event.target.value)),
	onMiddleNameChange: (event) => dispatch(changeMiddleName(event.target.value)),
	onEmailChange: (event) => dispatch(changeEmail(event.target.value)),
	onPhoneChange: (event) => dispatch(changePhone(event.target.value)),
	onActiveChange: (event) => dispatch(changeActive(event.target.checked)),
	onStaffChange: (event) => dispatch(changeStaff(event.target.checked)),
	onSuperuserChange: (event) => dispatch(changeSuperuser(event.target.checked)),
	onSubmit: (event, user_id) => {
		dispatch(submitUserChanges(user_id));
		history.push("/admin/settings/users");
	},
	onBlockClick: (event, userId, data) => dispatch(patchUserChanges(userId, data)),
});

class UserManage extends Component {
	componentWillMount() {
		const user_id = this.props.match.params.id;
		this.props.onLoad(user_id);
	}

	render() {
		return (
			<Box>
				<Title title={`Службовий кабінет. Редагування даних користувача "${this.props.last_name} ${this.props.first_name}". Інформаційна система "Розумне місто" `} />
				<div className="box-head">
					<div className="departmens-head">
					<h4>Редагувати дані користувача: </h4>
					{this.props.is_active ?
						<ButtonDanger type={"button"} value={"Заблокувати"}
							onClick={(event) => this.props.onBlockClick(event, this.props.match.params.id, {'is_active': false})} />
						:
						<ButtonGreen type={"button"} value={"Розблокувати"}
							onClick={(event) => this.props.onBlockClick(event, this.props.match.params.id, {'is_active': true})} />
					}
				</div>
				</div>

				<form className="ui form">
					<div className="form-group">
						<Input label="Прізвище" value={this.props.last_name} onChange={this.props.onLastNameChange}/>
					</div>
					<div className="form-group">
						<Input label="Ім'я" value={this.props.first_name} onChange={this.props.onFirstNameChange}/>
					</div>
					<div className="form-group">
						<Input label="По-батькові" value={this.props.middle_name} onChange={this.props.onMiddleNameChange}/>
					</div>
					<div className="form-group">
						<Input label="E-mail" value={this.props.email} onChange={this.props.onEmailChange}/>
					</div>
					<div className="form-group">
						<Input label="Телефон" value={this.props.phone} onChange={this.props.onPhoneChange}/>
					</div>
					<div className="form-group">
						<Checkbox type="checkbox" label="Активний" checked={this.props.is_active} onChange={this.props.onActiveChange}/>
					</div>
					<div className="form-group">
						<Checkbox type="checkbox" label="Персонал" checked={this.props.is_staff} onChange={this.props.onStaffChange}/>
					</div>
					<div className="form-group">
						<Checkbox type="checkbox" label="Адміністратор" checked={this.props.is_superuser} onChange={this.props.onSuperuserChange}/>
					</div>
					<Button onClick={(event) => this.props.onSubmit(event, this.props.match.params.id)} value="Зберегти"/>
				</form>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
