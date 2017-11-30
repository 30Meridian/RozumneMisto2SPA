import React, {Component} from 'react';
import {List} from 'immutable';

import ListItem from './list-item';
import Pagination from '../../../system/pagination';

import Spinner from '../../../spinner';

class DocumentTable extends Component {
	render() {
		return (

			<div className="document-table">

			{this.props.items.results.length > 0 ? (
				<div>
				<table className="ui table documents-table">
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
						{this.props.items.results.map((value) => <ListItem key={value.id} item={value}/>)}
					</tbody>
				</table>

				<Pagination counts={this.props.items.count} path={this.props.url} matched={this.props.param} limits={this.props.limit}/>
			</div>
				): (
						<div>Документи відсутні</div>
					)}
			</div>

		);
	}
}

DocumentTable.propTypes = {
	items: React.PropTypes.instanceOf(List).isRequired
};

export default DocumentTable;
