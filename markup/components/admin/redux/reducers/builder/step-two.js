import { List, Map } from 'immutable';
import actions from '../../constants';


const defaultState = () => new Map({
  states: new List([]),
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.BUILDER_TWO_ADD_STATE:
      return state.set('states', state.get('states').push(action.data));
    case actions.BUILDER_TWO_CHANGE_STATE_LABEL:
      return state.setIn(['states', action.key, 'label'], action.data);
    case actions.BUILDER_TWO_CHANGE_STATE_DESCRIPTION:
      return state.setIn(['states', action.key, 'description'], action.data);
    case actions.BUILDER_TWO_CHANGE_STATE_VISIBLE:
      return state.setIn(['states', action.key, 'visible'], action.data);
    case actions.LOAD_STATE:
      return state.set('states', new List(action.data));
    case actions.BUILDER_TWO_MARK_DELETED:
      return state.setIn(['states', action.key, 'isDeleted'], true);
    case actions.BUILDER_TWO_DELETE_STATE:
      return state.deleteIn(['states', action.key]);
    default:
      return state;
  }
}
