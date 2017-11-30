import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentList = (props) => (
	<table className="ui table table-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Код</th>
				<th>Назва</th>
			</tr>
		</thead>
		<tbody>
			{props.items.map((item, index) => (
				<tr>
					<td><span className="hide-desktop">ID: </span> {item['id']}</td>
					<td><span className="hide-desktop">Код: </span> {item['code_department']}</td>
					<td><span className="hide-desktop">Назва: </span>
						<Link to={`/admin/settings/department/department/${item.id}`}>
							{item['full_name']}
						</Link>
					</td>
				</tr>

			))}
		</tbody>
	</table>
);

export default DepartmentList;
