import { List, Map } from 'immutable';
import actions from '../constants';


const defaultState = () => new Map({
  title: '',
  image: undefined,
  workflow_type: undefined,
  document: new Map({}),
  packages: new List([]),
  package_data: new Map({}),
  documentFormValues: new List([]),
  documentCompletedProceedings: new List([]),
  documentForm: new List([]),
  documentFormValue: new List([]),
  counts: undefined,
  votes: new List([]),
  voteChoices: new List([]),
  voteSummary: new Map({}),
  documentIsLoading: false,
  module_type: undefined
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.DOCUMENT_CHANGE_TITLE:
      return state.set('title', action.data);
    case actions.DOCUMENT_CHANGE_IMAGE:
      return state.set('image', action.data);
    case actions.DOWNLOAD_FORM:
      let values = action.data.map(item => item.value);
      return state.set('documentForm', action.data).set('documentFormValue', new List(values));
    case actions.DOCUMENT_CHANGE_FORM_VALUE:
      return state.setIn(['documentFormValue', action.index], action.data);
    case actions.CHANGE_WORKFLOW_TYPE:
      return state.set('workflow_type', action.data);
    case actions.LOAD_DOCUMENT:
      return state.set('document', action.data);
    case actions.LOAD_DOCUMENT_PACKAGES:
      return state.set('packages', new List(action.data));
    case actions.LOAD_DOCUMENT_PACKAGE_DATA:
      return state.setIn(['package_data', action.key], action.data);
    case actions.LOAD_DOCUMENT_FORM_VALUES:
      return state.set('documentFormValues', new List(action.data));
    case actions.LOAD_DOCUMENT_COMPLETED_PROCEEDING:
      return state.set('documentCompletedProceedings', new List(action.data));
    case actions.LOAD_PETITIONS_COUNT:
      return state.set('counts', action.data);
    case actions.LOAD_DOCUMENT_PACKAGE_VOTES:
      return state.set('votes', new List(action.data));
    case actions.LOAD_VOTE_SUMMARY:
      return state.set('voteSummary', action.data);
    case actions.DOCUMENT_IS_LOADING:
      return state.set('documentIsLoading', action.data);
    case actions.LOAD_WORKFLOW_TYPE:
      return state.set('module_type', action.data);
    default:
      return state;
  }
}
