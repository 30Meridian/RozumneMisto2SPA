import React, {Component} from 'react';

class Form extends Component {
	render() {
		return (
			<section className="section-signup bg-faded">
				<div className="container">
					<h3 className="text-xs-center m-b-3">Наші контакти</h3>
					<div className="row contacts-row">
						<div className="col-md-6 col-xs-12">
							<ul>
								<li>
									<i className="fa fa-map-marker" aria-hidden="true"></i>
									вул. Старокиївська, 10и, Київ, 04116</li>
								<li>
									<i className="fa fa-map-marker" aria-hidden="true"></i>
									<a href="https://www.google.com.ua/maps/place/50%C2%B027'12.9%22N+30%C2%B028'40.5%22E/@50.4535954,30.4757263,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d50.453592!4d30.477915">
										Знайти нас на мапі
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-6 col-xs-12">
							<ul>
								<li>
									<i className="fa fa-phone" aria-hidden="true"></i>
									Загальні питання:
									<a href="tel:">+38(067) 569-44-22</a>
								</li>
								<li>
									<i className="fa fa-phone" aria-hidden="true"></i>
									Відділ підтримки:
									<a href="tel:">+38(044) 539-44-22</a>
								</li>
								<li>
									<i className="fa fa-envelope-o" aria-hidden="true"></i>
									<a href="mailto:">office@rozumnemisto.org</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default Form;
