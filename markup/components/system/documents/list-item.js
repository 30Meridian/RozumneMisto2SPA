import React from 'react';

class ListItem extends React.Component {
	render(props) {
		const item = this.props.item;
		return (
			<tr>
				<td>{item.id}</td>
				<td style={{color: 'green'}}>{item.title}</td>
				<td>{item.workflow_type_name}</td>
				<td>{item.state_field_name}</td>
				<td>{new Date(item.date_created).toLocaleString('uk-UA')}</td>
			</tr>
		)
	};
}

export default ListItem;
