import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux';

import Header from '../header';
import SignIn from '../sign-in';
import Content from '../content';
import Footer from 'components/footer';

const App = (props) => (
	<div className="container-fluid">
		<Header />
    <Route path="/admin" component={Content} />
		<Footer />
	</div>
);

export default App;
