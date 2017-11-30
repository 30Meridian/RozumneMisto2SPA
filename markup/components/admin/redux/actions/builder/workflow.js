import config from 'components/config';
import history from 'components/history';
import { List, Map, fromJS } from 'immutable';
import actions from '../../constants/builder';
import { checkJsonResponse, logErrorConsole, generateAuthorizationHeader, generateAuthorizationOption
  } from 'components/utils/actions';


export const changeWorkflowTypeField = (key, data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE_FIELD,
	data,
	key
});

export const changeWorkflowType = (data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE,
	data
});

export const changeWorkflowTypeIsLoading = (data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE_IS_LOADING,
	data
});

export const changeWorkflowTypeForm = (data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_WORKFLOW_TYPE_FORM,
	data
});

export const changeDepartmentList = (data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_DEPARTMENT_LIST,
	data
});

export const changeDepartmentListIsLoading = (data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_DEPARTMENT_LIST_IS_LOADING,
	data
});

export const changeCategoryList = (data) => ({
	type: actions.BUILDER_WORKFLOW_CHANGE_CATEGORY_LIST,
	data
});

export const createWorkflowType = () => (dispatch) => {
	dispatch(changeWorkflowTypeIsLoading(true));

	let data = new Map({id: null, title: '', department: undefined, department_name: '', 'is_public': true});
	dispatch(changeWorkflowType(data));

	dispatch(changeWorkflowTypeIsLoading(false));
};

export const loadCategoryList = () => (dispatch, getState) => {
	let options = generateAuthorizationOption(getState);
	let url = `${config.apiHost}/workflow_type_category/`;

	return fetch(url, options)
	.then(checkJsonResponse)
	.then(json => {
		let data = fromJS(json);
		dispatch(changeCategoryList(data));
	})
	.catch(logErrorConsole);
};

export const loadDepartmentList = (search='') => (dispatch, getState) => {
	dispatch(changeDepartmentListIsLoading(true));
	let options = generateAuthorizationOption(getState);
	let url = `${config.apiHost}/department/?limit=25&search=${search}`;

	return fetch(url, options)
	.then(checkJsonResponse)
	.then(json => {
		let data = fromJS(json);
		dispatch(changeDepartmentList(data));
	})
	.catch(logErrorConsole)
	.then(() => {
		dispatch(changeDepartmentListIsLoading(false));
	});
}

export const loadWorkflowType = (id) => (dispatch, getState) => {
	dispatch(changeWorkflowTypeIsLoading(true));
	let options = generateAuthorizationOption(getState);
	let url = `${config.apiHost}/workflow_type/${id}/`;

	return fetch(url, options)
	.then(checkJsonResponse)
	.then(json => {
		let data = fromJS(json);
		dispatch(changeWorkflowType(data));
	})
	.catch(logErrorConsole)
	.then(() => {
		dispatch(changeWorkflowTypeIsLoading(false));
	});
};

export const loadWorkflowTypeForm = (workflowId) => (dispatch, getState) => {
	dispatch(changeWorkflowTypeIsLoading(true));
	let options = generateAuthorizationOption(getState);
	let url = `${config.apiHost}/form_component/?workflow_type=${workflowId}`;

	return fetch(url, options)
	.then(checkJsonResponse)
	.then(json => {
		let formData = JSON.stringify(json.results);
		let workflowForm = getState().builder.workflow.get('workflowForm');

		(workflowForm) ? workflowForm.actions.setData(formData) :
		  dispatch(changeWorkflowTypeForm({formData: formData}));
	})
	.catch(logErrorConsole)
	.then(() => {
		dispatch(changeWorkflowTypeIsLoading(false));
	});
}

export const submitWorkflowType = (id, url) => (dispatch, getState) => {
	let workflowType = getState().builder.workflow.get('workflow');
	let workflowForm = getState().builder.workflow.get('workflowForm');

	let options = {
		method: id > 0 ? "PUT" : "POST",
		headers: {
			'Content-type': 'application/json',
			...generateAuthorizationHeader(getState)
		},
		body: JSON.stringify({
      type: workflowType,
      form_components: JSON.parse(workflowForm.formData),
      departments: [workflowType.get('owner')],
      staff: [],
      owner: workflowType.get('owner'),
    })
	};
	let url = `${config.apiHost}/builder/1/` + (id > 0 ? `${workflowType.get("slug")}/` : "");

	return fetch(url, options)
	.then(checkJsonResponse)
	.then(json => {
		let data = fromJS(json);
		dispatch(changeWorkflowType(data));
		history.push(`/admin/builder/workflow/${json['id']}/step2`);
	})
	.catch(logErrorConsole)
	.then(() => {
		dispatch(changeWorkflowTypeIsLoading(false));
	});
};
