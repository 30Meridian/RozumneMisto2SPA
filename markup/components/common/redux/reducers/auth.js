import { Map } from 'immutable';
import actions from '../constants';


const defaultState = () => new Map({
  authIsLoading: false,
  authHasErrored: false,
  login: '',
  password: '',
  remember: true,
  token: sessionStorage.getItem('token') || localStorage.getItem('token') || undefined,
  user: undefined,
  userIsLoading: false,
  email: '',
  isValidToken: undefined,
  newPassword: '',
  newPasswordConfirm: '',
  emailError: false,
  emailNoError: false,
  passwordError1: '',
  passwordError2: '',
  noErrors: false,
  emailModal: false
});

export default (state=defaultState(), action) => {
  switch (action.type) {
    case actions.SIGN_IN_CHANGE_LOGIN:
      return state.set('login', action.data);
    case actions.SIGN_IN_CHANGE_PASSWORD:
      return state.set('password', action.data);
    case actions.SIGN_IN_CHANGE_REMEMBER:
      return state.set('remember', action.data);
    case actions.SIGN_IN_IS_LOADING:
      return state.set('authIsLoading', action.data);
    case actions.SIGN_IN_HAS_ERRORED:
      return state.set('authHasErrored', action.data);
    case actions.SIGN_IN:
      return state.set('token', action.data).set('password', '');
    case actions.SIGN_OUT:
      return state.set('token', undefined);
    case actions.LOAD_USER:
      return state.set('user', action.data);
    case actions.USER_IS_LOADING:
      return state.set('userIsLoading', action.data);
    case actions.SET_USER_EMAIL:
      return state.set('email', action.data);
    case actions.SET_IS_VALID_TOKEN:
      return state.set('isValidToken', action.data);
    case actions.SET_NEW_PASSWORD:
      return state.set('newPassword', action.data);
    case actions.CONFIRM_NEW_PASSWORD:
      return state.set('newPasswordConfirm', action.data);
    case actions.SET_EMAIL_ERROR:
      return state.set('emailError', action.data);
    case actions.SET_PASSWORD_ERROR1:
      return state.set('passwordError1', action.data);
    case actions.SET_PASSWORD_ERROR2:
      return state.set('passwordError2', action.data);
    case actions.SET_NO_ERRORS:
      return state.set('noErrors', action.data);
    case actions.SET_EMAIL_MODAL:
      return state.set('emailModal', action.data);
    case actions.SET_EMAIL_NO_ERROR:
      return state.set('emailNoError', action.data);
    default:
      return state;
  }
};
