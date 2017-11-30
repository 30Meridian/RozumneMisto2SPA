import config from '../../../../config';
import history from '../../../../history';
import { Map } from 'immutable';
import actions from '../../constants';


export const addPackage = () => ({
  type: actions.BUILDER_FIVE_ADD_PACKAGE,
  data: new Map({
    'package': undefined,
    'state': undefined,
    'transaction': undefined,
    'config': undefined
  })
});

export const loadPackages = () => (dispatch) => {
  fetch(`${config.apiHost}/packages/`)
  .then(response => {
    if (response.status == 200)
      return response.json()
    else
      console.log(response.status);
  })
  .then(json => {
    const data = json['results'].map(item => new Map(item));
    dispatch({
      type: actions.BUILDER_FIVE_LOAD_PACKAGES,
      data
    });
  })
  .catch(e => console.log(e));
};

export const changeAttachedPackagePackage = (data, key) => ({
  type: actions.BUILDER_FIVE_CHANGE_PACKAGE,
  data,
  key
});

export const changeAttachedPackageState = (data, key) => ({
  type: actions.BUILDER_FIVE_CHANGE_STATE,
  data,
  key
});

export const changeAttachedPackageTransition = (data, key) => ({
  type: actions.BUILDER_FIVE_CHANGE_TRANSITION,
  data,
  key
});

export const changeAttachedPackageConfig = (data, key) => ({
  type: actions.BUILDER_FIVE_CHANGE_CONFIG,
  data,
  key
});

export const submitAttachedPackages = () => (dispatch, getState) => {
  const workflow_type = getState().adminDocuments.get('workflow_type').get('id');
  const data = getState().builder.five.get('attachedPackages').map(item => item.set('workflow_type', workflow_type));
  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Token " + getState().auth.get('token'),
    },
    body: JSON.stringify(data)
  };
  fetch(`${config.apiHost}/attachedpackages/multiple/`, options)
  .then(response => {
    if (response.status == 200)
      return response.json()
    else
      console.log(response.status);
  })
  .catch(e => {
    console.log(e);
  })
};
