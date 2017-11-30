import React, {Component} from 'react';

import Box from 'components/box';
import {Row, Col} from 'react-bootstrap';

import styles from './styles.scss';

class Contacts extends Component {
	render() {
		return (
			<Box>
				<div class={styles.center}>
					<h3>Зв'язок з командою Розумного міста</h3>
				</div>
				<Row>
					<Col md={6}>
						<h5>
							<i className="fa fa-clock-o"></i>
							Працюємо: з 9:00 - 18:00</h5>
						<h5>
							<i className="fa fa-phone-square"></i>
							Телефон: +38(098) 600-11-59 (підключено також
							<a href="http://telegram.org" target="_blank">Telegram</a>)</h5>
						<div className="fb-block">
							<a href="https://www.facebook.com/rozumnemisto.org/?fref=ts" target="_blank"><img src="/assets/img/general/facebook.png"/></a>
						</div>
					</Col>
					<Col md={6}>
						<h5>
							<i className="fa fa-chrome"></i>
							ГО "Місто Майбутнього":
							<a href="http://cityfuture.org.ua" target="_blank">www.cityfuture.org.ua</a>
						</h5>
						<h5>
							<i className="fa fa-chrome"></i>
							БФ "Разом для України":
							<a href="http://razomforukraine.org" target="_blank">www.razomforukraine.org</a>
						</h5>
						<h5>
							<i className="fa fa-envelope"></i>
							Email: office@rozumnemisto.org</h5>
					</Col>
				</Row>
			</Box>
		)
	}
}

export default Contacts;
