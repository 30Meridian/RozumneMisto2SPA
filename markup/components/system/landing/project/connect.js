import React, {Component} from 'react';

class Connect extends Component {
	render() {
		return (
			<section className="section-features text-xs-center cd-container">
				<div className="container cd-container">
					<h1 className="text-xs-center">Підключити місто</h1>
					<h4 className="text-xs-center">Бажаєте отримати ці та інші переваги «Розумного міста» в своєму місті/громаді?
						<br/>
						– телефонуйте нам і ми разом налаштуємо «Розумне місто» якнайкраще для Вас.</h4>
					<section id="cd-timeline" className="cd-container">
						<div className="cd-timeline-block">
							<div className="cd-timeline-img cd-bg cd-picture">
								<h1 className="stages-field text-xs-center p-t-0">1</h1>
							</div>
							<div className="cd-timeline-content">
								<h2>Обираємо тарифний план</h2>
								<h3>Тарифний план та договір</h3>
								<p>Міська рада обирає зручний для себе тарифний план на обслуговування та підтримку порталу «Розумне місто». Укладається та підписується відповідний договір</p>
								<h6>Тарифний план може бути розроблено індивідуально для міста</h6>
							</div>
						</div>
						<div className="cd-timeline-block">
							<div className="cd-timeline-img cd-bg cd-movie">
								<h1 className="stages-field text-xs-center p-t-0">2</h1>
							</div>
							<div className="cd-timeline-content">
								<h2>Призначення модераторів</h2>
								<h3>Відповідальні особи</h3>
								<p>Визначаються відповідальні особи для модулів «Петиції» та  «Заявки ЖКГ». Модератори реєструються на сайті, повідомляють свої e-mail та отримують відповідні права</p>
								<h6>Можливе розподілення доступу до модулів</h6>
							</div>
						</div>
						<div className="cd-timeline-block">
							<div className="cd-timeline-img cd-bg cd-picture">
								<h1 className="stages-field text-xs-center p-t-0">3</h1>
							</div>
							<div className="cd-timeline-content">
								<h2>Налаштовуємо систему</h2>
								<h3>Налаштування модулів</h3>
								<p>Наші спеціалісти налаштовують систему під Ваше місто та підключають всі модулі. На даному етапі відбувається комунікація з місцевими модераторами</p>
								<h6>Робота займе від 3 до 5 робочих днів.</h6>
							</div>
						</div>
						<div className="cd-timeline-block">
							<div className="cd-timeline-img cd-bg cd-movie">
								<h1 className="stages-field text-xs-center p-t-0">4</h1>
							</div>
							<div className="cd-timeline-content">
								<h2>Популяризуємо систему</h2>
								<h3>Інформаційна робота</h3>
								<p>Починається інформування мешканців міста про підключення до системи «Розумне місто» через всі наявні інформаційні ресурси (телебачення, періодичні видання, місцеві веб-сайти та соціальні мережі).</p>
								<h6>Банери та інший необхідний матеріал ми надамо в електронному вигляді</h6>
							</div>
						</div>
					</section>
				</div>
			</section>
		)
	}
}

export default Connect;
