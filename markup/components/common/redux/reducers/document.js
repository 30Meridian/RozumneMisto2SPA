import { List, Map } from 'immutable';
import actions from '../document';


const defaultState = () => new Map({
  title: '',
	workflowTypeId: undefined,
	titleImageOption: false,
  titleImage: undefined,
	documentForm: new List(),
	documentFormValue: new List(),
  formIsLoading: false,
  packages: new List(),
  choices: new List(),
});

export default (state=defaultState(), action) => {
  switch (action.type) {
		case actions.DOCUMENT_LOAD_FORM:
			return state.set('documentForm', new List(action.data));
		case actions.DOCUMENT_LOAD_DEFAULT_VALUE:
			return state.set('documentFormValue', new List(action.data));
		case actions.DOCUMENT_CHANGE_WORKFLOW_TYPE_ID:
			return state.set('workflowTypeId', action.data);
		case actions.DOCUMENT_CHANGE_TITLE:
      return state.set('title', action.data);
		case actions.DOCUMENT_CHANGE_TITLE_IMAGE_OPTION:
			return state.set('titleImageOption', action.data);
    case actions.DOCUMENT_CHANGE_TITLE_IMAGE:
      return state.set('titleImage', action.data);
		case actions.DOCUMENT_CHANGE_FORM_VALUE:
      return state.setIn(['documentFormValue', action.index], action.data);
    case actions.DOCUMENT_LOAD_PACKAGES:
      return state.set('packages', new List(action.data));
    case actions.DOCUMENT_FORM_CHOICE_ADD:
      return state.update('choices', (list=List()) => list.push(action.data));
    case actions.DOCUMENT_FORM_CHOICE_REMOVE:
      return state.deleteIn(['choices', action.data]);
    case actions.DOCUMENT_FORM_CHOICE_CLEAN:
      return state.set('choices', new List());
    case actions.DOCUMENT_FORM_CHOICE_CHANGE_TEXT:
      return state.setIn(['choices', action.index, 'choice_text'], action.data);
    case actions.DOCUMENT_FORM_CHOICE_CHANGE_FILE:
      return state.setIn(['choices', action.index, 'choice_image'], action.data);
    case actions.FORM_IS_LOADING:
      return state.set('formIsLoading', action.data);
    case actions.DOCUMENT_CLEAN_STORE:
      return defaultState();
		default:
			return state;
	}
};
