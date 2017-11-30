import React from 'react';
import history from '../../../history';


class ListItem extends React.Component {
	render(props) {
		const item = this.props.item;
		const module = item.module_list.length > 0;
		let url;
		if (module) {
			url = `${this.props.slug}/cabinet/${item.module_list[0]}/document/${item.id}`;
		} else {
			url = `${this.props.slug}/cabinet/documents/document/${item.id}`;
		}

		return (
			<tr onClick={(event) => {history.push(url)}}>
				<td style={{width: "55px"}}><p>{item.id}</p></td>
				<td style={{color: 'green'},{width: "230px"}}><p>{item.title}</p></td>
				<td><p>{item.workflow_type_name}</p></td>
				<td style={{width: "120px"}}><p>{item.state_field_name}</p></td>
				<td style={{width: "111px"}}><p>{new Date(item.date_created).toLocaleDateString('uk-UA')}</p></td>
			</tr>
		)
	};
}

export default ListItem;
