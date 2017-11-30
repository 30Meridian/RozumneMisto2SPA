import React, {Component} from 'react';
import {List} from 'immutable';

import ListItem from './list-item';

import Spinner from '../../../spinner';

class DocumentTableRequest extends Component {
	render() {
		return (

			<div className="document-table">
			{this.props.items.results.length > 0 ? (
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
						{this.props.documents.results.map((value) => <ListItem key={value.id} item={value}/>)}
					</tbody>

				</table>
				): (
						<Spinner/>
					)}
			</div>
		);
	}
}

DocumentTableRequest.propTypes = {
	items: React.PropTypes.instanceOf(List).isRequired
};

export default DocumentTableRequest;
