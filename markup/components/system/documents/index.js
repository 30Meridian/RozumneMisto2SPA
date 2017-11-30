import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List} from 'immutable';
import ListItem from './list-item';
import Pagination from '../pagination';
import Box from 'components/box';
import history from '../../history';
import {searchDocuments} from '../redux/actions';

const mapStateToProps = state => ({items: state.system.get('searchedDocuments'), community: state.system.get('community'), hostEnable: state.system.get('standaloneHostEnable')});

const mapDispatchToProps = dispatch => ({
	fecthSearchDocuments: (slug, offset, page) => dispatch(searchDocuments(slug, 10, offset, page))
});

class SearchedDocuments extends Component {

	componentWillReceiveProps(nextProps) {
		const page = nextProps.match.params.page;
		const offset = 10 * (page - 1);

		if (this.props.match.params.page !== undefined) {
			const page = this.props.match.params.page;
		}

		if (nextProps.match.params.page !== this.props.match.params.page) {
			this.props.fecthSearchDocuments(this.props.community.get('slug'), offset, page);
		}

	}

	componentWillMount() {
		const page = this.props.match.params.page || 1;
		const offset = 10 * (page - 1);
		this.props.fecthSearchDocuments(this.props.community.get('slug'), offset);
	}

	render() {

		if (this.props.items == undefined) {
			return <div></div>;
		}
		return (
			<div>
				<Box>
					{this.props.items.message
						? (
							<h4>
								Не знайдено жодного документу, що задовольняє критерії пошуку. Спробуйте змінити формулювання.
							</h4>
						)
						: (
							<div>
								<h4>Результати пошуку:</h4>
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
											history.push(`${this.props.hostEnable
												? ''
												: '/' + this.props.community.get('slug')}/${value.module_list[0]}/document/${value.id}`)
										}}>
											<td style={{
												width: '65px'
											}}>
												<p>{value.id}</p>
											</td>
											<td style={{
												width: '420px'
											}}>
												<p className="search-title">{value.title}</p>
											</td>
											<td>
												<p>{value.workflow_type_name}</p>
											</td>
											<td>
												<p>{value.state_field_name}</p>
											</td>
											<td>
												<p>{new Date(value.date_created).toLocaleString('uk-UA')}</p>
											</td>
										</tr>)}

									</tbody>
								</table>
								<Pagination counts={this.props.items.count} path={`${this.props.hostEnable
									? ''
									: '/' + this.props.community.get('slug')}/search-documents/`} matched={this.props.match.params.page} limits={10}/>
							</div>
						)}
				</Box>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedDocuments);
