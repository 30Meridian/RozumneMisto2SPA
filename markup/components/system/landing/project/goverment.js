import React, {Component} from 'react';
import {Accordion, Panel} from 'react-bootstrap';

class Goverment extends Component {
	render() {
		return (
			<section className="section-text bg-inverse">
				<div className="container">
					<h1 className="text-xs-center p-t-1">ВЛАДІ</h1>
					<h6 className="text-xs-center p-t-1">«Розумне місто» - інтернет-платформа для конструктивної та відповідальної місцевої влади ОТГ та міст.</h6>
					<h6 className="text-xs-center p-t-0">Впроваджуючи «Розумне місто», влада отримує ефективні інструменти виконання своїх функцій, комунікації та співпраці з громадою.</h6>

					<h3 className="text-xs-center p-t-3">Навіщо Розумне місто владі?</h3>
					<Accordion>
						<Panel header=" Довіра мешканців" eventKey="1">
							Задоволені мешканці, які бачать що влада працює на благо громади (інформування про вирішені задачі та результати роботи)
						</Panel>
						<Panel header="Контроль виконання" eventKey="2">
							Інструменти контролю виконання установами та комунальними підприємствами роботи на благо громади
						</Panel>
						<Panel header="Пульс міста" eventKey="3">
							Мешканці інформують про потреби громади (петиції, дефекти ЖКГ), створюються механізми взаємодії та контролю настроїв громади
						</Panel>
						<Panel header="Аналітика та консалтинг" eventKey="4">
							Ми не тільки пропонуємо е-інструменти, але й пропонуємо консалтинг з найкращого використання цих інструментів з метою задоволення потреб мешканців
						</Panel>
						<Panel header="Вимоги законодавства" eventKey="5">
							Розумне місто зручно поєднує всі обов’язкові за законом е-сервіси для громадян (відкритий бюджет, петиції тощо)
						</Panel>
					</Accordion>

					<h3 className="text-xs-center p-t-3">5 причин обрати рішення «Розумне місто»:</h3>
					<div className="container meta">
						<div className="col-xs-12 col-sm-12 col-md-6">
							<img src="/assets/img/general/mone1.svg"/>
							<h6>Оптимальні витрати</h6>
							<p>Типові рішення мережі Розумних міст дозволяють налаштувати та підтримувати роботу системи за розумні кошти.</p>
							<div className="clearfix"></div>
							<img src="/assets/img/general/safety.svg"/>
							<h6>Випробувані та надійні рішення</h6>
							<p>Наші рішення випробувані часом (працює з лютого 2016 року). Системою користується 729 міст</p>
							<div className="clearfix"></div>
							<img src="/assets/img/general/support.svg"/>
							<h6>Гарантована підтримка</h6>
							<p>Ми гарантуємо якісну підтримку відповідно до обраного тарифного плану</p>
						</div>
						<div className="col-xs-12 col-sm-12 col-md-6">
							<img src="/assets/img/general/interface.svg"/>
							<h6>Простота використання</h6>
							<p>Інтуітивний та зрозумілий інтерфейс, детальні інструкції по використанню системи. Нічого зайвого</p>
							<div className="clearfix"></div>
							<img src="/assets/img/general/development.svg"/>
							<h6>Індивідуальні розробки</h6>
							<p>Ми пропонуємо розробки будь-яких рішень для потреб міста/громади.</p>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Goverment;
