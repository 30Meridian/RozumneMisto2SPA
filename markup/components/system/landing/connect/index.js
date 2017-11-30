import React, { Component } from 'react';

import Title from 'components/dynamic-title';
import Connect from '../project/connect';
import Nav from '../nav';

class ConnectPage extends Component {
	render() {
		return (
			<div className="connect-page">
				<Title title={`Підключитись. Інформаційна система "Розумне місто" `} />
				<Nav />
				<Connect />
			</div>
		)
	}
}

export default ConnectPage;
