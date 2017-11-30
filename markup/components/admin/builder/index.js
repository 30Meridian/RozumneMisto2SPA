import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TypeList from './type-list';
import Builder from './builder';
import Box from 'components/box';


const BuilderRoute = (props) => (
	<Box>
		<Switch>
			<Route path={`${props.match.path}/workflow/:workflowId`} component={Builder} />
			<Route path={`${props.match.path}/:page`} component={TypeList} />
			<Route exact path={`${props.match.path}/`} component={TypeList} />
		</Switch>
	</Box>
);

export default BuilderRoute;
