import axios from 'axios'
import errorListTypeChecking from '../logicElements/errorListTypeChecking'
const SAVE_AUTHENTICATED_USER = 'SAVE_AUTHENTICATED_USER'
const AUTHENTICATION_LOADING = 'AUTHENTICATION_LOADING'
const SET_AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
const DELETE_AUTHENTICATION_ERROR = 'DELETE_AUTHENTICATION_ERROR'
const CLEAR_AUTHENTICATION = 'CLEAR_AUTHENTICATION'
const SET_AUTHENTICATION_REQUEST_SUCCESS = 'SET_AUTHENTICATION_REQUEST_SUCCESS'
// action creators
export function saveAuthenticatedUser(payload) {
  return {
    type: SAVE_AUTHENTICATED_USER,
    payload
  }
}

export function authenticationLoading() {
  return {
    type: AUTHENTICATION_LOADING
  }
}

export function setAuthenticationError(payload) {
  return {
    type: SET_AUTHENTICATION_ERROR,
    payload
  }
}

export function setAuthenticationRequestSuccess() {
  return {
    type: SET_AUTHENTICATION_REQUEST_SUCCESS
  }
}

export function deleteAuthenticationError() {
  return {
    type: DELETE_AUTHENTICATION_ERROR
  }
}

export function clearAuthentication() {
  return {
    type: CLEAR_AUTHENTICATION
  }
}

// reducer

const initialState = {
    logIn: false,
    errorList: null,
    username: null,
    success: false,
    loading: false
}

export default  function authentication(state = initialState, action) {
  switch (action.type) {
    case SAVE_AUTHENTICATED_USER:
      return { ...state, username: action.payload, logIn: true }
    case AUTHENTICATION_LOADING:
      return { ...state, loading: !state.loading }
    case SET_AUTHENTICATION_ERROR:
      return { ...state, errorList: action.payload }
    case DELETE_AUTHENTICATION_ERROR:
      return { ...state, errorList: null }
    case SET_AUTHENTICATION_REQUEST_SUCCESS:
      return { ...state, success: true }
    case CLEAR_AUTHENTICATION:
      return initialState
    default:
      return state
  }
}

function updateAuthenticationDatesImplementation(payload, dispatch) {
  localStorage.setItem('token', payload.access_token)
  localStorage.setItem('username', payload.username)
  dispatch(saveAuthenticatedUser(payload.username));
  axios.defaults.headers.common['Authorization'] ="Bearer " + payload.access_token;
}

//// thunk

export function userLoginRequest(user) {
  return function(dispatch) {
    dispatch(deleteAuthenticationError());
    dispatch(authenticationLoading());
    axios
      .post(`/authentication/login`, user)
      .then(response => {
        updateAuthenticationDatesImplementation(response.data, dispatch);
        dispatch(setAuthenticationRequestSuccess());
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setAuthenticationError(error.response.data));
          else
            dispatch(setAuthenticationError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setAuthenticationError(["Error with requesting."]));
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(authenticationLoading())
      });
  }
}

export function userRegistrationRequest(user) {
  return function(dispatch) {
    dispatch(deleteAuthenticationError());
    dispatch(authenticationLoading());
    axios
      .post(`/authentication/registration`, user)
      .then(response => {
        dispatch(setAuthenticationRequestSuccess())
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setAuthenticationError(error.response.data));
          else
            dispatch(setAuthenticationError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setAuthenticationError(["Error with requesting."]));
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(authenticationLoading())
      });
  }
}

export function checkAuthentication() {
  return function(dispatch) {
    if(localStorage.getItem('token'))
    dispatch(saveAuthenticatedUser(localStorage.getItem('username')));
    axios.defaults.headers.common['Authorization'] ="Bearer " + localStorage.getItem('token');
  }
}

export function updateAuthenticationDates(payload) {
  return function(dispatch) {
    updateAuthenticationDatesImplementation(payload, dispatch)
  }
}

export function logOut() {
  return function(dispatch) {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    dispatch(clearAuthentication());
    axios.defaults.headers.common['Authorization'] = null;
  }
}