import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Marker, Polygon, Popup, TileLayer} from 'react-leaflet';
import {Switch, Route, Link} from 'react-router-dom';

import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';

class Characteristic extends Component {
	render() {

		const path = this.props.match.url;

		return (
			<Box>
				<div className="text-center">
					<h3>ІНВЕСТИЦІЙНІ ХАРАКТЕРИСТИКИ</h3>
				</div>
				<div className={styles.btnGroup}>
					<div className="btn-group">
						<Link className="btn btn-default" to={`/${path}/projects`}>Клімат та екологія</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Трудові ресурси</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Транспорт</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Інфраструктура</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Галузі</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Проекти</Link>
					</div>
				</div>

			</Box>
		)
	}
}

export default Characteristic;
