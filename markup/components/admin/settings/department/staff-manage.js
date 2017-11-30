import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import Title from 'components/dynamic-title';
import Box from 'components/box';
import form from '../../../common-components/form.scss';
import Input from 'components/form-components/input';
import Select from 'components/form-components/select';
import Button from 'components/form-components/button';
import SelectPicker from 'components/components/selectpicker';

import { settingCleanStore, settingChangeItemValue, loadStaffItem, submitStaffItem
} from '../../redux/actions/settings/setting';
import { fetchUsers } from 'components/admin/redux/actions/settings/users';


const mapStateToProps = state => ({
	item: state.settings.setting.get('item'),
	userList: state.settings.users.get('users'),
});

const mapDispatchToProps = dispatch => ({
	onMount: (staffId) => {
		dispatch(settingCleanStore());
		dispatch(fetchUsers());
		if (staffId > 0) {
			dispatch(loadStaffItem(staffId));
		}
	},

	onSearchChange: (event) => dispatch(fetchUsers(25, 0, event.target.value)),
	onValueChange: (value, key) => dispatch(settingChangeItemValue(value, key)),
 	onSubmit: (event, staffId, departmentId) => {
		event.preventDefault();
		dispatch(submitStaffItem(staffId, departmentId));
	}
});

class DepartmentStaffManage extends Component {
	componentWillMount() {
		const staffId = this.props.match.params.staffId;
		this.props.onMount(staffId);
	}

	render() {
		let items = undefined;
		if (this.props.userList.results) {
		 	items = fromJS(
				this.props.userList.results.map(item => ({
					id: item.id,
					value: `${item.last_name} ${item.first_name}`
				}))
			);
		}

		return (
			<Box>
				<Title title={`Службовий кабінет. Редагування даних персоналу. Інформаційна система "Розумне місто" `} />
				<h4>Редагувати дані персоналу: </h4>
					<form onSubmit={(event) =>
							this.props.onSubmit(event, this.props.match.params.staffId, this.props.match.params.id)}>
						<div className={form.field}>
							<Input label="Посада" value={this.props.item.get('name_staff')}
								onChange={(event) => this.props.onValueChange(event.target.value, 'name_staff')}/>
						</div>
						<div className={form.field}>
							<SelectPicker items={items} value={this.props.item.get('attached_user')}
								title={this.props.item.get('attached_user_name')}
								onSearchChange={this.props.onSearchChange}
								onChange={(event, item) => this.props.onValueChange(item.get('id'), 'attached_user')}
								/>
						</div>
						<Button type="submit" value="Зберегти" />
					</form>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentStaffManage);
