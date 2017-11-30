import config from '../../../config';
import { fromJS } from 'immutable';
import actions from '../constants/statistic';


export const checkJsonResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export const logErrorConsole = (e) => console.log(e);

export const changeCommunityList = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_COMMUNITY_LIST,
  data
});

export const changeCommunityListIsLoading = (data) => ({
	type: actions.MODERATORDB_STATISTIC_CHANGE_COMMUNITY_LIST_IS_LOADING,
  data
});

export const changeCountPetition = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_COUNT_PETITION,
  data
});

export const changeCountInfRequest = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_COUNT_INF_REQUEST,
  data
});

export const changeCountNews = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_COUNT_NEWS,
  data
});

export const changeCountPoll = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_COUNT_POLL,
  data
});

export const changeCountCommunityAllowed = (data=0) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_COUNT_COMMUNITY_ALLOWED,
  data
});

export const loadCommunityStatisticForModule = (slug='', moduleSlug='') => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    }
  };
  return fetch(`${config.apiHost}/documents/community/${slug}/module/${moduleSlug}/?limit=1`, options)
  .then(checkJsonResponse)
  .then(json => {
    return json.count;
  })
  .catch(logErrorConsole);
}

export const loadCommunityStatistic = (slug='') => (dispatch, getState) => {
  dispatch(loadCommunityStatisticForModule(slug, 'petitions'))
  .then(count => dispatch(changeCountPetition(count)));
  dispatch(loadCommunityStatisticForModule(slug, 'defects'))
  .then(count => dispatch(changeCountInfRequest(count)));
  dispatch(loadCommunityStatisticForModule(slug, 'news'))
  .then(count => dispatch(changeCountNews(count)));
  dispatch(loadCommunityStatisticForModule(slug, 'polls'))
  .then(count => dispatch(changeCountPoll(count)));
}

export const loadCommunityList = (search='') => (dispatch, getState) => {
	const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    }
  };
	dispatch(changeCommunityListIsLoading(true));
	return fetch(`${config.apiHost}/community/moderation_allowed/?search=${search}&limit=20`, options)
	.then(checkJsonResponse)
	.then(json => {
		dispatch(changeCommunityList(fromJS(json)));
	})
	.catch(logErrorConsole)
	.then(() => dispatch(changeCommunityListIsLoading(false)));
};

export const changeMemberListIsLoading = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_MEMBER_LIST_IS_LOADING,
  data
});

export const changeMemberList = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_MEMBER_LIST,
  data
});

export const changeSelectedCommunity = (data) => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_SELECTED_COMMUNITY,
  data
});

export const changeMemberSearch = (data='') => ({
  type: actions.MODERATORDB_STATISTIC_CHANGE_MEMBER_SEARCH,
  data
});

export const loadCommunityMemberList = (slug='', offset=0, limit=10, search='') => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    }
  };
  dispatch(changeMemberListIsLoading(true));
  return fetch(`${config.apiHost}/communitymember/?community__slug=${slug}&limit=${limit}&offset=${offset}&search=${search}`,
    options)
  .then(checkJsonResponse)
  .then(json => {
    dispatch(changeMemberList(fromJS(json)));
  })
  .catch(logErrorConsole)
  .then(() => {
    dispatch(changeMemberListIsLoading(false));
  });
};
