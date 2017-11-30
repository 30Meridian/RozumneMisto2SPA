import React, {Component} from 'react';

class Modules extends Component {
	render() {
		return (
			<div>
				<div className="col-md-4">
					<div className="card">
						<div className="card-block">
							<span className="icon-pen display-1"></span>
							<h4 className="card-title">Петиції</h4>
							<h6 className="card-subtitle text-muted">Обов'язковий інструмент</h6>
							<p className="card-text">Ефективний інструмент для прояву громадської активності та ідентифікації як проблем, так і корисних для міста/громади проектів.
							</p>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card">
						<div className="card-block">
							<span className="icon-pen display-1"></span>
							<h4 className="card-title">Заявки ЖКГ</h4>
							<h6 className="card-subtitle text-muted">Діалог з громадою</h6>
							<p className="card-text">Зроби місто кращим: додай проблему, познач на карті, додай фото. Крок за кроком місто стає комфортнішим, чистішим та безпечнішим.
							</p>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card m-b-0">
						<div className="card-block">
							<span className="icon-pen display-1"></span>
							<h4 className="card-title">Бюджет</h4>
							<h6 className="card-subtitle text-muted">Обов'язковий інструмент</h6>
							<p className="card-text">Візуалізована інформація про доходи та видатки бюджету громади в доступному форматі.</p>
						</div>
					</div>
				</div>

				<div className="clearfix"></div>

				<div className="col-md-4">
					<div className="card m-b-0">
						<div className="card-block">
							<span className="icon-pen display-1"></span>
							<h4 className="card-title">Е-послуги</h4>
							<h6 className="card-subtitle text-muted">Діалог з громадою</h6>
							<p className="card-text">Перелік та доступ до державних і місцевих електронних сервісів як для мешканців, так і для бізнесу.</p>
						</div>
					</div>
				</div>

				<div className="col-md-4">
					<div className="card m-b-0">
						<div className="card-block">
							<span className="icon-pen display-1"></span>
							<h4 className="card-title">Благоустрій</h4>
							<h6 className="card-subtitle text-muted">Житлово-комунальне господарство</h6>
							<p className="card-text">Автоматизована система управління процесами у сфері ЖКГ: реєстрація, адміністрування та виконання електронних заявок на усунення локальних проблем міста.</p>
						</div>
					</div>

				</div>
				<div className="col-md-4">
					<div className="card m-b-0">
						<div className="card-block">
							<span className="icon-pen display-1"></span>
							<h4 className="card-title">Інвестиційна карта</h4>
							<h6 className="card-subtitle text-muted">Бізнес та інвестиції</h6>
							<p className="card-text">Практичний інструмент візуалізації та адміністрування об’єктів для залучення інвестицій до громади
							</p>
						</div>
					</div>
				</div>

				<div className="clearfix"></div>
			</div>
		)
	}
}

export default Modules;
