import React, {Component} from 'react';
import {List} from 'immutable';

import ListItem from './list-item';

class DocumentTable extends Component {
	render() {
		return (
			<div className="document-table">
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
						{this.props.items.map((value) => <ListItem key={value.get('id')} item={value} slug={this.props.slug}/>)}
					</tbody>
				</table>
			</div>
		);
	}
}

DocumentTable.propTypes = {
	items: React.PropTypes.instanceOf(List).isRequired
};

export default DocumentTable;
