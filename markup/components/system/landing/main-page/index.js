import React, {Component} from 'react';

import Nav from '../nav';
import Head from './head';
import Screen from './screen';
import Features from './features';
import News from './news';
import Testimonials from './testimonials';
import Form from './form';



class MainPage extends Component {
	render() {
		return (
			<div className="landing-page">
				<Nav/>
				<Head/>
				<Screen/>
				<Features/>
				<Testimonials/>
				<News />
				<Form/>
			</div>
		)
	}
}

export default MainPage;
