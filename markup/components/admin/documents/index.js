import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ChooseForm from './create-form';
import CreateForm from './create-form/create.js';
import IncomingDocuments from './filters/incoming';
import MyDocuments from './filters/my';
import InWork from './filters/in-work';
import Drafts from './filters/draft';
import DocumentsDone from './filters/done';
import Archive from './filters/archive';
import SearchedDocuments from './filters/search';
import DocumentCard from './card';
import DocumentVoteList from './card/vote-list';
import AdminDocuments from './filters/admin';
import PbOfflineVote from './card/pb-offline-vote';


class Documents extends Component {
  render() {
    const pathPrefix = this.props.match.path;
    return (
      <Switch>
        <Route strict path={`${this.props.match.path}/list`} component={ChooseForm} />
        <Route path={`${this.props.match.path}/create/:slug`} component={CreateForm} />
        <Route path={`${pathPrefix}/document/:id/votelist/:page`} component={DocumentVoteList} />
        <Route path={`${pathPrefix}/document/:id/pb/offlinevote/`} component={PbOfflineVote} />
        <Route path={`${this.props.match.path}/document/:id`} component={DocumentCard} />
        <Route exact path={`${this.props.match.path}/incoming`} component={IncomingDocuments} />
        <Route path={`${this.props.match.path}/incoming/:page`} component={IncomingDocuments} />
        <Route exact path={`${this.props.match.path}/admin`} component={AdminDocuments} />
        <Route path={`${this.props.match.path}/admin/:page`} component={AdminDocuments} />
        <Route path={`${this.props.match.path}/in-work`} component={InWork} />
        <Route path={`${this.props.match.path}/drafts`} component={Drafts} />
        <Route path={`${this.props.match.path}/done`} component={DocumentsDone} />
        <Route exact path={`${this.props.match.path}/my`} component={MyDocuments} />
        <Route path={`${this.props.match.path}/my/:page`} component={MyDocuments} />
        <Route path={`${this.props.match.path}/archive`} component={Archive} />
        <Route exact path={`${this.props.match.path}/all`} component={IncomingDocuments} />
        <Route path={`${this.props.match.path}/all/:page`} component={IncomingDocuments} />
        <Route exact path={`${this.props.match.path}/search-documents`} component={SearchedDocuments} />
        <Route exact path={`${this.props.match.path}/search-documents/:page`} component={SearchedDocuments} />
      </Switch>
    );
  }
}

export default Documents;
