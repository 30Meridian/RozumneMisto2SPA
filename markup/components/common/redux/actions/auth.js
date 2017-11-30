import config from '../../../config';
import history from '../../../history';
import { Map } from 'immutable';
import actions from '../constants';


export const changeSignInLogin = (data) => ({
  type: actions.SIGN_IN_CHANGE_LOGIN,
  data
});

export const changeSignInPassword = (data) => ({
  type: actions.SIGN_IN_CHANGE_PASSWORD,
  data
});

export const changeSignInRemember = (data) => ({
  type: actions.SIGN_IN_CHANGE_REMEMBER,
  data
});

export const signOut = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');

  return {
    type: actions.SIGN_OUT
  };
};

export const signInIsLoading = (data) => ({
  type: actions.SIGN_IN_IS_LOADING,
  data
});

export const signInHasErrored = (data) => ({
  type: actions.SIGN_IN_HAS_ERRORED,
  data
});

export const cleanSignInForm = () => (dispatch) => {
  dispatch(signInIsLoading(false));
  dispatch(signInHasErrored(false));
};

export const signIn = () => (dispatch, getState) => {
  dispatch(signInIsLoading(true));

  const username = getState().auth.get('login');
  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json',
    },
    body: JSON.stringify({
      username,
      password: getState().auth.get('password')
    })
  };

  fetch(`${config.apiHost}/auth/token`, options)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    dispatch({
      type: actions.SIGN_IN,
      data: json.token
    });

    if (getState().auth.get('remember')) {
      localStorage.setItem('token', json.token);
    } else {
      sessionStorage.setItem('token', json.token);
    }

    dispatch(loadUser(true));
    dispatch(signInIsLoading(false));
  })
  .catch((e) => {
    console.log(e);
    dispatch(signInHasErrored(true));
    dispatch(signInIsLoading(false));
  });
};


export const setEmail = (data) => ({
  type: actions.SET_USER_EMAIL,
  data
});

export const setNewPassword = (data) => ({
  type: actions.SET_NEW_PASSWORD,
  data
});

export const confirmNewPassword = (data) => ({
  type: actions.CONFIRM_NEW_PASSWORD,
  data
});

export const submitNewPassword = (key) => (dispatch, getState) => {
  const password1 = getState().auth.get('newPassword');
  const password2 = getState().auth.get('newPasswordConfirm');
  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json',
    },
    body: JSON.stringify({
      password1,
      password2,
      key
    })
  }
  fetch(`${config.apiHost}/user-utils/reset-password/new/`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error');
    }
  })
  .then((json) => {
    if (json.password1) {
      dispatch({
        type: actions.SET_PASSWORD_ERROR1,
        data: json.password1[0]
      });
    }
    if (json.password2) {
      dispatch({
        type: actions.SET_PASSWORD_ERROR2,
        data: json.password2[0]
      })
    }
    if (!json.password1 && !json.password2) {
      dispatch({
        type: actions.SET_NO_ERRORS,
        data: true
      });
      setTimeout(() => history.push('/sign-in'), 4000);
    }
  })
};


export const resetPassword = () => (dispatch, getState) => {
  const email = getState().auth.get('email');
  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json',
    },
    body: JSON.stringify({
      email
    })
  }
  fetch(`${config.apiHost}/user-utils/reset-password/`, options)
  .then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actions.SET_EMAIL_NO_ERROR,
        data: true
      });
      return response.json();
    } else {
      console.log('error');
    }
    if (response.status === 400) {
      dispatch({
        type: actions.SET_EMAIL_ERROR,
        data: true
      })
    }
  })
  .then(json => {
  })
  .catch(e => console.log(e));
};

export const checkToken = () => (dispatch, getState) => {
  const token = getState().auth.get('token');
  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json',
    },
    body: JSON.stringify({
      token
    })
  }
  fetch(`${config.apiHost}/user-utils/reset-password/check-token/`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log('error')
    }
  })
  .then((json) => {
    const data = json.is_valid;
    dispatch({
      type: actions.SET_IS_VALID_TOKEN,
      data
    })
  })
  .catch(e => console.log(e));
};

export const signInByTemporaryCode = (code) => (dispatch, getState) => {
  const options = {
    method: 'post',
    headers: {
      "Content-type": 'application/json',
    },
    body: JSON.stringify({
      code
    })
  }
  fetch(`${config.host}/auth/bank_id/token?code=${code}`, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      // Error
    }
  })
  .then(json => {
    localStorage.setItem('token', json.token);

    dispatch({
      type: actions.SIGN_IN,
      data: json.token
    });

    dispatch(loadUser(true));
  })
  .catch(e => console.log(e));
};


export const userIsLoading = (data) => ({
  type: actions.USER_IS_LOADING,
  data
});

export const loadUser = (withRedirect=false) => (dispatch, getState) => {
  dispatch(userIsLoading(true));
  if (!getState().auth.get('token')) {
    return;
  }

  const options = {
    headers: {
      "Authorization": "Token " + getState().auth.get('token'),
    }
  };

  fetch(`${config.apiHost}/user-utils/current/`, options)
  .then((response) => {
    dispatch(userIsLoading(false));

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((json) => {
    if ("error" in json) {
      dispatch(signOut());
    } else {
      const data = new Map(json);
      dispatch({
        type: actions.LOAD_USER,
        data
      });

      let adminUrl = window.location.href.indexOf("/admin") !== -1;
      if (json['community_list'].length === 0 && !(adminUrl && json['is_superuser']) || !json['is_bank_id_auth']){
        history.push('/sign-up');
      } else if (withRedirect) {
        if (getState().system.get('standaloneHostEnable')) {
          history.push("/");
        } else {
          history.push(`/${json['community_list'][0]['slug']}`);
        }
      }
    }
  })
  .catch((e) => {
    console.log(e);
    dispatch(signOut());
  });
};
