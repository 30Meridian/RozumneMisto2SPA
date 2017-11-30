import config from '../../../../config';
import history from '../../../../history';
import { Map, fromJS } from 'immutable';
import actions from '../../constants';


export const checkResponse = response => {
	if (!response.ok) {
		throw Error(response.statusText);
	}

	return response.json()
}

export const changeIsLoading = (data=false) => ({
	type: actions.SETTINGS_SETTING_IS_LOADING,
	data
});

export const settingChangeItems = (data) => ({
	type: actions.SETTINGS_SETTING_CHANGE_ITEMS,
	data
});

export const loadDepartmentList = (offset=0, limit=100, search='') => dispatch => {
	dispatch(changeIsLoading(true));
	fetch(`${config.apiHost}/department/?offset=${offset}&limit=${limit}&search=${search}`)
	.then(checkResponse)
	.then(json => {
		dispatch(settingChangeItems(json));
		dispatch(changeIsLoading(false));
	})
	.catch(e => {
		console.log(e);
	});
};

export const settingChangeItem = (data) => ({
	type: actions.SETTINGS_SETTING_CHANGE_ITEM,
	data
});

export const loadDepartmentItem = (id) => (dispatch) => {
	dispatch(changeIsLoading(true));
	fetch(`${config.apiHost}/department/${id}/`)
	.then(checkResponse)
	.then(json => {
		dispatch(settingChangeItem(fromJS(json)));
		dispatch(changeIsLoading(false));
	})
	.catch(e => {
		console.log(e);
	});
};

export const settingChangeItemValue = (data, key) => ({
	type: actions.SETTINGS_SETTING_CHANGE_ITEM_VALUE,
	key,
	data
});

export const settingCleanStore = () => (dispatch) => {
	dispatch(settingChangeItems(undefined));
	dispatch(settingChangeItem(new Map()));
}

export const submitDepartmentItem = (id) => (dispatch, getState) => {
	let body = getState().settings.setting.get('item');
	let method = body.get('id') ? "put" : "post";
	let url = body.get('id') ? `${config.apiHost}/department/${id}/` : `${config.apiHost}/department/`

	const options = {
		method,
		headers: {
			"Content-type": "application/json",
			"Authorization" : "Token " + getState().auth.get('token'),
		},
		body: JSON.stringify(body),
	};

	fetch(url, options)
	.then(checkResponse)
	.then(json => {
		history.push('/admin/settings/department');
	})
	.catch(e => {
		console.log(e);
	})
};

export const loadDepartmentStaffList = (department, offset=0, limit=100, search='') => dispatch => {
	dispatch(changeIsLoading(true));
	fetch(`${config.apiHost}/departmentstaff/department/${department}/?offset=${offset}&limit=${limit}&search=${search}`)
	.then(checkResponse)
	.then(json => {
		dispatch(settingChangeItems(json));
		dispatch(changeIsLoading(false));
	})
	.catch(e => {
		console.log(e);
	});
};

export const loadStaffItem = (id) => (dispatch) => {
	dispatch(changeIsLoading(true));
	fetch(`${config.apiHost}/departmentstaff/${id}/`)
	.then(checkResponse)
	.then(json => {
		dispatch(settingChangeItem(fromJS(json)));
		dispatch(changeIsLoading(false));
	})
	.catch(e => console.log(e));
};

export const submitStaffItem = (id, departmentId) => (dispatch, getState) => {
	let body = getState().settings.setting.get('item');
		body = body.set('department', departmentId);
	
	let method = body.get('id') ? "put" : "post";
	let url = body.get('id') ? `${config.apiHost}/departmentstaff/${id}/` : `${config.apiHost}/departmentstaff/`

	const options = {
		method,
		headers: {
			"Content-type": "application/json",
			"Authorization" : "Token " + getState().auth.get('token'),
		},
		body: JSON.stringify(body),
	};

	fetch(url, options)
	.then(checkResponse)
	.then(json => {
		history.push(`/admin/settings/department/department/${departmentId}`);
	})
	.catch(e => console.log(e));
};
