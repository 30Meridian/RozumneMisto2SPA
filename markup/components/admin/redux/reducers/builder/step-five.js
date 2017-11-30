import { List, Map } from 'immutable';
import actions from '../../constants';


const defaultState = () => new Map({
  packages: new List([]),
  attachedPackages: new List([]),
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.BUILDER_FIVE_LOAD_PACKAGES:
      return state.set('packages', new List(action.data));
    case actions.BUILDER_FIVE_ADD_PACKAGE:
      return state.update('attachedPackages', (list=List()) => list.push(action.data));
    case actions.BUILDER_FIVE_CHANGE_PACKAGE:
      return state.setIn(['attachedPackages', action.key, 'package'], action.data);
    case actions.BUILDER_FIVE_CHANGE_STATE:
      return state.setIn(['attachedPackages', action.key, 'state'], action.data);
    case actions.BUILDER_FIVE_CHANGE_TRANSITION:
      return state.setIn(['attachedPackages', action.key, 'transition'], action.data);
    case actions.BUILDER_FIVE_CHANGE_CONFIG:
      return state.setIn(['attachedPackages', action.key, 'config'], action.data);
    default:
      return state;
  }
}
