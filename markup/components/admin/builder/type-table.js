import React, { Component } from 'react';

import Button from '../../form-components/button';
import {ButtonDefault} from 'components/common-components/buttons.js';
import form from '../../common-components/form.scss';


class TypeTable extends Component {
	render() {
		return (
			<div className="document-table">
				<table className="ui single line table documents-table">
          <thead>
            <tr>
							<th>ID</th>
              <th>Назва</th>
							<th>Організація-власник</th>
							<th>Категорія</th>
						  <th>Видимість</th>
							<th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map(item => (
              <tr key={item.id}>
								<td><span className="hide-desktop">ID: </span>{item.id}</td>
                <td><span className="hide-desktop">Назва: </span><p>{item.title}</p></td>
								<td><span className="hide-desktop">Організація-власник: </span>{item.owner_name}</td>
								<td><span className="hide-desktop">Категорія: </span>{item.category_name}</td>
                <td><span className="hide-desktop">Видимість: </span>{item.public ? 'Публічний' : 'Організаційний'}</td>
								<td><ButtonDefault size="12px" value="Редагувати" onClick={(event) => this.props.click(item.slug)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
		);
	}
}

export default TypeTable;
