import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import history from 'components/history';
import config from 'components/config';
import store from '../redux';

import ScrollToTop from '../scroll';
import AppRouter from './router';


const initGA = (history) => {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-72220102-2', 'auto');
  ga('send', 'pageview');

  history.listen((location) => {
    ga('send', 'pageview', location.pathname);
  });
};

initGA(history);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
        	<ScrollToTop>
            <AppRouter />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
