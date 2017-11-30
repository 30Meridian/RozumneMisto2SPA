import { List, Map } from 'immutable';
import actions from '../../constants/builder';


const defaultState = () => new Map({
  departmentList: new Map(),
  departmentListIsLoading: true,
  categoryList: new Map(),
  workflow: new Map(),
  workflowIsLoading: true,
  workflowForm: undefined,
});

export default (state=defaultState(), action) => {
  switch (action.type) {
		case actions.BUILDER_WORKFLOW_CHANGE_DEPARTMENT_LIST:
			return state.set('departmentList', action.data);
    case actions.BUILDER_WORKFLOW_CHANGE_DEPARTMENT_LIST_IS_LOADING:
      return state.set('departmentListIsLoading', action.data);
		case actions.BUILDER_WORKFLOW_CHANGE_CATEGORY_LIST:
			return state.set('categoryList', action.data);
		case actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE:
			return state.set('workflow', action.data);
    case actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE_IS_LOADING:
      return state.set('workflowIsLoading', action.data);
		case actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE_FIELD:
			return state.setIn(['workflow', action.key], action.data);
		case actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE_FORM:
      return state.set('workflowForm', action.data);
    default:
      return state;
  }
};
