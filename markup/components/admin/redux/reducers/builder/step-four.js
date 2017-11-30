import { List, Map } from 'immutable';
import actions from '../../constants';


const defaultState = () => new Map({
  transitions: new List([]),
  staff: new List([]),
  attachedStaff: new List([]),
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.LOAD_TRANSITION:
      return state.set('transitions', new List(action.data));
    case actions.LOAD_STAFF:
      return state.set('staff', new List(action.data));
    case actions.BUILDER_FOUR_ADD_STAFF:
      return state.updateIn(['attachedStaff', action.transition_key], (list=new List()) => list.push(action.data));
    case actions.BUILDER_FOUR_CHANGE_TRANSITION_STAFF:
      return state.setIn(['attachedStaff', action.transition_key], action.data);
    case actions.BUILDER_FOUR_CHANGE_STAFF:
      return state.setIn(['attachedStaff', action.transition_key, action.staff_key, action.staff_key_field],
        action.data);
    case actions.BUILDER_FOUR_DELETE_STAFF:
      return state.deleteIn(['attachedStaff', action.transition_key, action.staff_key]);
    default:
      return state;
  }
}
