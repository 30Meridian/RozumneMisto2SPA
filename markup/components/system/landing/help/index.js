import React, { Component } from 'react';

import Title from 'components/dynamic-title';
import Nav from '../nav';

class Help extends Component {
	render () {
		return (
			<div className="services-page">
				<Title title={`Допомога. Інформаційна система "Розумне місто" `} />
				<Nav />
				<div className="container container-fluid">
					<div className="col-md-12 services-content">
	          <h3>Інструкція</h3>
						<iframe src="https://docs.google.com/document/d/1HnLcVINBhCv4kiR8yWFIZUOHZh2ZmMJha3C3q0NhR1A/edit?usp=sharing"
							className="iframe-size"></iframe>
	        </div>
				</div>
			</div>
		)
	}
}

export default Help;
