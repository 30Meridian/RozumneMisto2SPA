import { List, Map, fromJS } from 'immutable';
import actions  from '../../constants';


const defaultState = () => new Map({
  id: undefined,
  name: '',
  adminCommunities: undefined,
  communitiesIsLoading: true,
  allCommunities: undefined,
  parent: undefined,
  koatuu: '',
  active: false,
  communityTypes: undefined,
  communityType: undefined,
  documentPattern: '',
  banner: undefined,
  paymentWorkflows: fromJS({
    count: 3,
    results: [
    {id: 1, value: 'Вільний'},
    {id: 2, value: 'Стартовий'},
    {id: 3, value: 'Розумний'}
  ]}),
  generalWorkflows: new List([]),
  workflow: undefined,
  map: new Map({lat: 50.4, lng: 30.45}),
  zoom: 14,
  loadModules: new List([]),
  modules: new List([]),
  menu: '',
  officeMenu: '',
});

export default (state = defaultState(), action) => {
  switch (action.type) {
    case actions.LOAD_ADMIN_COMMUNITIES:
      return state.set('adminCommunities', action.data);
    case actions.COMMUNITIES_IS_LOADING:
      return state.set('communitiesIsLoading', action.data);
    case actions.LOAD_ALL_COMMUNITIES:
      return state.set('allCommunities', action.data);
    case actions.LOAD_COMMUNITY_TYPES:
      return state.set('communityTypes', action.data);
    case actions.LOAD_PAYMENT_WORKFLOWS:
      return state.set('paymentWorkflows', new List(action.data));
    case actions.LOAD_GENERAL_WORKFLOWS:
      return state.set('generalWorkflows', new List(action.data));
    case actions.LOAD_MODULES:
      return state.set('loadModules', new List(action.data));
    case actions.LOAD_COMMUNITY_ATTACHED_MODULES:
      return state.set('modules', new List(action.data));
    case actions.SETTINGS_COMMUNITY_CHANGE_FULL:
      return state.set('id', action.data.id).set('name', action.data.name).set('parent', action.data.parent || '')
      .set('koatuu', action.data.city).set('communityType', action.data.type)
      .set('documentPattern', action.data.document_index_template)
      // .set('banner', action.data.image)
      .set('active', action.data.active);
    case actions.SETTINGS_COMMUNITY_CHANGE_ID:
      return state.set('id', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_NAME:
      return state.set('name', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_PARENT:
      return state.set('parent', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_KOATUU:
      return state.set('koatuu', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_ACTIVE:
      return state.set('active', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_COMMUNITY_TYPE:
      console.log(action.data);
      return state.set('communityType', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_DOCUMENT_PATTERN:
      return state.set('documentPattern', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_BANNER:
      return state.set('banner', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_WORKFLOW:
      return state.set('workflow', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_MAP:
      return state.set('map', action.data);
    case actions.SETTINGS_COMMUNITY_ADD_MODULE:
      return state.update('modules', List(), (list) => list.push(action.data));
    case actions.SETTINGS_COMMUNITY_CHANGE_MODULE_MODULE:
      return state.setIn(['modules', action.key, 'module'], action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_MODULE_WORKFLOW:
      return state.setIn(['modules', action.key, 'workflow_type'], action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_MODULE_ACTIVE:
      return state.setIn(['modules', action.key, 'active'], action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_MENU:
      return state.set('menu', action.data);
    case actions.SETTINGS_COMMUNITY_CHANGE_OFFICE_MENU:
      return state.set('officeMenu', action.data);
    default:
      return state;
  }
}
