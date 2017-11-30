import config from '../../../../config';
import history from '../../../../history';
import { Map } from 'immutable';
import actions from '../../constants';


export const loadWorkflows = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/workflowtypes/organisation/?category=general`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error');
    }
  })
  .then((json) => {
    const data = json.results.map(item => new Map(item));
    dispatch({
      type: actions.LOAD_GENERAL_WORKFLOWS,
      data
    })
  })
  .catch((e) => {
    console.log(e);
  })
}

export const communitiesIsLoading = (data) => ({
  type: actions.COMMUNITIES_IS_LOADING,
  data
});

export const loadAdminCommunities = (limit=25, offset=0, search='') => (dispatch, getState) => {
  dispatch(communitiesIsLoading(true));
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/community/?limit=${limit}&offset=${offset}&search=${search}`, options)
  .then((response) => {
    if (!response.ok){
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    dispatch({
      type: actions.LOAD_ADMIN_COMMUNITIES,
      data: json
    });
  })
  .catch(e => console.log)
  .then(() => {
    dispatch(communitiesIsLoading(false));
  });
};


export const loadAllCommunities = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/community/`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    const data = json;
    dispatch({
      type: actions.LOAD_ALL_COMMUNITIES,
      data
    });
  })
  .catch(() => {
    // Work with error
  })
};



export const loadCommunityTypes = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/communitytypes/`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error')
    }
  })
  .then((json) => {
    const data = json['results'].map(item => new Map(item));
    dispatch({
      type: actions.LOAD_COMMUNITY_TYPES,
      data
    });
    dispatch(changeCommunityType(json['results'][0]['id']));
  })
  .catch((e) => {
    console.log(e);
  })
};

export const loadCommunity = (id) => (dispatch) => {
  dispatch({
    type: actions.SETTINGS_COMMUNITY_CHANGE_ID,
    data: id
  });
  fetch(`${config.apiHost}/community/${id}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return {};
    }
  })
  .then((json) => {
    dispatch({
      type: actions.SETTINGS_COMMUNITY_CHANGE_FULL,
      data: json
    });
    dispatch(changeCommunityMap({'lat': parseFloat(json.map_lat), 'lng': parseFloat(json.map_lon)}));
    dispatch(loadAttachedModules(json['slug']));
  })
  .catch(() => {
    // Work with error
  })
};

export const changeCommunityName = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_NAME,
  data
});

export const changeCommunityParent = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_PARENT,
  data
});

export const changeCommunityKoatuu = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_KOATUU,
  data
});

export const changeCommunityActive = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_ACTIVE,
  data
});

export const changeCommunityType = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_COMMUNITY_TYPE,
  data
});

export const changeCommunityDocumentPatter = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_DOCUMENT_PATTERN,
  data
});

export const changeCommunityBanner = (data) => (dispatch) => {
  const file = data.files[0];

  dispatch({
    type: actions.SETTINGS_COMMUNITY_CHANGE_BANNER,
    data: file,
  });
};

export const changeWorkflow = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_WORKFLOW,
  data
})

export const changeCommunityMap = (latlng) => {
  const data = new Map(latlng);
  return ({
    type: actions.SETTINGS_COMMUNITY_CHANGE_MAP,
    data
  })
};

export const submitCommunity = (id) => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('name', getState().settings.community.get('name'));
  if (getState().settings.community.get('parent'))
    formData.append('parent', getState().settings.community.get('parent'));
  formData.append('active', getState().settings.community.get('active'));
  formData.append('type', getState().settings.community.get('communityType'));
  formData.append('document_index_template', getState().settings.community.get('documentPattern'));
  formData.append('city', getState().settings.community.get('koatuu'));
  formData.append('index_community', '1');
  formData.append('map_lat', getState().settings.community.get('map').get('lat'));
  formData.append('map_lon', getState().settings.community.get('map').get('lng'));
  formData.append('zoom', getState().settings.community.get('zoom'));
  formData.append('town_type', getState().settings.community.get('communityType'));
  formData.append('workflow_type', getState().settings.community.get('workflow'));
  if (getState().settings.community.get('banner'))
    formData.append('image', getState().settings.community.get('banner'));
  const options = {
    method: (id > 0) ? "put" : "post",
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: formData
  };
  const url = (id > 0) ? `${config.apiHost}/community/${id}/` : `${config.apiHost}/community/`
  fetch(url, options)
  .then((response) => {
    if (response.status === 201 || response.status === 200) {
      return response.json();
    } else {
      return {id};
    }
  })
  .then((json) => {
    dispatch(submitCommunityModules(json['id']));
    dispatch(submitCommunityMenu(json['id']));
    dispatch(submitOfficeMenu(json['id']));
    history.push('/admin/settings/communities');
  })
  .catch((e) => {
    console.log(e);
  });
};

export const submitCommunityModules = (id) => (dispatch, getState) => {
  const modules = getState().settings.community.get('modules').map((item, index) => {
    return item.set('community', id).set('order', index);
  });
  modules.map(item => {
    const options = {
      method: item.get('id') ? "put" : "post",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Token " + getState().auth.get('token'),
      },
      body: JSON.stringify(item)
    };
    const url = item.get('id') ? `${config.apiHost}/modulecommunity/${id}/` : `${config.apiHost}/modulecommunity/`
    fetch(url, options)
    .then(response => {
      if (response.status === 201 || response.status === 200) {
        return response.json();
      } else {
        console.log('error');
      }
    })
    .then(json => {

    })
    .catch(e => {
      console.log(e);
    })
  });
};

export const submitCommunityMenu = (id) => (dispatch, getState) => {
  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: getState().settings.community.get('menu'),
  };
  fetch(`${config.apiHost}/dynamicmenu/community/${id}/community-menu/`, options)
  .then(response => {
    if (response.status == 200)
      return response.json();
    else
      console.log(response.status);
  })
  .then(json => {

  })
  .catch(e => console.log(e));
};

export const submitOfficeMenu = (id) => (dispatch, getState) => {
  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: getState().settings.community.get('officeMenu'),
  };
  fetch(`${config.apiHost}/dynamicmenu/community/${id}/office-menu/`, options)
  .then(response => {
    if (response.status == 200)
      return response.json();
    else
      console.log(response.status);
  })
  .then(json => {

  })
  .catch(e => console.log(e));
};

export const loadModules = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/modules/`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error')
    }
  })
  .then((json) => {
    const data = json['results'].map(item => new Map(item));
    dispatch({
      type: actions.LOAD_MODULES,
      data
    });
  })
  .catch((e) => {
    console.log(e);
  })
};

export const loadAttachedModules = (slug) => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/modulecommunity/?community__slug=${slug}`, options)
  .then(response => {
    if (response.status === 200)
      return response.json();
    else
      console.log(response.status);
  })
  .then(json => {
    const data = json['results'].map(item => new Map(item));
    dispatch({
      type: actions.LOAD_COMMUNITY_ATTACHED_MODULES,
      data
    })
  })
}

export const addModule = () => ({
  type: actions.SETTINGS_COMMUNITY_ADD_MODULE,
  data: new Map({
    module: undefined,
    workflow_type: undefined,
    active: false,
  })
});

export const changeModuleModule = (data, key) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_MODULE_MODULE,
  data,
  key
});

export const changeModuleWorkflow = (data, key) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_MODULE_WORKFLOW,
  data,
  key
});

export const changeModuleActive = (data, key) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_MODULE_ACTIVE,
  data,
  key
});

export const changeCommunityMenu = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_MENU,
  data
});

export const changeCommunityOfficeMenu = (data) => ({
  type: actions.SETTINGS_COMMUNITY_CHANGE_OFFICE_MENU,
  data
});
