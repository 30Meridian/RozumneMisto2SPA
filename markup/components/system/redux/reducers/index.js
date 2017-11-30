import { combineReducers } from 'redux';

import system from './system';
import invest from './invest';
import documents from './documents';
import auth from '../../../common/redux/reducers/auth';
import settings from '../../../admin/redux/reducers/settings';
import builder from '../../../admin/redux/reducers/builder';
import adminDocuments from '../../../admin/redux/reducers/documents';
import commDocument from '../../../common/redux/reducers/document';
import moderator from 'components/moderator-dashboard/redux/reducers';


const reducer = combineReducers({
  system,
  invest,
  documents,
  auth,
  settings,
  builder,
  adminDocuments,
  commDocument,
  moderator,
});

export default reducer;
