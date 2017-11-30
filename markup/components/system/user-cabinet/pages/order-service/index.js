import React, {Component} from 'react';

import Box from 'components/box';

class OrderService extends Component {
	render() {
		return (
			<Box>
				<h3>Замовити послугу</h3>
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
						<label>Виберіть тип послуги:</label>
						<select className="ui">
							<option value="val">Субсидія</option>
							<option value="val">Зареєструвати заявку</option>
						</select>
					</div>
				</form>
			</Box>
		)
	}
}

export default OrderService;
