import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Polls from './index';
import PollsCard from './card';

const PollsRouter = (props) => {
  const path = props.match.path;
  return (<Switch>
    <Route path={`${path}/document/:id`} component={PollsCard} />
    <Route exact path={`${path}/`} component={Polls} />
  </Switch>)
};

export default PollsRouter;
