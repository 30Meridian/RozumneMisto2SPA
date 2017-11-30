import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => (
	<table className="ui table table-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Користувач</th>
				<th>Дата приєднання</th>
				<th>Активний</th>
			</tr>
		</thead>
		<tbody>
			{props.items.map(item => (
				<tr key={item.id}>
					<td><span className="hide-desktop">ID: </span> {item.id}</td>
					<td><span className="hide-desktop">Користувач: </span>
						<Link to={`/admin/settings/users/user/${item.id}`}>
							{item.last_name} {item.first_name}
						</Link>
					</td>
					<td><span className="hide-desktop">Дата приєднання: </span>{new Date(item.date_joined).toLocaleString('uk-UA')}</td>
					<td><span className="hide-desktop">Активний: </span>{item.is_active ? "Так" : "Ні"}</td>
				</tr>
			))}
		</tbody>
	</table>
);

export default UserList;
