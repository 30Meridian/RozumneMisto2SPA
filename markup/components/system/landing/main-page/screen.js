import React, {Component} from 'react';

class Screen extends Component {
	render() {
		return (
			<section className="section-intro bg-faded text-xs-center">
				<div className="container">
					<h3 className="wp wp-1">Створюйте свій комфортний простір власноруч завдяки розумним рішенням.
					</h3>
					<p className="lead wp wp-2">Розумне місто - це комплекс сучасних технологій громадського впливу та звітності влади.</p>
					<img src="/assets/img/general/mock.png" alt="iPad mock" className="img-fluid wp wp-3"/>
				</div>
			</section>
		)
	}
}

export default Screen;
