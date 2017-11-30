import { List, Map } from 'immutable';
import actions  from '../../constants';


const defaultState = () => new Map({
	items: undefined,
	item: new Map(),
	isLoading: false,
});

export default (state = defaultState(), action) => {
  switch (action.type) {
		case actions.SETTINGS_SETTING_CHANGE_ITEMS:
			return state.set('items', action.data);
		case actions.SETTINGS_SETTING_IS_LOADING:
			return state.set('isLoading', action.data);
		case actions.SETTINGS_SETTING_CHANGE_ITEM:
			return state.set('item', action.data);
		case actions.SETTINGS_SETTING_CHANGE_ITEM_VALUE:
			return state.setIn(['item', action.key], action.data);
		default:
			return state;
	}
}
