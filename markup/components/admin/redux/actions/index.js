import config from '../../../config';
import history from '../../../history';
import { List, Map, fromJS } from 'immutable';
import actions from '../constants';
import { checkJsonResponse, logErrorConsole, generateAuthorizationHeader } from 'components/utils/actions';

export const documentsIsLoading = (data) => ({
  type: actions.DOCUMENTS_IS_LOADING,
  data
})

const fetchDocument = (url, dispatch, getState) => {
  dispatch(documentsIsLoading(true));
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      console.log(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    const data = json;
    dispatch({
      type: actions.LOAD_DOCUMENTS,
      data
    });
    dispatch(documentsIsLoading(false));
  });
};

export const fetchDocuments = (limit=25, offset=0, filter='') => (dispatch, getState) => {
  fetchDocument(`${config.apiHost}/documents/?limit=${limit}&offset=${offset}&workflow_title=${filter}`,
    dispatch, getState);
};

export const fetchMyDocuments = (limit=25, offset=0, filter='') => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/mydocuments/?limit=${limit}&offset=${offset}&workflow_title=${filter}`,
      dispatch, getState);
}

export const fetchIncomeDocuments = (limit=25, offset=0, filter='') => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/income/?limit=${limit}&offset=${offset}&workflow_title=${filter}&source_only=true`,
      dispatch, getState);
}

export const fetchIncomingDocuments = (limit=25, offset=0, filter='') => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/income/?limit=${limit}&offset=${offset}&workflow_title=${filter}`,
      dispatch, getState);
}

export const fetchDraftDocuments = () => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/?condition=Dr`, dispatch, getState);
}

export const fetchActiveDocuments = () => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/?condition=A`, dispatch, getState);
}

export const fetchDoneDocuments = () => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/?condition=Dn`, dispatch, getState);
}

export const fetchArchiveDocuments = () => (dispatch, getState) => {
    fetchDocument(`${config.apiHost}/documents/?condition=Arx`, dispatch, getState);
}

export const fetchCategories = () => (dispatch) => {
  fetch(`${config.apiHost}/typecategory/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    const data = json['results'].map(item => new Map({
      id: item.id,
      value: item.name,
      slug: item.slug,
    }));
    dispatch({
      type: actions.LOAD_CATEGORY,
      data
    });
  });
};

export const fetchDepartments = (search='') => (dispatch) => {
  fetch(`${config.apiHost}/department/?search=${search}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    dispatch({
      type: actions.LOAD_DEPARTMENT,
      data: fromJS(json)
    });
  });
};

export const cleanBuilderOneStorage = () => ({
  type: actions.BUILDER_ONE_CLEAN_STORAGE
});

export const changeBuilderOneTitle = (data) => ({
  type: actions.BUILDER_ONE_CHANGE_TITLE,
  data
});

export const changeBuilderOneDepartment = (data) => ({
  type: actions.BUILDER_ONE_CHANGE_DEPARTMENT,
  data
});

export const changeBuilderOneCategory = (data) => ({
  type: actions.BUILDER_ONE_CHANGE_CATEGORY,
  data
});

export const changeBuilderOnePublic = (data) => ({
  type: actions.BUILDER_ONE_CHANGE_PUBLIC,
  data
});

export const changeBuilderOneImageOption = (data) => ({
  type: actions.BUILDER_ONE_CHANGE_IMAGE_OPTION,
  data
});

export const generateFormBuilder = (data) => ({
  type: actions.BUILDER_ONE_GENERATE_BUILDER,
  data
})

export const changeWorkflowTypeOwner = (slug) => (dispatch, getState) => {
  fetch(`${config.apiHost}/department/owner/${slug}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    const data = new Map(json);
    dispatch({
      type: actions.CHANGE_WORKFLOW_TYPE_OWNER,
      data
    })
  })
  .catch((e) => {
    // Error
  })
}

export const changeWorkflowType = (data) => (dispatch) => {
  dispatch({
    type: actions.CHANGE_WORKFLOW_TYPE,
    data
  });
  if (data.slug) {
    dispatch(changeWorkflowTypeOwner(data.slug));
  }
};

export const submitType = () => (dispatch, getState) => {
  const slug_exist = getState().documents.get('workflow_type') && getState().documents.get('workflow_type').get('slug');
  const type = {
    title: getState().builder.one.get('title'),
    category: getState().builder.one.get('category'),
    public: getState().builder.one.get('public'),
    image_option: getState().builder.one.get('image_option'),
  }
  const options = {
    method: slug_exist ? "put" : "post",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: JSON.stringify({
      type: type,
      form_components: JSON.parse(getState().builder.one.get('formBuilder').formData),
      departments: [getState().builder.one.get('department')],
      staff: [],
      owner: getState().builder.one.get('department'),
    })
  }
  const url = `${config.apiHost}/builder/1/` + (slug_exist ? `${slug_exist}/` : "");
  fetch(url, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    dispatch(changeWorkflowType(new Map(json)));
    history.push(`/admin/builder/${json['slug']}/step2`);
  })
  .catch(e => console.log(e));
};

export const addState = () => ({
  type: actions.BUILDER_TWO_ADD_STATE,
  data: new Map({
    'id': null,
    'label': '',
    'description': '',
    'isDeleted': false,
    'visible': false,
  })
});

export const changeStateLabel = (data, key) => ({
  type: actions.BUILDER_TWO_CHANGE_STATE_LABEL,
  data,
  key
});

export const changeStateDescription = (data, key) => ({
  type: actions.BUILDER_TWO_CHANGE_STATE_DESCRIPTION,
  data,
  key
});

export const changeStateVisible = (data, key) => ({
  type: actions.BUILDER_TWO_CHANGE_STATE_VISIBLE,
  data,
  key
});

export const markDeletedState = (key) => ({
  type: actions.BUILDER_TWO_MARK_DELETED,
  key
});

export const deleteState = (key) => ({
  type: actions.BUILDER_TWO_DELETE_STATE,
  key
});

export const deleteStateElement = (key, id) => (dispatch) => {
  if (id) {
    dispatch(markDeletedState(key));
  } else {
    dispatch(deleteState(key));
  }
};

export const submitStates = (workflowId, nextUrl) => (dispatch, getState) => {
  const states = getState().builder.two.get('states').map((item) => {
    const body = item.set('type_ref', workflowId)
    let method = "post",
        url = `${config.apiHost}/builder/2/`;

    if (item.get('id')) {
      if (item.get('isDeleted')) {
        method = "delete";
      } else {
        method = "put";
      }
      url += `${item.get('id')}/`;
    }

    const options = {
      method,
      headers: {
        "Content-type": "application/json",
        "Authorization": "Token " + getState().auth.get('token'),
      },
      body: JSON.stringify(body)
    };

    return fetch(url, options)
    .then(checkJsonResponse);
  });

  Promise.all(states)
  .then(response => {
		history.push(nextUrl);
  })
  .catch(e => {
    console.log(e);
  });
};

export const fetchStates = (workflowId='') => (dispatch, getState) => {
  fetch(`${config.apiHost}/workflow_state/?type_ref=${workflowId}`)
  .then(checkJsonResponse)
  .then((json) => {
    const data = json.results.map(item => {
      item.is_new = false;
      item.is_deleted = false;
      return new Map(item);
    });
    dispatch({
      type: actions.LOAD_STATE,
      data
    });
  })
  .catch(e => console.log(e));
};

export const addTransition = () => ({
  type: actions.BUILDER_THREE_ADD_TRANSITION,
  data: new Map({
    'id': null,
    'source': undefined,
    'destination': undefined,
    'feature': 'O',
    'direction': 1,
    'isDeleted': false,
  })
});

export const changeTransitionSource = (data, key) => ({
  type: actions.BUILDER_THREE_CHANGE_SOURCE,
  data,
  key
});

export const changeTransitionDestination = (data, key) => ({
  type: actions.BUILDER_THREE_CHANGE_DESTINATION,
  data,
  key
});

export const changeTransitionFeature = (data, key) => ({
  type: actions.BUILDER_THREE_CHANGE_FEATURE,
  data,
  key
});

export const changeTransitionDirection = (data, key) => ({
  type: actions.BUILDER_THREE_CHANGE_DIRECTION,
  data,
  key
});

export const markDeletedTransition = (key) => ({
  type: actions.BUILDER_THREE_MARK_DELETED_TRANSITION,
  key
});

export const deleteTransition = (key) => ({
  type: actions.BUILDER_THREE_DELETE_TRANSITION,
  key
});

export const deleteTransitionElement = (key, id) => (dispatch) => {
  if (id) {
    dispatch(markDeletedTransition(key));
  } else {
    dispatch(deleteTransition(key));
  }
};

export const submitTransitions = (workflowId, nextUrl) => (dispatch, getState) => {
  const transitions = getState().builder.three.get('transitions').map((item) => {
    const body = item.set('workflow_type', workflowId)
      .set('direction', parseInt(item.get('direction')));
    let method = "post",
        url = `${config.apiHost}/workflow_transition/`;

    if (item.get('id')) {
      if (item.get('isDeleted')) {
        method = "delete";
      } else {
        method = "put";
      }
      url += `${item.get('id')}/`;
    }

    const options = {
      method,
      headers: {
        "Content-type": "application/json",
        "Authorization": "Token " + getState().auth.get('token'),
      },
      body: JSON.stringify(body)
    };

    return fetch(url, options)
    .then(checkJsonResponse)
    .catch(logErrorConsole);
  });

  Promise.all(transitions)
  .then(response => {
		history.push(nextUrl);
  })
  .catch(e => {
    console.log(e);
  });
};

export const loadWorkflowTypes = () => (dispatch, getState) => {
  fetch(`${config.apiHost}/workflowtypes/`, { headers: {"Authorization": "Token "+getState().auth.get('token')}})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then(json => {
    const data = json['results'].map((item) => new Map(item));
    dispatch({
      type: actions.LOAD_WORKFLOW_TYPES,
      data
    });
  })
  .catch(e => console.log(e));
}

export const typesIsLoading = (data) => ({
  type: actions.PUBLIC_TYPES_IS_LOADING,
  data
});


export const loadPublicTypes = (limit=25, offset=0, search='') => (dispatch, getState) => {
  dispatch(typesIsLoading(true));
  fetch(`${config.apiHost}/workflowtypes/public/?limit=${limit}&offset=${offset}&search=${search}`,
     {headers: {"Authorization": "Token "+getState().auth.get('token')}})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    dispatch(typesIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_PUBLIC_TYPES,
      data
    })
  })
  .catch((e) => {
    // Error
  });
};

export const loadPrivateTypes = (limit=5, offset=0) => (dispatch, getState) => {
  dispatch(typesIsLoading(true));
  fetch(`${config.apiHost}/workflowtypes/organisation/?limit=${limit}&offset=${offset}`, { headers: {"Authorization": "Token "+getState().auth.get('token')}})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then((json) => {
    dispatch(typesIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_PRIVATE_TYPES,
      data
    })
  })
  .catch((e) => {
    // Error
  });
};

export const loadCommunityTypes = (limit=5, offset=0) => (dispatch, getState) => {
    dispatch(typesIsLoading(true));
  fetch(`${config.apiHost}/workflowtypes/community/?limit=${limit}&offset=${offset}`,
    { headers: {"Authorization": "Token "+getState().auth.get('token')}})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log(response.status);
      return [];
    }
  })
  .then(json => {
    dispatch(typesIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_COMMUNITY_TYPES,
      data
    });
  })
  .catch(e => console.log(e));
};

export const loadTransitions = (workflowId) => (dispatch, getState) => {
  fetch(`${config.apiHost}/workflow_transition/?source_state__type_ref=${workflowId}`)
  .then(checkJsonResponse)
  .then((json) => {
    const data = json.results.map((item) => new Map(item));
    dispatch({
      type: actions.LOAD_TRANSITION,
      data
    })
  })
  .catch(logErrorConsole);
};

export const loadStaffList = (workflowId) => (dispatch, getState) => {
  fetch(`${config.apiHost}/department_staff/owner_workflow_id/${workflowId}/`)
  .then(checkJsonResponse)
  .then((json) => {
    const data = json.map((item) => new Map({
      id: item.id,
      value: `${item.attached_user_name} (${item.name_staff})`,
    }));
    dispatch({
      type: actions.LOAD_STAFF,
      data
    })
  })
  .catch(logErrorConsole);
};

export const changeTransitionStaff = (transition_key, data) => ({
  type: actions.BUILDER_FOUR_CHANGE_TRANSITION_STAFF,
  transition_key,
  data
});

export const loadTransitionStaffList = (transitionId, order) => (dispatch, getState) => {
  fetch(`${config.apiHost}/attached_staff/?transition=${transitionId}`)
  .then(checkJsonResponse)
  .then(json => {
    const data = fromJS(json.results);
    dispatch(changeTransitionStaff(order, data));
  })
  .catch(logErrorConsole)
};

export const addStaff = (transition_key, transition_id) => ({
  type: actions.BUILDER_FOUR_ADD_STAFF,
  transition_key,
  data: new Map({
    'id': null,
    'staff': undefined,
    'transition': transition_id,
    'order': undefined,
    'isDeleted': false,
  })
});

export const changeStaffField = (data, transition_key, staff_key, staff_key_field) => ({
  type: actions.BUILDER_FOUR_CHANGE_STAFF,
  transition_key,
  staff_key,
  staff_key_field,
  data
});

export const deleteStaff = (transition_key, staff_key) => ({
  type: actions.BUILDER_FOUR_DELETE_STAFF,
  transition_key,
  staff_key
});

export const deleteStaffElement = (transition_key, staff_key, id) => (dispatch) => {
  if (id) {
    dispatch(changeStaffField(true, transition_key, staff_key, 'isDeleted'));
  } else {
    dispatch(deleteStaff(transition_key, staff_key));
  }
};

export const submitAttachedStaff = (nextUrl) => (dispatch, getState) => {
  const transitionStaffList = getState().builder.four.get('attachedStaff').map((items, index) => {
    return items ? items.map((staff, order) => {
      staff = staff.set('order', order);
      const options = {
        method: staff.get('id') ? staff.get('isDeleted') ? "delete" : "put" : "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Token "+getState().auth.get('token'),
        },
        body: JSON.stringify(staff)
      };
      const url = `${config.apiHost}/attached_staff/` + (staff.get('id') ? `${staff.get('id')}/` : '');

      return fetch(url, options)
      .then(checkJsonResponse)
      .catch(logErrorConsole)
    }) : new Promise();
  });

  Promise.all(transitionStaffList)
  .then(response => {
		history.push(nextUrl);
  })
  .catch(logErrorConsole);
};

export const loadFirstBuilderStep = (json) => ({
  type: actions.BUILDER_ONE_LOAD,
  json
});

export const updateFormBuilder = data => ({
  type: actions.BUILDER_ONE_UPDATE_BUILDER,
  data
});

export const fetchWorkflow = (slug) => (dispatch, getState) => {
  slug = slug || getState().adminDocuments.get('workflow_type').get('slug');
  const options = {
    headers: {
      "Authorization": "Token "+getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/builder/1/${slug}/`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then(json => {
    dispatch(changeWorkflowType(new Map(json['type'])));
    dispatch(loadFirstBuilderStep(json));
    dispatch(updateFormBuilder(json['form_components']));
  })
  .catch(e => console.log(e));
}

export const changeDocumentTypeFilter = (data) => ({
  type: actions.DOCUMENT_CHANGE_TYPE_FILTER,
  data
});
