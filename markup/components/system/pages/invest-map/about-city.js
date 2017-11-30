import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Marker, Polygon, Popup, TileLayer} from 'react-leaflet';
import {Switch, Route, Link} from 'react-router-dom';

import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';
import Title from 'components/dynamic-title';

import styles from './styles.scss';

class AboutCity extends Component {
	render() {

		const path = this.props.match.url;

		return (
			<Box>
				<Title title={`Інвестиційна карта. Про місто. Інформаційна система "Розумне місто"`} />
				<div className="text-center">
					<h3>ІНВЕСТИЦІЙНІ ПРОПОЗИЦІЇ</h3>
				</div>
				<div className={styles.btnGroup}>
					<div className="btn-group">
						<Link className="btn btn-default" to={`/${path}/projects`}>Загальні дані</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Фінанси</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Соціальна сфера</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Житло і офіси</Link>
						<Link className="btn btn-default" to={`/${path}/projects`}>Економіка</Link>
					</div>
				</div>
				<div className="about-city">
					<p>
						<strong>Нетішин</strong>
						- місто обласного значення в Україні, Хмельницької області. Місто розташоване на межі Хмельницької та Рівненської областей, за 5,5 км від залізничної станції Кривин.У місті добре розвинена мережа пасажирських перевезень. Забезпечено пасажирське сполучення до переважної більшості населених пунктів Хмельницької області &nbsp;та до Рівного, Вінниці, Львова, Житомира, Луцька, Тернополя, Києва.</p>
					<p>Соціально-побутова інфраструктури поєднує в собі житлово-комунальне господарство, підприємства побутового обслуговування та заклади торгівлі,&nbsp;ресторанного господарства.</p>
					<p>У місті добре розвинута торгівельна та фінансова інфраструктура , діють низка підприємств, що надають різного роду послуги для населення.</p>
					<p>Тут працює Хмельницька Атомна Електростанція.</p>
					<p>Давня історія та близкість до таких історичних центрів як Острог та Ізяслав створює умови для розвитку туристичного бізнесу.</p>
					<Row>
						<Col md={6}>
							<div>
								<img alt="" src="/assets/img/content/liigck.jpg"/>
							</div>
						</Col>
						<Col md={6}>
							<div>
								<img alt="" src="/assets/img/content/4780518.jpg"/>
							</div>
						</Col>
					</Row>
				</div>
			</Box>
		)
	}
}

export default AboutCity;
