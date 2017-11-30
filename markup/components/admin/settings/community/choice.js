import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import history from '../../../history';
import {List, Button} from '../../../form-components';
import Input from 'components/form-components/input';
import Spinner from '../../../spinner';
import Pagination from '../../../system/pagination';
import {ButtonGreen, ButtonTransparent} from 'components/common-components/buttons';
import Box from 'components/box';
import Title from 'components/dynamic-title';

import {loadAdminCommunities} from '../../redux/actions/settings/community';
import { changeDocumentTypeFilter } from '../../redux/actions';

import form from 'components/common-components/form.scss';
import styles from '../styles.scss';

const mapStateToProps = (state) => ({
	communities: state.settings.community.get('adminCommunities'),
	isFetching: state.settings.community.get('communitiesIsLoading'),
	typeFilter: state.adminDocuments.get('typeFilter'),
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: (offset, search) => dispatch(loadAdminCommunities(25, offset, search)),
	onAddClick: (event) => {
		event.preventDefault();
		history.push("/admin/settings/communities/community/0");
	},
	onListClick: (item) => {
		history.push(`/admin/settings/communities/community/${item.get('id')}`);
	},
	changeTypeFilter: (event) => dispatch(changeDocumentTypeFilter(event.target.value)),
});

class CommunityChoice extends Component {
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

		if (this.props.isFetching) {
			return <div><Spinner /></div>
		}

		if (this.props.communities == undefined) {
			return <div></div>
		}

		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		return (
			<Box>
				<Title title={`Службовий кабінет. Управління громадами. Інформаційна система "Розумне місто" `} />
				<div className="box-head">
					<div className="departmens-head">
						<h3>Управління громадами</h3>
						<ButtonGreen iconClass="fa fa-plus-circle" value="Створити громаду" onClick={this.props.onAddClick}/>
					</div>
					<div className="box-head">
						<div className={styles.documentsHeader}>
							<form className={styles.typeFilter + " " + "ui form"} onSubmit={(event) => {
								event.preventDefault();
								this.props.onLoad(offset, this.props.typeFilter);
							}}>
								<div className={styles.inputWrap}>
									<Input placeholder={"Введіть назву громади"}
										value={this.props.typeFilter} onChange={this.props.changeTypeFilter}/>
								</div>
								<ButtonTransparent size="12px" iconClass="fa fa-search" type="submit" value={"Шукати"}/>
							</form>
						</div>
					</div>
				<div className="document-table">
					<Row className="communities-row">
						<Col md={12}>
							<table className="ui table table-striped">
								<thead>
									<tr>
										<th>ID</th>
										<th>Назва</th>
										<th>Код КОАТУУ</th>
									</tr>
								</thead>
								<tbody>
									{this.props.communities.results.map(item => (
										<tr key={item.id}>
											<td><span className="hide-desktop">ID: </span>{item.id}</td>
											<td>
												<Link to={`/admin/settings/communities/community/${item.id}`}>
													<span className="hide-desktop">Назва: </span>{item.name}
												</Link>
											</td>
											<td><span className="hide-desktop">Код КОАТУУ: </span>{item.city}</td>
										</tr>
									))}
								</tbody>
							</table>
							<Pagination counts={this.props.communities.count} path="/admin/settings/communities/" matched={this.props.match.params.page} limits={25} />
						</Col>
					</Row>
				</div>
				</div>
			</Box>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityChoice);
