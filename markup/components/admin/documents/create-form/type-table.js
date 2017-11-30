import React, { Component } from 'react';

import Pagination from '../../../system/pagination';

import Button from '../../../form-components/button';
import {ButtonDefault} from 'components/common-components/buttons';
import form from '../../../common-components/form.scss';


class TypeTable extends Component {
	render() {
		return (
			<div className="document-table">
				{this.props.items.results.length > 0 ? (
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
            {this.props.items.results.map(item => (
              <tr key={item.id}>
								<td><span className="hide-desktop">ID: </span>{item.id}</td>
                <td><p><span className="hide-desktop">Назва: </span>{item.title}</p></td>
								<td><span className="hide-desktop">Організація-власник: </span>{item.owner_name}</td>
								<td><span className="hide-desktop">Категорія: </span>{item.category_name}</td>
                <td><span className="hide-desktop">Видимість: </span>{item.public ? 'Публічний' : 'Організаційний'}</td>
								<td><ButtonDefault size="12px" value="Створити" onClick={() => this.props.click(item)}/></td>
              </tr>
            ))}
          </tbody>
        </table>

			):(
				<div>Документи відсутні</div>
			)
			}
      </div>
		);
	}
}

export default TypeTable;
