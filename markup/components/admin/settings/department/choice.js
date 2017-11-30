import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import {ButtonTransparent, GreenLink} from 'components/common-components/buttons';
import history from '../../../history';
import Spinner from '../../../spinner';
import Pagination from '../../../system/pagination';
import { Button } from '../../../form-components';
import Box from 'components/box';
import DepartmentList from './department-list';
import Title from 'components/dynamic-title';
import Input from 'components/form-components/input';

import { loadDepartmentList } from '../../redux/actions/settings/setting';
import { changeDocumentTypeFilter } from '../../redux/actions';

import form from '../../../common-components/form.scss';
import styles from '../styles.scss';


const mapStateToProps = state => ({
	items: state.settings.setting.get('items'),
	isLoading: state.settings.setting.get('isLoading'),
	typeFilter: state.adminDocuments.get('typeFilter'),
});

const mapDispatchToProps = dispatch => ({
	onMount: (offset, search) => dispatch(loadDepartmentList(offset, 25, search)),
	changeTypeFilter: (event) => dispatch(changeDocumentTypeFilter(event.target.value)),
});

class DepartmentChoice extends Component {
	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.onMount(offset);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.page !== nextProps.match.params.page) {
			const page = nextProps.match.params.page || 1;
			const offset = 25 * (page - 1);
			this.props.onMount(offset, this.props.typeFilter);
		}
	}

	render() {
		if(this.props.isLoading) {
			return <Box><Spinner /></Box>;
		}

		if (!this.props.items) {
			return null;
		}

		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		return (
			<Box>
				<Title title={`Службовий кабінет. Управління Департаментами. Інформаційна система "Розумне місто" `} />
				<div className="box-head">
					<div className="departmens-head">
						<h3>Управління Департаментами:</h3>
						<GreenLink
							to={"/admin/settings/department/department/0"}><i className="fa fa-plus-circle"></i> Створити департамент</GreenLink>
					</div>
				</div>
				<div className="box-head">
					<div className={styles.documentsHeader}>
						<form className={styles.typeFilter + " " + "ui form"} onSubmit={(event) => {
							event.preventDefault();
							this.props.onMount(offset, this.props.typeFilter);
						}}>
							<div className={styles.inputWrap}>
								<Input placeholder={"Введіть назву департаменту"}
									value={this.props.typeFilter} onChange={this.props.changeTypeFilter}/>
							</div>
							<ButtonTransparent iconClass="fa fa-search" type="submit" value={"Шукати"}/>
						</form>
					</div>
				</div>
				<div className="document-table">
					<DepartmentList items={this.props.items.results} />
					<Pagination counts={this.props.items.count} path="/admin/settings/department/"
						matched={this.props.match.params.page} limits={25} />
				</div>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentChoice);
