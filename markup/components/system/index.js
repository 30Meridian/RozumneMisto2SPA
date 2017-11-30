import React from 'react';
import ReactDOM from 'react-dom';

import App from './application'

const rootElement = document.getElementById('root');

const renderApplication = () => {
	const rootComponent = (
		<App />
	);
	ReactDOM.render(rootComponent, rootElement);
};

renderApplication();
