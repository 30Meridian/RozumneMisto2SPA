import { List, Map, fromJS } from 'immutable';
import actions from '../constants';


const defaultState = () => new Map({
  title: '',
  title_image: undefined,
  created_by: '',
  state: '',
  date_created: '',
  id: '',
  message: '',
  documentForm: [],
  workflow_type: undefined,
  workflow_type_owner: undefined,
  workflow_type_id: undefined,
  items: undefined,
  workflowTypes: new List([]),
  publicTypes: undefined,
  publicTypesIsLoading: false,
  privateTypes: undefined,
  privateTypesIsLoading: false,
  communityTypes: undefined,
  communityTypesIsLoading: false,
  documentFormValue: new List([]),
  documentFormValues: new List([]),
  completedProceedings: new List([]),
  proceedings: new List([]),
  query: '',
  searchedDocuments: undefined,
  searchedDocumentsIsLoading: false,
  contractDepartments: new List([]),
  contractDepartment: null,
  newFiles: new List([]),
  attachedFiles: new List([]),
  documentCard: new Map(),
  documentsIsLoading: false,
  typeFilter: '',
  printTemplate: null,
  documentVoteList: new Map(),
  offlineVote: new Map({
    id: undefined,
    document: undefined,
    vote_count: 0,
  }),
  documentIsLoading: false
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.DOCUMENT_LOAD_DOCUMENT_CARD:
      return state.set('documentCard', action.data);
    case actions.DOCUMENT_CHANGE_TITLE:
      return state.set('title', action.data);
    case actions.DOCUMENT_CHANGE_TITLE_IMAGE:
      return state.set('title_image', action.data);
    case actions.LOAD_DOCUMENTS:
      return state.set('items', action.data);
    case actions.GENERATE_FORM:
      let values = action.data.map(item => item.value);
      return state.set('documentFormValue', new List(values)).set('documentForm', action.data);
    case actions.LOAD_WORKFLOW_TYPES:
      return state.set('workflowTypes', new List(action.data));
    case actions.LOAD_PUBLIC_TYPES:
      return state.set('publicTypes', action.data);
    case actions.PUBLIC_TYPES_IS_LOADING:
      return state.set('publicTypesIsLoading', action.data);
    case actions.LOAD_PRIVATE_TYPES:
      return state.set('privateTypes', action.data);
    case actions.PRIVATE_TYPES_IS_LOADING:
      return state.set('privateTypesIsLoading', action.data);
    case actions.LOAD_COMMUNITY_TYPES:
      return state.set('communityTypes', action.data);
    case actions.COMMUNITY_TYPES_IS_LOADING:
      return state.set('communityTypesIsLoading', action.data);
    case actions.CHANGE_WORKFLOW_TYPE:
      return state.set('workflow_type', action.data).set('title', action.data.title);
    case actions.CHANGE_WORKFLOW_TYPE_OWNER:
      return state.set('workflow_type_owner', action.data);
    case actions.DOCUMENT_CHANGE_FORM_VALUE:
      return state.setIn(['documentFormValue', action.index], action.data);
    case actions.DOCUMENT_LOAD_CREATED_BY:
      return state.set('created_by', action.data);
    case actions.DOCUMENT_LOAD_STATE:
      return state.set('state', action.data);
    case actions.DOCUMENT_LOAD_DATE:
      return state.set('date_created', action.data);
    case actions.DOCUMENT_LOAD_ID:
      return state.set('id', action.data);
    case actions.DOCUMENT_LOAD_FORM_VALUES:
      return state.set('documentFormValues', action.data);
    case actions.DOCUMENT_LOAD_COMPLETED_PROCEEDING:
      return state.set('completedProceedings', new List(action.data));
    case actions.DOCUMENT_LOAD_AVAILABLE_PROCEEDING:
      return state.set('proceedings', action.data);
    case actions.DOCUMENT_CHANGE_PROCEED_MESSAGE:
      return state.set('message', action.data);
    case actions.CHANGE_SEARCH_VALUE:
      return state.set('query', action.data);
    case actions.LOAD_SEARCHED_DOCUMENTS:
      return state.set('searchedDocuments', action.data);
    case actions.SEARCH_DOCUMENTS_IS_LOADING:
      return state.set('searchedDocumentsIsLoading', action.data);
    case actions.DOCUMENT_LOAD_CONTRACT_DEPARTMENTS:
      return state.set('contractDepartments', new List(action.data));
    case actions.DOCUMENT_CHANGE_CONTRACT_DEPARTMENT:
      return state.set('contractDepartment', action.data);
    case actions.DOCUMENT_LOAD_WORKFLOW_TYPE_ID:
      return state.set('workflow_type_id', action.data);
    case actions.DOCUMENT_LOAD_ATTACHED_FILES:
      return state.set('attachedFiles', new List(action.data));
    case actions.DOCUMENT_ADD_FILE_LIST:
      return state.update('newFiles', (list = List()) => list.concat(action.data));
    case actions.DOCUMENT_REMOVE_FILE_FROM_LIST:
      return state.deleteIn(['newFiles', action.data]);
    case actions.DOCUMENT_CLEAN_FILE_LIST:
      return state.set('newFiles', new List());
    case actions.DOCUMENTS_IS_LOADING:
      return state.set('documentsIsLoading', action.data);
    case actions.DOCUMENT_CHANGE_TYPE_FILTER:
      return state.set('typeFilter', action.data);
    case actions.DOCUMENT_LOAD_PRINT_TEMPLATE:
      return state.set('printTemplate', action.data);
    case actions.DOCUMENT_CHANGE_VOTE_LIST:
      return state.set('documentVoteList', action.data);
    case actions.DOCUMENT_CHANGE_OFFLINE_VOTE:
      return state.set('offlineVote', action.data);
    case actions.DOCUMENT_CHANGE_OFFLINE_VOTE_FIELD:
      return state.setIn(['offlineVote', action.key], action.data);
    case actions.DOCUMENT_IS_LOADING:
      return state.set('documentIsLoading', action.data);
    default:
      return state;
  }
};
