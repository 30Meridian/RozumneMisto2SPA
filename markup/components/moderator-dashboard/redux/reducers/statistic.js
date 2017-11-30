import { List, Map } from 'immutable';
import actions from '../constants/statistic';

const defaultState = () => new Map({
	communityUser: new Map(),
	countPetition: 0,
	countInfRequest: 0,
	countNews: 0,
	countPoll: 0,
	communityListIsLoading: true,
	communityList: new Map(),
	memberListIsLoading: true,
	memberList: new Map(),
	countCommunityAllowed: 0,
	selectedCommunity: new Map(),
	memberSearch: "",
});

export default (state=defaultState(), action) => {
  switch (action.type) {
		case actions.MODERATORDB_STATISTIC_CHANGE_COMMUNITY_USER:
			return state.set('communityUser', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COUNT_PETITION:
			return state.set('countPetition', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COUNT_INF_REQUEST:
			return state.set('countInfRequest', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COUNT_NEWS:
			return state.set('countNews', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COUNT_POLL:
			return state.set('countPoll', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COMMUNITY_LIST:
			return state.set('communityList', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COMMUNITY_LIST_IS_LOADING:
			return state.set('communityListIsLoading', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_COUNT_COMMUNITY_ALLOWED:
			return state.set('countCommunityAllowed', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_MEMBER_LIST:
			return state.set('memberList', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_MEMBER_LIST_IS_LOADING:
			return state.set('memberListIsLoading', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_SELECTED_COMMUNITY:
			return state.set('selectedCommunity', action.data);
		case actions.MODERATORDB_STATISTIC_CHANGE_MEMBER_SEARCH:
			return state.set('memberSearch', action.data);
		default:
			return state;
	}
};
