import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'components/box';
import UserList from './user-list';
import Input from 'components/form-components/input';
import Button from 'components/form-components/button';
import Pagination from '../../../system/pagination';
import Spinner from '../../../spinner';
import Title from 'components/dynamic-title';
import {ButtonTransparent} from 'components/common-components/buttons';
import { fetchUsers } from '../../redux/actions/settings/users';
import { changeDocumentTypeFilter } from '../../redux/actions';

import styles from '../styles.scss';
import form from 'components/common-components/form.scss';


const mapStateToProps = (state) => ({
	users: state.settings.users.get('users'),
	isFetching: state.settings.users.get('usersIsLoading'),
	typeFilter: state.adminDocuments.get('typeFilter'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset, search) => dispatch(fetchUsers(25, offset, search)),
	changeTypeFilter: (event) => dispatch(changeDocumentTypeFilter(event.target.value))
});

class UsersChoice extends Component {
	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);
		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.onLoad(offset, this.props.typeFilter);
		}
	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.onLoad(offset);
	}

	render() {

		if(this.props.isFetching) {
			return <div><Spinner /></div>;
		}

		if(this.props.users.results == undefined) {
			return <div></div>;
		}

		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		return (
			<Box>
				<Title title={`Службовий кабінет. Управління користувачами. Інформаційна система "Розумне місто" `} />
				<div className="box-head">
					<h3>Управління користувачами</h3>
				</div>
				<div className="box-head">
					<div className={styles.documentsHeader}>
						<form className={styles.typeFilter + " " + "ui form"} onSubmit={(event) => {
							event.preventDefault();
							this.props.onLoad(offset, this.props.typeFilter);
						}}>
							<div className={styles.inputWrap}>
								<Input placeholder={"Введіть ім'я/прізвище/email користувача"}
									value={this.props.typeFilter} onChange={this.props.changeTypeFilter}/>
							</div>
							<ButtonTransparent size="12px" iconClass="fa fa-search" type="submit" value={"Шукати"}/>
						</form>
					</div>
				</div>
				<UserList items={this.props.users.results} />
				<Pagination counts={this.props.users.count} path="/admin/settings/users/" matched={this.props.match.params.page} limits={25} />
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersChoice);
