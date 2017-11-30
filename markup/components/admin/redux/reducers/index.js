import { combineReducers } from 'redux';

import settings from './settings';
import auth from '../../../common/redux/reducers/auth';
import builder from './builder';
import documents from './documents';


const reducer = combineReducers({
  settings,
  auth,
  builder,
  documents,
});

export default reducer;
