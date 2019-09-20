import  axios from 'axios';
import errorListTypeChecking from '../logicElements/errorListTypeChecking'
import { updateAuthenticationDates } from './authentication'
const SET_USERPROFILE = 'SET_USERPROFILE'
const CLEAR_USERPROFILE = 'CLEAR_USERPROFILE'
const USERPROFILE_LOADING = 'USERPROFILE_LOADING'
const SET_USERPROFILE_ERROR = 'SET_USERPROFILE_ERROR'
const DELETE_USERPROFILE_ERROR = 'DELETE_USERPROFILE_ERROR'
const SET_USERPROFILE_SUCCESS = 'SET_USERPROFILE_SUCCESS'


// action creators

export function updateUserProfileExecutingSuccess() {
  return {
    type: SET_USERPROFILE_SUCCESS
  }
}

export function setUserProfile(payload) {
    return {
      type: SET_USERPROFILE,
      payload
    }
}

export function clearUserProfile() {
  return {
    type: CLEAR_USERPROFILE
  }
}

export function userProfileLoading() {
  return {
    type: USERPROFILE_LOADING
  }
}

export function setUserProfileError(payload) {
  console.log(payload)
  return {
    type: SET_USERPROFILE_ERROR,
    payload
  }
}

export function deleteUserProfileError() {
  return {
    type: DELETE_USERPROFILE_ERROR
  }
}


// reducer


const initialState = {
  loading: false,
  errorList: null,
  profile: null,
  executingIsSuccess: false
}

export default  function userProfile(state = initialState, action) {
  switch (action.type) {
    case SET_USERPROFILE:
        return { ...state, profile: action.payload }
    case USERPROFILE_LOADING:
      return { ...state, loading: !state.loading }
    case SET_USERPROFILE_ERROR:
      return { ...state, errorList: action.payload }
    case SET_USERPROFILE_SUCCESS:
      return { ...state, executingIsSuccess: !state.executingIsSuccess }
    case DELETE_USERPROFILE_ERROR:
      return { ...state, errorList: null }
    case CLEAR_USERPROFILE:
      return initialState
    default:
      return state
  }
}

export function getUserProfileRequest(name) {
  return function(dispatch) {
    dispatch(userProfileLoading())
    axios
      .get(`/userprofile/${name}`)
      .then(response => {
	  console.log(response.data)
        dispatch(setUserProfile(response.data))
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setUserProfileError(error.response.data));
          else
            dispatch(setUserProfileError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setUserProfileError(["Error with requesting"]))
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(userProfileLoading())
      });
  }
}

export function updateProfileTextFieldsRequest(profile) {
  return function(dispatch) {
    dispatch(userProfileLoading())
    axios 
      .put(`/userProfile`, profile)
      .then(response => {
        dispatch(setUserProfile(profile))
        dispatch(updateUserProfileExecutingSuccess())
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setUserProfileError(error.response.data));
          else
            dispatch(setUserProfileError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(userProfileLoading())
      });
  }
}


export function updateProfileImagesRequest(file, image) {
  return function(dispatch) {
    dispatch(userProfileLoading())
    const url = `/userProfile/${image}`;
    const formData = new FormData();
    formData.append('body', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    };
    axios
      .post(url, formData, config)
      .then(response => {
        dispatch(updateUserProfileExecutingSuccess())
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setUserProfileError(error.response.data));
          else
            dispatch(setUserProfileError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(userProfileLoading())
      });
  }
}

export function changeUsernameRequest(username) {
  return function(dispatch) {
    dispatch(userProfileLoading())
    const url = `/authentication/${username}`;
    axios 
      .put(url)
      .then(response => {
        dispatch(updateAuthenticationDates(response.data))
        dispatch(updateUserProfileExecutingSuccess())
      })
      .catch(error => {
			console.log(error)
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setUserProfileError(error.response.data));
          else
            dispatch(setUserProfileError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(userProfileLoading())
      });
  }
}