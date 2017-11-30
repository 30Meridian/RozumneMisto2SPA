import React from 'react';
import history from '../../../history';

class ListItem extends React.Component {
	render(props) {
		const item = this.props.item;
		return (
			<tr onClick={(event) => {history.push(`/admin/documents/document/${item.id}`)}}>
				<td style={{width: '50px'}}><span className="hide-desktop">ID: </span>{item.id}</td>
				<td><p><span className="hide-desktop">Назва документа: </span>{item.title}</p></td>
				<td><p><span className="hide-desktop">Тип: </span>{item.workflow_type_name}</p></td>
				<td><p><span className="hide-desktop">Статус документа: </span>{item.state_field_name}</p></td>
				<td><p><span className="hide-desktop">Дата створення: </span>{new Date(item.date_created).toLocaleDateString('uk-UA')}</p></td>
				{/*}<td>{item.get('description')}</td>*/}
			</tr>
		)
	};
}

export default ListItem;
