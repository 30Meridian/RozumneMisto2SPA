import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fromJS } from 'immutable';

import {DefaultLink} from 'components/common-components/buttons';
import Title from 'components/dynamic-title';
import Box from 'components/box';
import form from '../../../common-components/form.scss';
import Input from '../../../form-components/input';
import Button from '../../../form-components/button';
import Pagination from '../../../system/pagination';
import Spinner from 'components/spinner';
import SelectPicker from 'components/components/selectpicker';

import { loadDepartmentItem, settingChangeItemValue, submitDepartmentItem, settingCleanStore, loadDepartmentStaffList
} from '../../redux/actions/settings/setting';
import { loadAdminCommunities } from '../../redux/actions/settings/community';


const mapStateToProps = state => ({
	item: state.settings.setting.get('item'),
	items: state.settings.setting.get('items'),
	communities: state.settings.community.get('adminCommunities'),
	communitiesIsLoading: state.settings.community.get('communitiesIsLoading'),
});

const mapDispatchToProps = dispatch => ({
	onMount: (departmentId, offset) => {
		dispatch(settingCleanStore());
		dispatch(loadDepartmentItem(departmentId));
		dispatch(loadDepartmentStaffList(departmentId, offset, 25))
	},
	loadAdminCommunities: (search='') => dispatch(loadAdminCommunities(25, 0, search)),
	onValueChange: (value, key) => dispatch(settingChangeItemValue(value, key)),
 	onSubmit: (event, departmentId) => {
		event.preventDefault();
		dispatch(submitDepartmentItem(departmentId));
	}
});

class DepartmentManage extends Component {
	componentWillMount() {
		this.props.loadAdminCommunities();
		if (this.props.match.params.id > 0) {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		const departmentId = this.props.match.params.id;
		this.props.onMount(departmentId, offset);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.page !== nextProps.match.params.page) {
			const page = nextProps.match.params.page || 1;
			const offset = 25 * (page - 1);
			const departmentId = this.props.match.params.id;
			this.props.onMount(departmentId, offset);
		}
	}

	render() {
		if(this.props.isLoading) {
			return <Box><Spinner /></Box>;
		}

		return (
			<div>
			<Title title={`Службовий кабінет. Редагування департаменту "${this.props.item.get('name_department')}". Інформаційна система "Розумне місто" `} />
			<Box title4="Редагувати дані департаменту:">
				<form className="ui form" onSubmit={(event) => this.props.onSubmit(event, this.props.match.params.id)}>
					<div className="form-group">
						<Input label="Код" value={this.props.item.get('code_department')}
							onChange={(event) => this.props.onValueChange(event.target.value, 'code_department')}/>
					</div>
					<div className="form-group">
						<Input label="Назва департаменту" value={this.props.item.get('name_department')}
							onChange={(event) => this.props.onValueChange(event.target.value, 'name_department')}/>
					</div>
					<div>
					{this.props.communitiesIsLoading ? <Spinner /> : <div className={form.field}>
						<label>Громада</label>
						<SelectPicker items={fromJS(this.props.communities.results)} value={this.props.item.get('community')}
							title={this.props.item.get('community_name')} itemValue={"name"}
							onSearchChange={(event) => this.props.loadAdminCommunities(event.target.value)}
							onChange={(event, item) => this.props.onValueChange(item.get('id'), 'community')}
					   />
				 	</div>}
					</div>
					<Button type="submit" value="Зберегти" />
				</form>
			</Box>

			{this.props.match.params.id > 0 && this.props.items && this.props.items.results ?
				<Box>
					<div className="box-head">
						<div className="departmens-head">
							<h4>Персонал:</h4>
							<DefaultLink
								to={`/admin/settings/department/department/${this.props.match.params.id}/staff/0`}>
								<i className="fa fa-plus-circle"></i> Додати працівника
							</DefaultLink>
						</div>
					</div>
					<table className="table table-striped table-hover table-condensed">
						<thead>
							<tr>
								<th>ID</th>
								<th>Назва</th>
								<th>Відповідальна особа</th>
							</tr>
						</thead>
						<tbody>
							{this.props.items.results.map((item, index) => (
								<tr>
									<td>{item['id']}</td>
									<td><Link to={`/admin/settings/department/department/${this.props.match.params.id}/staff/${item.id}`}>
										{item['name_staff']}</Link></td>
									<td>{item['attached_user_name']}</td>
								</tr>

							))}
						</tbody>
					</table>
					<Pagination counts={this.props.items.count}
						path={`/admin/settings/department/department/${this.props.match.params.id}/`}
						matched={this.props.match.params.staffPage} limits={25} />
				</Box>
				: null}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentManage);
