import config from '../../../config';
import history from '../../../history';
import { Map, fromJS } from 'immutable';
import actions from '../constants';
import { generateAuthorizationOption } from 'components/utils/actions';


export const changeDocumentTitle = (data) => ({
  type: actions.DOCUMENT_CHANGE_TITLE,
  data
});

export const changeDocumentTitleImage = (data) => (dispatch) => {
  if (data.files.length < 1){
    return;
  }

  dispatch({
    type: actions.DOCUMENT_CHANGE_TITLE_IMAGE,
    data: data.files[0]
  });
};

export const fetchDocumentForm = (slug) => (dispatch) => {
  fetch(`${config.apiHost}/builder/1/${slug}/`)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    const data = json.form_components;
    const workflow_type = json.type;
    dispatch({
      type: actions.GENERATE_FORM,
      data
    });
    dispatch({
      type: actions.CHANGE_WORKFLOW_TYPE,
      data: new Map(workflow_type)
    });
  })
  .catch((e) => {
    console.log(e);
  });
};

export const changeDocumentFormValue = (data, index) => ({
  type: actions.DOCUMENT_CHANGE_FORM_VALUE,
  data,
  index
});


export const submitNewDocument = () => (dispatch, getState) => {
  const formData = new FormData();
  const workflow_type = getState().adminDocuments.get('workflow_type').get('id');
  const form_components = getState().adminDocuments.get('documentForm');
  formData.append('title', getState().adminDocuments.get('title'))
  formData.append('workflow_type', workflow_type);
  if (getState().adminDocuments.get('title_image'))
    formData.append('title_image', getState().adminDocuments.get('title_image'));
  let fileIndex = 0;
  let fileToUploadIndexes = [];
  const form = getState().adminDocuments.get('documentFormValue').map((item, index) => {
    if (form_components[index].type === 'file') {
      let componentIndex = [];
      for (let i = 0; i < item.length; i++) {
        formData.append("uploadedFile"+fileIndex, item[i]);
        componentIndex.push(fileIndex++);
      }
      fileToUploadIndexes.push([index, componentIndex]);
    }
    return {
      value: item,
      form_component: form_components[index].pk,
      workflow_type,
    };
  });
  formData.append('form', JSON.stringify(form));
  formData.append('fileIndex', JSON.stringify(fileToUploadIndexes));
  const options = {
    method: "post",
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: formData,
  };
  fetch(`${config.apiHost}/documents/`, options)
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      console.log(response.status);
    }
  })
  .then((json) => {
    if (json.id)
      history.push(`/admin/documents/document/${json.id}/`);
  })
  .catch(() => {
    // Work with error
  })
};

export const loadDocumentCard = (data) => ({
  type: actions.DOCUMENT_LOAD_DOCUMENT_CARD,
  data
});

export const documentIsLoading = (data) => ({
  type: actions.DOCUMENT_IS_LOADING,
  data
});

export const fetchDocument = (id) => (dispatch, getState) => {
  dispatch(documentIsLoading(true));
  const options = {
    headers: {
       "Authorization": "Token "+getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/documents/${id}/`, options)
  .then((response) => {``
    if (response.status === 200) {
      return response.json();
    } else {
      return {};
    }
  })
  .then((json) => {
    dispatch(documentIsLoading(false));
    dispatch(loadDocumentCard(new Map(json)));
    dispatch(changeDocumentTitle(json.title));
    dispatch({
      type: actions.DOCUMENT_CHANGE_TITLE_IMAGE,
      data: json.title_image
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_ID,
      data: json.id
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_CREATED_BY,
      data: json.created_by_name
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_STATE,
      data: json.state_field_name
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_WORKFLOW_TYPE_ID,
      data: json.workflow_type
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_DATE,
      data: json.date_created
    });
    dispatch(fetchDocumentValue(id));
    dispatch(fetchDocumentProceedings(id));
    dispatch(fetchAvailableProceedings(id));
    dispatch(fetchAttachedFile(id));
  })
  .catch(() => {
    // Work with error
  })
};

export const fetchDocumentValue = (id) => (dispatch, getState) => {
  const options = {
    headers: {
       "Authorization": "Token " +getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/formcomponentvalue/document/${id}/?including-technical`, options)
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
      type: actions.DOCUMENT_LOAD_FORM_VALUES,
      data
    })
  })
  .catch(() => {
    // Work with error
  })
};

export const fetchDocumentProceedings = (id) => (dispatch, getState) => {
  const options = {
    headers: {
       "Authorization": "Token "+getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/proceeding/completed/${id}/`, options)
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
      type: actions.DOCUMENT_LOAD_COMPLETED_PROCEEDING,
      data
    })
  })
  .catch(() => {
    // Work with error
  })
}

export const fetchAvailableProceedings = (id) => (dispatch, getState) => {
  const options = {
    headers: {
       "Authorization": "Token "+getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/proceeding/available/${id}/`, options)
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
      type: actions.DOCUMENT_LOAD_AVAILABLE_PROCEEDING,
      data
    })
  })
  .catch(() => {
    // Work with error
  })
};

export const documentProceed = (id, next_state) => (dispatch, getState) => {
  const formData = new FormData();
  let department = getState().adminDocuments.get('contractDepartment');
  if (department) {
    formData.append('department', department);
  }
  formData.append('message', getState().adminDocuments.get('message'));
  getState().adminDocuments.get('newFiles').map((item, index) => formData.append('file'+index, item));
  const options = {
    method: "post",
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: formData
  };

  fetch(`${config.apiHost}/proceeding/${id}/proceed/${next_state}/`, options)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return ;
  })
  .then(() => {
      dispatch(fetchDocument(id));
      dispatch(changeDocumentProceedMessage(''));
      dispatch(changeDocumentContractDepartment(null));
      dispatch(cleanDocumentFileList());
  })
  .catch(e => {
    console.log(e);
  });
}

export const changeDocumentProceedMessage = (data) => ({
  type: actions.DOCUMENT_CHANGE_PROCEED_MESSAGE,
  data
});

export const cleanDocumentFileList = () => ({
  type: actions.DOCUMENT_CLEAN_FILE_LIST
});

export const changeSearchValue = (data) => ({
  type: actions.CHANGE_SEARCH_VALUE,
  data
});

export const searchDocumentsIsLoading = (data) => ({
  type: actions.SEARCH_DOCUMENTS_IS_LOADING,
  data
});

export const searchDocuments = (limit=25, offset=0, page) => (dispatch, getState) => {
  dispatch(searchDocumentsIsLoading(true));
  const query = getState().adminDocuments.get('query');
  const options = {
    method:"post",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token')
    },
    body: JSON.stringify({
      query
    })
  };
  fetch(`${config.apiHost}/search/admin/?limit=${limit}&offset=${offset}`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    } else {
      console.log("Response status" + response.status);
    }
  })
  .then(json => {
    dispatch(searchDocumentsIsLoading(false));
    const data = json;
    if (page == undefined) {
      history.push(`/admin/documents/search-documents`);
    } else {
      history.push(`/admin/documents/search-documents/${page}`);
    }
    dispatch({
      type: actions.LOAD_SEARCHED_DOCUMENTS,
      data
    });
  })
  .catch(e => console.log(e));
};

export const fetchContractDepartments = (id) => (dispatch, getState) => {
  const options = {
    headers: {
       "Authorization": "Token " + getState().auth.get('token'),
    }
  };
  fetch(`${config.apiHost}/department/workflow/${id}/`, options)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return [];
    }
  })
  .then(json => {
    const data = json.map((item) => new Map(item));
    dispatch({
      type: actions.DOCUMENT_LOAD_CONTRACT_DEPARTMENTS,
      data
    });
  })
  .catch(e => console.log(e))
};

export const changeDocumentContractDepartment = (data) => ({
  type: actions.DOCUMENT_CHANGE_CONTRACT_DEPARTMENT,
  data
});

const attachFileToDocument = (data, documentId) => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('file', data.files[0]);
  formData.append('document', documentId);
  const options = {
    method: "post",
    headers: {
       "Authorization": "Token " + getState().auth.get('token'),
    },
    body: formData
  };
  fetch(`${config.apiHost}/documentmedia/`, options)
  .then(response => {
    if (response.status === 201) {
      return response.json();
    } else {
      console.log(response.status);
    }
  })
  .catch(e => console.log(e));
};

export const attachFileToList = data => dispatch => {
  if (data.files.length < 1) {
    return;
  }
  let fileList = [];
  for (let i=0; i<data.files.length; i++) {
    fileList[i] = data.files[i];
  }
  dispatch({
    type: actions.DOCUMENT_ADD_FILE_LIST,
    data: fileList
  });
};

export const removeFileFromList = (data) => ({
  type: actions.DOCUMENT_REMOVE_FILE_FROM_LIST,
  data
});


export const fetchAttachedFile = (documentId) => (dispatch, getState) => {
  fetch(`${config.apiHost}/documents/${documentId}/documentmedia/`, generateAuthorizationOption(getState))
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log(response.status);
      return [];
    }
  })
  .then(json => {
    const data = json.map(item => new Map(item));
    dispatch({
      type: actions.DOCUMENT_LOAD_ATTACHED_FILES,
      data
    });
  })
  .catch(e => console.log(e));
};

export const destroyDocument = (id) => (dispatch, getState) => {
  const options = {
    method: "delete",
    headers: {
       "Authorization": "Token " + getState().auth.get('token'),
    }
  };

  fetch(`${config.apiHost}/documents/${id}/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return null;
  })
  .then(()   => {
    history.goBack();
  })
  .catch(e => {
    console.log(e);
  })
}

export const fetchPrintTemplate = (id, window) => (dispatch) => {
  fetch(`${config.apiHost}/printedform/document/${id}/`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error')
    }
  })
  .then((json) => {
    const data = json.template;
    dispatch({
     type: actions.DOCUMENT_LOAD_PRINT_TEMPLATE,
     data
    });

    let win = window;
    self.focus();
    win.document.open();
    win.document.write(data);
    win.document.close();
    win.print();
    win.close();
  })
  .catch(e => {
    console.log(e);
  });
}

export const changeDocumentVoteList = (data) => ({
  type: actions.DOCUMENT_CHANGE_VOTE_LIST,
  data
});

export const loadDocumentVoteList = (id, limit=100, offset=0, withoutBlocked=false)  => (dispatch, getState) => {
  const options = {
    headers: {
       "Authorization": "Token " + getState().auth.get('token'),
    }
  }
  let url = `${config.apiHost}/votes/?workflow_object=${id}&limit=${limit}&offset=${offset}`;
  if (withoutBlocked) {
    url+= `&blocked=false`;
  }
  fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    dispatch(changeDocumentVoteList(fromJS(json)));
  })
  .catch(e => console.log(e));
}

export const patchVoteInstance = (vote_id, body, document_id='') => (dispatch, getState) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token')
    },
    body: JSON.stringify(body)
  }
  fetch(`${config.apiHost}/votes/${vote_id}/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    if (document_id) {
      dispatch(loadDocumentVoteList(document_id));
    }
  })
  .catch(e => console.log(e));
}

export const changeOfflineVote = (data) => ({
  type: actions.DOCUMENT_CHANGE_OFFLINE_VOTE,
  data
});

export const loadDocumentOfflineVote = (documentId) => (dispatch, getState) => {
  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token')
    }
  }
  fetch(`${config.apiHost}/budgetofflinevote/fordocument/${documentId}/`, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    dispatch(changeOfflineVote(fromJS(json)));
  })
  .catch(e => console.log(e));
}

export const changeOfflineVoteField = (key, data) => ({
    type: actions.DOCUMENT_CHANGE_OFFLINE_VOTE_FIELD,
    key,
    data
});

export const submitDocumentOfflineVote = (documentId) => (dispatch, getState) => {
  let body = getState().adminDocuments.get('offlineVote');
  body = body.set('document', documentId);

  let url = `${config.apiHost}/budgetofflinevote/`;
  let method = "POST";
  if (body.get('id')) {
    url += `${body.get('id')}/`;
    method = "PUT";
  }

  const options = {
    method,
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token')
    },
    body: JSON.stringify(body)
  }
  fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    dispatch(changeOfflineVote(fromJS(json)));
  })
  .catch(e => console.log(e));
};
