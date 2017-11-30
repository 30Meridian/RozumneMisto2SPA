import { List, Map } from 'immutable';
import actions from '../../constants';


const defaultState = () => new Map({
  states: new List([]),
  transitions: new List([]),
  features: new List([
    new Map({id: 'O', value: 'Будь хто'}),
    new Map({id: 'S', value: 'Послідовно'}),
    new Map({id: 'P', value: 'Параллельно'})
  ]),
  directions: new List([
    new Map({id: '1', value: 'Прямий'}),
    new Map({id: '0', value: 'Обернений'})
  ])
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.LOAD_STATE:
      return state.set('states', new List(action.data));
    case actions.LOAD_TRANSITION:
      return state.set('transitions', new List(action.data));
    case actions.BUILDER_THREE_ADD_TRANSITION:
      return state.update('transitions', new List(), (list) => list.push(action.data));
    case actions.BUILDER_THREE_CHANGE_SOURCE:
      return state.setIn(['transitions', action.key, 'source_state'], action.data);
    case actions.BUILDER_THREE_CHANGE_DESTINATION:
      return state.setIn(['transitions', action.key, 'destination_state'], action.data);
    case actions.BUILDER_THREE_CHANGE_FEATURE:
      return state.setIn(['transitions', action.key, 'feature'], action.data);
    case actions.BUILDER_THREE_CHANGE_DIRECTION:
      return state.setIn(['transitions', action.key, 'direction'], action.data);
    case actions.BUILDER_THREE_MARK_DELETED_TRANSITION:
      return state.setIn(['transitions', action.key, 'isDeleted'], true);
    case actions.BUILDER_THREE_DELETE_TRANSITION:
      return state.deleteIn(['transitions', action.key]);
    default:
      return state;
  }
}
