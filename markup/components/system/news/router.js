import React from 'react';

import {Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';

import NewsList from './news-list';
import MainNews from './news-main';
import NewsCard from './card';
import SuggestNews from './suggest';
import Page403 from '../pages/not-found/403';

const mapStateToProps = state => ({token: state.auth.get('token')});

const NewsRouter = (props) => {
	const path = props.match.path;
	return (
		<Switch>
			<Route exact path={`${path}/`} component={NewsList}/>
			<Route exact path={`${path}/news-main`} component={MainNews}/>
			<Route path={`${path}/document/:id`} component={NewsCard}/>
			<Route path={`${path}/suggest`} component={props.token
				? SuggestNews
				: Page403}/>
			<Route exact path={`${path}/:page`} component={NewsList}/>
		</Switch>
	)
}

export default connect(mapStateToProps)(NewsRouter);
