import React, { Component } from 'react';

import MenuElement from './menu-element';
import {Row, Col} from 'react-bootstrap';
import Input from '../../../form-components/input';


class MenuManagement extends Component {
	render() {
		return (
			<Col md={6}>
        <h4>{this.props.title}</h4>
				<label>Меню (json)</label>
				<textarea value={this.props.value} onChange={this.props.onChange} style={{'width': "100%"}}></textarea>
				<hr/>
			</Col>
		);
	}
}

export default MenuManagement;
