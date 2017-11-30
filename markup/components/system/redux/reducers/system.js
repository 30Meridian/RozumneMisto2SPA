import { List, Map, fromJS } from 'immutable';
import actions from '../constants';
import moment from 'moment';

const defaultState = () => new Map({
  communities: new List([]),
  communitiesIsLoading: false,
  community: undefined,
  news: undefined,
  newsIsLoading: false,
  defects: undefined,
  defectsIsLoading: false,
  petitions: undefined,
  petitionsIsLoading: false,
  polls: undefined,
  pollsIsLoading: false,
  document_data: new List([]),
  donors: new List([]),
  value: '',
  queue: '',
  drugsList: '',
  tenders: undefined,
  tendersLoaded: false,
  weather: new List([]),
  dataCompanies: undefined,
  documents: undefined,
  documentsIsLoading: false,
  services: undefined,
  servicesIsLoading: false,
  communityMenu: undefined,
  communityOfficeMenu: undefined,
  query: '',
  searchedDocuments: undefined,
  searchIsLoading: false,
  toggleMobile: false,
  binded_community: new List([]),
  cityValue: '',
  cityValueSubmit: '',
  cityValueMain: '',
  searchedCities: [],
  signFirstName: '',
  signLastName: '',
  signMiddleName: '',
  signPhone: '',
  moduleIsLoading: false,
  profileData: undefined,
  myCabinetDocumets: undefined,
  activeCabinetDocuments: undefined,
  doneCabinetDocuments: undefined,
  standaloneHostEnable: false,
  standaloneHostIsLoading: true,

// ---- will be deleted after refactoring -----
  finance: new Map(),
  financeSum: null,
  // payerCodeEdr: '',
  // sortedBy: '',
  financePageType: 'all',
  // reverseFinanceList: false,
  allFinance: [],
  // recipientName: '',
  // recipientCodeEdr: '',
// ---- end  -----

// --- refactored open finance module -------
  startdate: moment(Date.now() + -7*24*3600*1000),
  enddate: moment(),
  financeInfo: new Map(),
  recipientCodeEdr: '',
  recipientName: '',
  payerCodeEdr: '',

  reverseFinanceList: false,
  sortedBy: '',
  livestream: undefined,
  newsAreLoading: false


// --- end of new open finance module -------
})

export default (state = defaultState(), action) => {
  switch (action.type) {
    case actions.LOAD_COMMUNITIES:
      return state.set('communities', new List(action.data));
    case actions.SYSTEM_CHANGE_COMMUNITITES_IS_LOADING:
      return state.set('communitiesIsLoading', action.data);
    case actions.LOAD_COMMUNITY:
      return state.set('community', action.data);
    case actions.LOAD_NEWS:
      return state.set('news', action.data);
    case actions.NEWS_IS_LOADING:
      return state.set('newsIsLoading', action.data);
    case actions.LOAD_DEFECTS:
      return state.set('defects', action.data);
    case actions.DEFECTS_IS_LOADING:
      return state.set('defectsIsLoading', action.data);
    case actions.MY_DEFECTS_IS_LOADING:
      return state.set('myDefectsIsLoading', action.data);
    case actions.LOAD_PETITIONS:
      return state.set('petitions', action.data);
    case actions.PETITIONS_IS_LOADING:
      return state.set('petitionsIsLoading', action.data);
    case actions.LOAD_POLLS:
      return state.set('polls', action.data);
    case actions.POLLS_IS_LOADING:
      return state.set('pollsIsLoading', action.data);
    case actions.LOAD_DOCUMENTS_DATA:
      return state.get('document_data', new List(action.data));
    case actions.LOAD_DONORS:
      return state.set('donors', new List(action.data));
    case actions.LOAD_VALUE:
      return state.set('value', action.data);
    case actions.LOAD_TENDERS:
      return state.set('tenders', action.data);
    case actions.LOAD_QUEUE:
      return state.set('queue', action.data);
    case actions.LOAD_START_DATE:
      return state.set('startdate', action.data);
    case actions.LOAD_END_DATE:
      return state.set('enddate', action.data);
    case actions.LOAD_PAYER_CODE_EDRPOU:
      return state.set('payerCodeEdr', action.data);
    case actions.LOAD_RECIPIENT_CODE_EDRPOU:
      return state.set('recipientCodeEdr', action.data);
    case actions.LOAD_RECIPIENT_NAME:
      return state.set('recipientName', action.data);
    case actions.LOAD_FINANCE_INFO:
      return state.set('financeInfo', action.data);
    case actions.SORT_FINANCE_BY:
      return state.set('sortedBy', action.data);
    case actions.REVERSE_FINANCE_LIST:
      return state.set('reverseFinanceList', action.data);
    case actions.LOAD_WEATHER:
      return state.set('weather', new List(action.data));
    case actions.LOAD_DOCUMENTS:
      return state.set('documents', action.data);
    case actions.CABINET_DOCUMENTS_IS_LOADING:
      return state.set('documentsIsLoading', action.data);
    case actions.LOAD_SERVICES:
      return state.set('services', action.data);
    case actions.SERVICES_IS_LOADING:
      return state.set('servicesIsLoading', action.data);
    case actions.LOAD_COMMUNITY_MENU:
      return state.set('communityMenu', action.data);
    case actions.LOAD_COMMUNITY_OFFICE_MENU:
      return state.set('communityOfficeMenu', action.data);
    case actions.CHANGE_SEARCH_VALUE:
      return state.set('query', action.data);
    case actions.LOAD_SEARCHED_DOCUMENTS:
      return state.set('searchedDocuments', action.data);
    case actions.SEARCH_IS_LOADING:
      return state.set('searchIsLoading', action.data);
    case actions.CHANGE_MOBILE_MENU:
      return state.set('toggleMobile', action.data);
    case actions.BINDED_COMMUNITY_ADD:
      if (state.get('binded_community').size >= 3)
          return state;
      const check = state.get('binded_community').map(item => item['id'] == action.data['id'])
      if (check.includes(true))
        return state;
      return state.update('binded_community', List(), (list) => list.push(action.data));
    case actions.BINDED_COMMUNITY_REMOVE:
      return state.deleteIn(['binded_community', action.data]);
    case actions.CHANGE_CITY_SEARCH_VALUE:
      return state.set('cityValue', action.data);
    case actions.CHANGE_CITY_SEARCH_SUBMIT_VALUE:
      return state.set('cityValueSubmit', action.data);
    case actions.CHANGE_CITY_SEARCH_MAIN_VALUE:
      return state.set('cityValueMain', action.data);
    case actions.CLEAR_CITY_SEARCH_VALUE:
      return state.set('cityValue', "");
    case actions.CLEAR_CITY_SEARCH_VALUE_SUBMIT:
      return state.set('cityValueSubmit', "");
    case actions.CLEAR_CITY_SEARCH_VALUE_MAIN:
      return state.set('cityValueMain', "");
    case actions.LOAD_SEARCHED_CITIES:
      return state.set('searchedCities', action.data);
    case actions.SIGN_UP_CHANGE_LAST_NAME:
      return state.set('signLastName', action.data);
    case actions.SIGN_UP_CHANGE_FIRST_NAME:
      return state.set('signFirstName', action.data);
    case actions.SIGN_UP_CHANGE_MIDDLE_NAME:
      return state.set('signMiddleName', action.data);
    case actions.SIGN_UP_CHANGE_PHONE:
      return state.set('signPhone', action.data);
    case actions.MODULE_IS_LOADING:
      return state.set('moduleIsLoading', action.data);
    case actions.LOAD_PROFILE_DATA:
      return state.set('profileData', action.data);
    case actions.LOAD_MY_CABINET_DOCUMENTS:
      return state.set('myCabinetDocumets', action.data);
    case actions.LOAD_ACTIVE_CABINET_DOCUMENTS:
      return state.set('activeCabinetDocumets', action.data);
    case actions.LOAD_DONE_CABINET_DOCUMENTS:
      return state.set('doneCabinetDocumets', action.data);
    case actions.STANDALONE_HOST_IS_LOADING:
      return state.set('standaloneHostIsLoading', action.data);
    case actions.STANDALONE_HOST_CHANGE_ENABLE:
      return state.set('standaloneHostEnable', action.data);
    case actions.LOAD_LIVE_STREAM:
      return state.set('livestream', action.data);
    case actions.NEWS_ARE_LOADING:
      return state.set('newsAreLoading', action.data);
    case actions.LOAD_DRUGS_LIST:
      return state.set('drugsList', action.data);
    default:
      return state;
  }
}
