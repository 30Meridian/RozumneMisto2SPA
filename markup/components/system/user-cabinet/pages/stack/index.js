import React, {Component} from 'react';

import Box from 'components/box';

class Stack extends Component {
	render() {
		return (
			<Box>
				<h3>Перевірити стан черги</h3>
				<form className="ui form record-form">
					<div className="field">
						<label>Ім'я</label>
						<input type="text" placeholder="Ввведіть ваше ім'я"/>
					</div>
					<div className="field">
						<label>Прізвище</label>
						<input type="text" placeholder="Введіть ваше прізвище"/>
					</div>
					<div className="field">
						<label>Виберіть тип:</label>
						<select className="ui">
							<option value="val">Школа</option>
							<option value="val">Садок</option>
						</select>
					</div>
				</form>
			</Box>
		)
	}
}

export default Stack;
