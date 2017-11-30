import config from '../../../../config.js';
import history from '../../../../history';
import { Map } from 'immutable';
import actions from '../../constants';


export const usersIsLoading = (data) => ({
	type: actions.USERS_IS_LOADING,
	data
});

export const fetchUsers = (limit=25, offset=0, search="") => (dispatch, getState) => {
	dispatch(usersIsLoading(true));
	const options = {
		headers: {
			"Authorization" : "Token " + getState().auth.get('token'),
		},
	};
	fetch(`${config.apiHost}/user/?limit=${limit}&offset=${offset}&search=${search}`, options)
	.then(response => {
		if (response.status == 200) {
			return response.json();
		} else {
			console.log(response.status);
			return [];
		}
	})
	.then(json => {
		dispatch(usersIsLoading(false));
		const data = json;
		dispatch({
			type: actions.SETTINGS_USER_LOAD_USERS,
			data
		});
	})
	.catch(e => console.log(e));
}

export const fetchUser = (user_id) => (dispatch, getState) => {
	const options = {
		headers: {
			"Authorization" : "Token " + getState().auth.get('token'),
		},
	};
	fetch(`${config.apiHost}/user/${user_id}/`, options)
	.then(response => {
		if (response.status == 200) {
			return response.json();
		} else {
			console.log(response.status);
			return {};
		}
	})
	.then(json => {
		const data = new Map(json);
		dispatch({
			type: actions.SETTINGS_USER_LOAD_USER,
			data
		});
	})
	.catch(e => console.log(e));
}

export const changeFirstName = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_FIRST_NAME,
  data
})

export const changeLastName = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_LAST_NAME,
  data
})

export const changeMiddleName = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_MIDDLE_NAME,
  data
})

export const changeEmail = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_EMAIL,
  data
})

export const changePhone = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_PHONE,
  data
})

export const changeActive = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_ACTIVE,
  data
})

export const changeStaff = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_STAFF,
  data
})

export const changeSuperuser = (data) => ({
  type: actions.SETTINGS_USER_CHANGE_SUPERUSER,
  data
})

export const submitUserChanges = (user_id) => (dispatch, getState) => {
	const options = {
		method: "put",
		headers: {
		  "Content-type": "application/json",
			"Authorization" : "Token " + getState().auth.get('token'),
		},
		body: JSON.stringify(
			getState().settings.users.get('user')
		),
	};
	fetch(`${config.apiHost}/user/${user_id}/`, options)
	.then(response => {
		if (response.status == 200) {
			return response.json();
		} else {
			console.log(response.status);
			return [];
		}
	})
	.then(json => {})
	.catch(e => console.log(e));
}

export const patchUserChanges = (userId, data) => (dispatch, getState) => {
	const options = {
		method: "PATCH",
		headers: {
		  "Content-type": "application/json",
			"Authorization" : "Token " + getState().auth.get('token'),
		},
		body: JSON.stringify(data)
	}
	fetch(`${config.apiHost}/user/${userId}/`, options)
	.then(response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		dispatch(fetchUser(userId));
	})
	.catch(e => console.log(e));
}
