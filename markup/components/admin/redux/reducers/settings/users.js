import { List, Map } from 'immutable';
import actions  from '../../constants';


const defaultState = () => new Map({
	users: {},
	usersIsLoading: false,
	user: new Map({
		last_name: '',
		first_name: '',
		middle_name: '',
		email: '',
		phone: '',
		is_active: false,
		is_staff: false,
		is_superuser: false,
	}),
});

export default (state = defaultState(), action) => {
  switch (action.type) {
		case actions.SETTINGS_USER_LOAD_USERS:
			return state.set('users', action.data);
		case actions.USERS_IS_LOADING:
			return state.set('usersIsLoading', action.data);
		case actions.SETTINGS_USER_LOAD_USER:
			return state.set('user', state.get('user').merge(action.data))
		case actions.SETTINGS_USER_CHANGE_LAST_NAME:
			return state.setIn(['user', 'last_name'], action.data);
		case actions.SETTINGS_USER_CHANGE_FIRST_NAME:
			return state.setIn(['user', 'first_name'], action.data);
		case actions.SETTINGS_USER_CHANGE_MIDDLE_NAME:
			return state.setIn(['user', 'middle_name'], action.data);
		case actions.SETTINGS_USER_CHANGE_EMAIL:
			return state.setIn(['user', 'email'], action.data);
		case actions.SETTINGS_USER_CHANGE_PHONE:
			return state.setIn(['user', 'phone'], action.data);
		case actions.SETTINGS_USER_CHANGE_ACTIVE:
			return state.setIn(['user', 'is_active'], action.data);
		case actions.SETTINGS_USER_CHANGE_STAFF:
			return state.setIn(['user', 'is_staff'], action.data);
		case actions.SETTINGS_USER_CHANGE_SUPERUSER:
			return state.setIn(['user', 'is_superuser'], action.data);
		default:
			return state;
	}
}
