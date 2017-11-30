import React, {Component} from 'react';

import Title from 'components/dynamic-title';
import Nav from '../nav';
import Meta from './meta';
import Features from './features';
import Hexagon from './hexagon';
import HexagonMobile from './hexagon-mobile';
import Flips from './flips';
import Goverment from './goverment';
import Connect from './connect';

class Project extends Component {
	render() {
		return (
			<div className="simple-page landing-page">
				<Title title={`Про проект. Інформаційна система "Розумне місто" `} />
				<Nav />
				<Meta/>
				<Features/>
				<Hexagon/>
				<HexagonMobile/>
				<Flips/>
				<Goverment/>
				<Connect/>
			</div>
		)
	}
}

export default Project;
