import config from '../../../config';
import history from '../../../history';
import { Map } from 'immutable';
import actions from '../document';


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
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
			console.log(response.status);
    	return [];
    }
  })
  .then(json => {
    const data = json.form_components;
    const values = data.map(item => item.value || '');
    const packages = json.packages;
    dispatch({
      type: actions.DOCUMENT_LOAD_DEFAULT_VALUE,
      data: values
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_PACKAGES,
      data: packages
    });
    dispatch({
      type: actions.DOCUMENT_LOAD_FORM,
      data
    });

    dispatch(changeDocumentTitle(json.type.title));

		const title_image_option = json.type.image_option;
    dispatch({
      type: actions.DOCUMENT_CHANGE_TITLE_IMAGE_OPTION,
      data: title_image_option
    });

		const workflow_type_id = json.type.id;
		dispatch({
			type: actions.DOCUMENT_CHANGE_WORKFLOW_TYPE_ID,
			data: workflow_type_id
		});
  })
  .catch(e => console.log(e));
};

export const fetchDocumentFormForModule = (slug, moduleKey) => (dispatch) => {
  return fetch(`${config.apiHost}/modulecommunity/community/${slug}/${moduleKey}/`)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log(response.status);
      return null;
    }
  })
  .then(json => {
    if (json && json.slug) {
      dispatch(fetchDocumentForm(json.slug));
    } else {
      // Show message "Not binded module";
      console.log();
    }
  })
  .catch(e => console.log(e));
};

export const changeDocumentFormValue = (data, index) => ({
  type: actions.DOCUMENT_CHANGE_FORM_VALUE,
  data,
  index
});

export const documentFormChoiceAdd = () => ({
  type: actions.DOCUMENT_FORM_CHOICE_ADD,
  data: new Map({
    choice_text: '',
    choice_image: null
  })
});

export const documentFormChoiceRemove = (index) => ({
  type: actions.DOCUMENT_FORM_CHOICE_REMOVE,
  data: index
});

export const documentFormChoiceClean = () => ({
  type: actions.DOCUMENT_FORM_CHOICE_CLEAN
})

export const documentFormChoiceChangeText = (data, index) => ({
  type: actions.DOCUMENT_FORM_CHOICE_CHANGE_TEXT,
  data,
  index
});

export const documentFormChoiceChangeFile = (data, index) => (dispatch) => {
  if (data.files.length < 1){
    return;
  }

  dispatch({
    type: actions.DOCUMENT_FORM_CHOICE_CHANGE_FILE,
    data: data.files[0],
    index
  });
};

export const submitNewDocument = (redirectUrl='', withId=false) => (dispatch, getState) => {
  const formData = new FormData();
  const workflowTypeId = getState().commDocument.get('workflowTypeId');
  const formComponents = getState().commDocument.get('documentForm');
  formData.append('title', getState().commDocument.get('title'))
  formData.append('workflow_type', workflowTypeId);
  if (getState().publicBudget.get('documentTag'))
	  formData.append('workflow_tag', getState().publicBudget.get('documentTag'));
  if (getState().commDocument.get('titleImage'))
    formData.append('title_image', getState().commDocument.get('titleImage'));

  let fileIndex = 0;
  let fileToUploadIndexes = [];
  const form = getState().commDocument.get('documentFormValue').map((item, index) => {
    if (formComponents.get(index).type === 'file') {
      let componentIndex = [];
      for (let i = 0; i < item.length; i++) {
        formData.append(`uploadedFile${fileIndex}`, item[i]);
        componentIndex.push(fileIndex++);
      }
      fileToUploadIndexes.push([index, componentIndex]);
    }
    return {
      form_component: formComponents.get(index).pk,
      value: item,
      workflow_type: workflowTypeId,
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
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then(json => {
    const choices = getState().commDocument.get('choices');
    if (choices.size > 0) {
      const choiceData = new FormData();
      choiceData.append('choiceCount', choices.size);
      choices.map((item, index) => {
        choiceData.append(`choice-${index}_choice_text`, item.get('choice_text'));
        if (item.get('choice_image')) {
          choiceData.append(`choice-${index}_choice_image`, item.get('choice_image'));
        }
      });

      const choiceOptions = {
        method: "post",
        headers: {
          "Authorization": "Token " + getState().auth.get('token'),
        },
        body: choiceData,
      };

      fetch(`${config.apiHost}/votechoices/${json.id}/multiple/`, choiceOptions)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(choiceJson => {
        if (redirectUrl) {
          let url = redirectUrl;
          if (withId) {
            url += json.id;
          }

          history.push(url);
        }
      })
      .catch(e => console.log(e))
    } else {
      if (redirectUrl) {
        let url = redirectUrl;
        if (withId) {
          url += json.id;
        }

        history.push(url);
      }
    }
  })
  .catch(e => console.log(e));
};
