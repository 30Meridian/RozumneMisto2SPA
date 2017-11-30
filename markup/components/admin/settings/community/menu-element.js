import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Input from '../../../form-components/input';


const MenuElement = (props) => (
	<Col md={12}>
		<Col md={4}>
			<Input label="Вміст" />
		</Col>
		<Col md={4}>
			<Input label="Клас іконки" />
		</Col>
		<Col md={4}>
			<Input label="Шлях" />
		</Col>
	</Col>
);

export default MenuElement;
