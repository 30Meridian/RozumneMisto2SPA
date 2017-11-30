import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CommunityChoice from './community/choice';
import CommunityManagement from './community/manage';
import UsersChoice from './users/choice';
import UserManage from './users/manage';
import DepartmentChoice from './department/choice';
import DepartmentManage from './department/manage';
import DepartmentStaffManage from './department/staff-manage';

const Settings = (props) => (
  <div >
  <Switch>
    <Route exact path={`${props.match.path}/communities`} component={CommunityChoice} />
    <Route path={`${props.match.path}/communities/community/:id`} component={CommunityManagement} />
    <Route exact path={`${props.match.path}/users/`} component={UsersChoice} />
    <Route path={`${props.match.path}/users/user/:id`} component={UserManage} />
    <Route exact path={`${props.match.path}/communities/:page`} component={CommunityChoice} />
    <Route exact path={`${props.match.path}/users/:page`} component={UsersChoice} />

    <Route path={`${props.match.path}/department/department/:id/staff/:staffId`} component={DepartmentStaffManage} />
    <Route path={`${props.match.path}/department/department/:id`} component={DepartmentManage} />
    <Route path={`${props.match.path}/department/department/:id/:staffPage`} component={DepartmentManage} />
    <Route exact path={`${props.match.path}/department`} component={DepartmentChoice} />
    <Route path={`${props.match.path}/department/:page`} component={DepartmentChoice} />
  </Switch>
  </div>
);

export default Settings;
