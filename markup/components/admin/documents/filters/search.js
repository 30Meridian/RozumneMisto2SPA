import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List} from 'immutable';

import history from '../../../history';
import {searchDocuments} from '../../redux/actions/documents';
import Pagination from '../../../system/pagination';
import Box from 'components/box';

const mapStateToProps = state => ({items: state.adminDocuments.get('searchedDocuments')});

const mapDispatchToProps = dispatch => ({
	fecthSearchDocuments: (offset, page) => dispatch(searchDocuments(25, offset, page))
});

class SearchedDocuments extends Component {

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 25 * (page - 1);

		if (this.props.match.params.page !== undefined) {
			const page = this.props.match.params.page;
		}

		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.fecthSearchDocuments(offset, page);
		}

	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 25 * (page - 1);
		this.props.fecthSearchDocuments(offset);
	}

	render() {

		if (this.props.items == undefined) {
			return <div></div>;
		}
		return (
			<Box>
				<div className="document-table">
					{this.props.items.message
						? (

							<h4>Не знайдено жодного документу, що задовольняє критерії пошуку. Спробуйте змінити формулювання.
							</h4>
						)
						: (

							<div>
								<h4>Результати пошуку:
								</h4>
								<table className="ui single line table documents-table">
									<thead>
										<tr>
											<th>ID</th>
											<th>Назва документа</th>
											<th>Тип</th>
											<th>Статус документа</th>
											<th>Дата створення</th>
										</tr>
									</thead>
									<tbody>

										{this.props.items.results.map((value) => <tr onClick={(event) => {
											history.push(`/admin/documents/document/${value.id}`)
										}}>
											<td style={{"width": "65px"}}><p>{value.id}</p></td>
											<td><p className="search-title">{value.title}</p></td>
											<td><p>{value.workflow_type_name}</p></td>
											<td><p>{value.state_field_name}</p></td>
											<td><p>{new Date(value.date_created).toLocaleString('uk-UA')}</p></td>
										</tr>)
										}
									</tbody>
								</table>
								<Pagination counts={this.props.items.count} path={`/admin/documents/search-documents/`} matched={this.props.match.params.page} limits={25}/>
							</div>
						)}
				</div>
			</Box>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedDocuments);
