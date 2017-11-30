import React, {Component} from 'react';

import {Carousel} from 'react-bootstrap';

const Testimonials = React.createClass({

	getInitialState() {
		return {index: 0, direction: null};
	},

	handleSelect(selectedIndex, e) {
		this.setState({index: selectedIndex, direction: e.direction});
	},

	render() {
		return (
			<section className="section-testimonials text-xs-center bg-inverse">
				<div className="container">
					<h3 className="sr-only">Нас рекомендують:</h3>
					<Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect} controls={false} indicators={true}>
						<Carousel.Item>
							<blockquote className="blockquote">
								<img src="/assets/img/content/face1.jpg" height="80" width="80" alt="Avatar" className="img-circle"/>
								<p className="h3">Дякуючи платформі, міська рада стала більш відкритою та доступною для наших мешканців через зручний у використанні сервіс електронного врядування.
								</p>
								<footer>Южненська міська рада</footer>
							</blockquote>
						</Carousel.Item>
						<Carousel.Item>
							<blockquote className="blockquote">
								<img src="/assets/img/content/face2.jpg" height="80" width="80" alt="Avatar" className="img-circle"/>
								<p className="h3">Щиро дякуємо проекту за практичний досвід та інструменти для реформування управління містом у частині об'єднання зусиль влади і громади міста.</p>
								<footer>Нетішинська міська рада</footer>
							</blockquote>
						</Carousel.Item>
						<Carousel.Item>
							<blockquote className="blockquote">
								<img src="/assets/img/content/face3.jpg" height="80" width="80" alt="Avatar" className="img-circle"/>
								<p className="h3">Виражаємо подяку за плідну співпрацю у рамках впровадження та розвитку електронного врядування, налогодження взаємодії мід органами місцевого самоврядування і суспільством.</p>
								<footer>Білгород-Дністровська міська рада</footer>
							</blockquote>
						</Carousel.Item>
						<Carousel.Item>
							<blockquote className="blockquote">
								<img src="/assets/img/content/face4.jpg" height="80" width="80" alt="Avatar" className="img-circle"/>
								<p className="h3">Завдяки таким розумним і творчим колективам, Україна займе лідируючі позиції на щаблях електронного врядування світу! Щиро дякуємо за все!</p>
								<footer>С.Делідон, с.Зоря</footer>
							</blockquote>
						</Carousel.Item>
						<Carousel.Item>
							<blockquote className="blockquote">
								<img src="/assets/img/content/face5.jpg" height="80" width="80" alt="Avatar" className="img-circle"/>
								<p className="h3">Завдяки інноваційним рішенням, дана платформа стала для нас одним з найважливіших помічників в процесі налагодження взаємодії між міським керівництвом та кам'янчанами.</p>
								<footer>ГО "Краще разом", м.Кам'янське</footer>
							</blockquote>
						</Carousel.Item>
					</Carousel>
				</div>
			</section>
		)
	}
});

export default Testimonials;
