import config from '../../../config';
import history from '../../../history';
import { List, Map, fromJS } from 'immutable';
import actions from '../constants';


export const changeDocumentTitle = (data) => ({
  type: actions.DOCUMENT_CHANGE_TITLE,
  data
});

export const changeDocumentImage = (data) => (dispatch) => {
  const file = data.files[0];

  dispatch({
    type: actions.DOCUMENT_CHANGE_IMAGE,
    data: file,
  });
};

export const changeDocumentFormValue = (data, index) => ({
  type: actions.DOCUMENT_CHANGE_FORM_VALUE,
  data,
  index
});

export const fetchModuleWorkflowType = (module_key, getState, communitySlug='') => {
  const community_slug = communitySlug || getState().system.get('community').get('slug');
  return fetch(`${config.apiHost}/modulecommunity/community/${community_slug}/${module_key}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error');
    }
  });
};

export const loadWorkflowType = (module_key, slug) => (dispatch, getState) => {
  fetch(`${config.apiHost}/modulecommunity/community/${slug}/${module_key}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error');
    }
  })
  .then((json) => {
    const data = json.slug;
    dispatch({
      type: actions.LOAD_WORKFLOW_TYPE,
      data
    })
  })
  .catch(e => console.log(e));
};

export const fetchDocumentForm = (module_key) => (dispatch, getState) => {
  fetchModuleWorkflowType(module_key, getState)
  .then((json) => {
    const slug = json.slug;
    if (slug) {
      fetch(`${config.apiHost}/builder/1/${slug}/`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          // Error
        }
      })
      .then((json) => {
        const data = json.form_components;
        const workflow_type = json.type;
        dispatch({
          type: actions.DOWNLOAD_FORM,
          data
        });
        dispatch({
          type: actions.CHANGE_WORKFLOW_TYPE,
          data: new Map(workflow_type)
        })
      })
      .catch((e) => {
        // Error
      });
    }
  });
};

export const fetchDocumentFormBySlug = (slug) => (dispatch, getState) => {
    fetch(`${config.apiHost}/builder/1/${slug}/`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log(response.status);
      }
    })
    .then(json => {
      const data = json.form_components;
      const workflow_type = json.type;
      dispatch(changeDocumentTitle(workflow_type.title));
      dispatch({
        type: actions.DOWNLOAD_FORM,
        data
      });
      dispatch({
        type: actions.CHANGE_WORKFLOW_TYPE,
        data: new Map(workflow_type)
      })
    })
    .catch(e => console.log(e));
};

export const submitNewDocument = (redirect_path) => (dispatch, getState) => {
  const formData = new FormData();
  const workflow_type = getState().documents.get('workflow_type').get('id');
  const form_components = getState().documents.get('documentForm');
  formData.append('title', getState().documents.get('title'))
  formData.append('workflow_type', workflow_type);
  if (getState().documents.get('image'))
    formData.append('title_image', getState().documents.get('image'));
  const form = getState().documents.get('documentFormValue').map((item, index) => ({
    value: item,
    form_component: form_components[index].pk,
    workflow_type,
  }));
  formData.append('form', JSON.stringify(form));
  const options = {
    method: "post",
    headers: {
      // "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: formData,
    // JSON.stringify({
    //   document,
    //   form,
    // })
  };
  fetch(`${config.apiHost}/documents/`, options)
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      console.log('error');
    }
  })
  .then((json) => {
    history.push(redirect_path);
  })
  .catch(e => console.log(e))
};

  export const fetchDocuments = (module_key, getState, state='', state_name='', limit, offset, slug='') => {
  return fetchModuleWorkflowType(module_key, getState, slug)
  .then((json) => {
    const slug = json.slug;
    if (slug) {
      return fetch(`${config.apiHost}/documents/?workflow_type=${slug}&state=${state}&visible=True&limit=${limit}&offset=${offset}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return {
            "error": "Модуль не існує"
          };
        }
      })
      .catch(e => console.log(e));
    } else {
      return {
        "error": "Модуль не існує"
      };
    }
  });
};

export const petitionsIsLoading = (data) => ({
  type: actions.PETITIONS_IS_LOADING,
  data
});

export const newsIsLoading = (data) => ({
  type: actions.NEWS_IS_LOADING,
  data
});

export const defectsIsLoading = (data) => ({
  type: actions.DEFECTS_IS_LOADING,
  data
});

export const pollsIsLoading = (data) => ({
  type: actions.POLLS_IS_LOADING,
  data
});

export const fetchDocumentsPetitions = (module_key, getState, state, limit, offset, slug='') => {
  return fetchModuleWorkflowType(module_key, getState, slug)
  .then((json) => {
    const slug = json.slug;
    if (slug) {
      return fetch(`${config.apiHost}/documents/?workflow_type=${slug}&state=${state}&visible=True&count_votes&limit=${limit}&offset=${offset}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('eror')
        }
      })
      .catch((e) => {
        //Error
      });
    } else {
      return {
        "error": "Модуля не існує"
      };
    }
  });
};

export const fetchMyDocuments = (module_key, getState, limit=5, offset=0) => {
  return fetchModuleWorkflowType(module_key, getState)
  .then((json) => {
    const slug = json.slug;
    if (slug) {
      const options = {
        headers: {
          "Authorization": "Token " + getState().auth.get('token'),
        }
      };
      return fetch(`${config.apiHost}/documents/mydocuments/?workflow_type=${slug}&limit=${limit}&offset=${offset}`, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('eror')
        }
      })
      .catch((e) => {
        //Error
      });
    }
  });
};

export const fetchMyDocumentsPetitions = (module_key, getState, limit, offset) => {
  return fetchModuleWorkflowType(module_key, getState)
  .then((json) => {
    const slug = json.slug;
    if (slug) {
      const options = {
        headers: {
          "Authorization": "Token " + getState().auth.get('token'),
        }
      };
      return fetch(`${config.apiHost}/documents/mydocuments/?workflow_type=${slug}&count_votes&limit=${limit}&offset=${offset}`, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('eror')
        }
      })
      .catch((e) => {
        //Error
      });
    } else {
      return {
        "error": "Модуль не підключений"
      };
    }
  });
};

export const fetchNews = (state='', state_name='', limit=5, offset=0, slug='') => (dispatch, getState) => {
  dispatch(newsIsLoading(true));
  fetchDocuments('news', getState, state, state_name, limit, offset, slug)
  .then((json) => {
    dispatch(newsIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_NEWS,
      data
    });
  });
};

export const fetchPetitionsVotes = (id, limit, offset) => (dispatch) => {

  fetch(`${config.apiHost}/votes/?workflow_object=${id}&limit=${limit}&offset=${offset}&blocked=false`)
  .then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log('error')
    };
  })
  .then((json) => {
    const data = json;
    dispatch({
      type: actions.LOAD_PETITIONS_COUNT,
      data
    });
  });
};

export const fetchDefects = (state='', state_name='', limit=25, offset=0, slug='') => (dispatch, getState) => {
  dispatch(defectsIsLoading(true));
  fetchDocuments('defects', getState, state, state_name, limit, offset, slug)
  .then((json) => {
    dispatch(defectsIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_DEFECTS,
      data
    });
  });
};

export const fetchMyDefects = (state='', state_name='', limit=5, offset=0) => (dispatch, getState) => {
  dispatch(defectsIsLoading(true));
  fetchMyDocuments('defects', getState, state, state_name, limit)
  .then((json) => {
    dispatch(defectsIsLoading(false));
    const data = json;
    dispatch({
     type: actions.LOAD_DEFECTS,
     data
    });
  });
};

export const fetchPolls = (state='', state_name='', limit=25, offset=0, slug='') => (dispatch, getState) => {
  dispatch(pollsIsLoading(true));
  fetchDocuments('polls', getState, state, state_name, limit, offset, slug)
  .then((json) => {
    dispatch(pollsIsLoading(false))
    const data = json;
    dispatch({
      type: actions.LOAD_POLLS,
      data
    });
  });
};

export const fetchPetitions = (state='', limit=25, offset=0, slug='') => (dispatch, getState) => {
  dispatch(petitionsIsLoading(true));
  fetchDocumentsPetitions('petitions', getState, state, limit, offset, slug)
  .then((json) => {
    dispatch(petitionsIsLoading(false));
    const data = json;
    dispatch({
      type: actions.LOAD_PETITIONS,
      data
    });
  });
};

export const fetchMyPetitions = (limit=5, offset=0) => (dispatch, getState) => {
  dispatch(petitionsIsLoading(true));
  fetchMyDocumentsPetitions('petitions', getState, limit, offset)
  .then((json) => {
    dispatch(petitionsIsLoading(false));
    const data = json;
    dispatch({
     type: actions.LOAD_PETITIONS,
     data
    });
  });
};

export const documentIsLoading = (data) => ({
  type: actions.DOCUMENT_IS_LOADING,
  data
});

export const fetchDocument = (id) => (dispatch, getState) => {
  dispatch(documentIsLoading(true));
  const options = {
    // headers: {
    //    "Authorization": "Token "+getState().auth.get('token'),
    // }
  };
  fetch(`${config.apiHost}/documents/${id}/`, options)
  .then((response) => {``
    if (response.status === 200) {
      return response.json();
    } else {
      console.log(response.json());
    }
  })
  .then((json) => {
    dispatch(documentIsLoading(false));
    if ('packages' in json){
      const packages = json['packages'].map(item => item['package__slug']);
      dispatch({
        type: actions.LOAD_DOCUMENT_PACKAGES,
        data: packages
      });
    }
    const data = new Map(json);
    dispatch({
      type: actions.LOAD_DOCUMENT,
      data
    });
    dispatch(fetchDocumentValue(id));
    dispatch(fetchDocumentProceedings(id));
  })
  .catch((e) => {
    console.log(e);
  })
};

export const fetchDocumentValue = (id) => (dispatch, getState) => {
  const options = {
    headers: {
      //  "Authorization": "Token " + getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/formcomponentvalue/document/${id}/`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return {};
    }
  })
  .then((json) => {
    const data = json.map((item) => new Map(item));
    dispatch({
      type: actions.LOAD_DOCUMENT_FORM_VALUES,
      data
    })
  })
  .catch((e) => {
    console.log(e);
  });
};

export const cleanFormValues = () => ({
  type: actions.LOAD_DOCUMENT_FORM_VALUES,
  data: []
});

export const fetchDocumentProceedings = (id) => (dispatch, getState) => {
  fetch(`${config.apiHost}/proceeding/completed/${id}/`)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    const data = json.map((item) => new Map(item));
    dispatch({
      type: actions.LOAD_DOCUMENT_COMPLETED_PROCEEDING,
      data
    })
  })
  .catch((e) => {
    console.log(e);
  });
};

export const loadPackageData = (id, package_name) => (dispatch, getState) => {
  const options = {
    headers: {
       "Authorization": "Token " + getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/handlers/${package_name}/${id}/`, options)
  .then(response => {
    if (response.status == 200)
      return response.json();
    else
      console.log(response.status);
  })
  .then(json => {
    const data = new Map(json);
    dispatch({
      type: actions.LOAD_DOCUMENT_PACKAGE_DATA,
      data,
      key: package_name,
    });
  })
  .catch(e => {
    console.log(e);
  })
};

export const loadPackageVote = (id, stateOption=false) => (dispatch, getState) => {
  fetch(`${config.apiHost}/votechoices/current/${id}/?${stateOption?'all-state=true':''}`)
  .then(response => {
    if (!response.ok){
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    const data = json.map(item => new Map(item));
    dispatch({
      type: actions.LOAD_DOCUMENT_PACKAGE_VOTES,
      data,
    });
  })
  .catch(e => console.log(e))
}

export const sendPackageData = (id, package_name, data) => (dispatch, getState) => {
  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: JSON.stringify(data)
  };
  fetch(`${config.apiHost}/handlers/${package_name}/${id}/`, options)
  .then(response => {
    if (response.status == 200)
      return response.json();
    else
      console.log(response.status);
  })
  .then(json => {
     dispatch(loadPackageData(id, package_name));
     dispatch(fetchDocument(id));
     dispatch(fetchPetitionsVotes(id));
 		 dispatch(fetchVoteSummary(id));
  })
  .catch(e => console.log(e));
};


export const fetchMyDocumentsCabinet = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/documents/mydocuments/?limit=1`, options)
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
      type: actions.LOAD_MY_CABINET_DOCUMENTS,
      data
    });
  });
};

export const fetchDoneDocumentsCabinet = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/documents/mydocuments/?condition=Dn&limit=1`, options)
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
      type: actions.LOAD_DONE_CABINET_DOCUMENTS,
      data
    });
  });
};

export const fetchActiveDocumentsCabinet = () => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
  };
  fetch(`${config.apiHost}/documents/mydocuments/?condition=A&limit=1`, options)
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
      type: actions.LOAD_ACTIVE_CABINET_DOCUMENTS,
      data
    });
  });
};

export const fetchVoteSummary = (id) => (dispatch, getState) => {
  fetch(`${config.apiHost}/votes/summary/${id}/?blocked=false`)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    dispatch({
      type: actions.LOAD_VOTE_SUMMARY,
      data: fromJS(json)
    });
  })
  .catch(e => console.log(e));
}
