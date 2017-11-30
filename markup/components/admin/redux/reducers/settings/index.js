import { combineReducers } from 'redux';

import community from './community';
import users from './users';
import setting from './setting';


const reducer = combineReducers({
  community,
  users,
  setting,
})

export default reducer;
