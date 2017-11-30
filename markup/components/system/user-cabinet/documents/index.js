import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateForm from './create';
import DocumentCard from './card';


class Documents extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/create/:slug`} component={CreateForm} />
        <Route path={`${this.props.match.path}/document/:id`} component={DocumentCard} />
      </Switch>
    );
  }
}

export default Documents;
