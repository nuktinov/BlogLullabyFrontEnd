import axios from 'axios'
import errorListTypeChecking from '../../logicElements/errorListTypeChecking'
const UPDATE_DIALOG = 'GET_DIALOG'
const CLEAR_DIALOG = 'CLEAR_DIALOG'
const DIALOG_LOADING = 'DIALOG_LOADING'
const SET_DIALOG_ERROR = 'SET_DIALOG_ERROR'
const DELETE_DIALOG_ERROR = 'DELETE_DIALOG_ERROR'
const SET_DIALOG_SUCCESS = 'SET_DIALOG_SUCCESS'
const MESSAGES_LOADING = 'MESSAGES_LOADING'
// action creators
export function setDialog(payload) {
  return {
    type: UPDATE_DIALOG,
    payload
  }
}

export function clearDialog() {
  return {
    type: CLEAR_DIALOG
  }
}

export function dialogLoading() {
  return {
    type: DIALOG_LOADING
  }
}

export function messageDisplayLoading() {
  return {
    type: MESSAGES_LOADING
  }
}

export function setDialogError(payload) {
  return {
    type: SET_DIALOG_ERROR,
    payload
  }
}

export function setDialogSuccess() {
  return {
    type: SET_DIALOG_SUCCESS
  }
}

export function deleteDialogError() {
  return {
    type: DELETE_DIALOG_ERROR
  }
}

// reducer

const initialState = {
  messageDisplayLoading: false,
  loading: false,
  errorList: null,
  dialog: null,
  success: null
}

export default  function dialog(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOADING:
      return { ...state, messageDisplayLoading: !state.messageDisplayLoading }
    case UPDATE_DIALOG:
      return { ...state, dialog: action.payload }
    case DIALOG_LOADING:
      return { ...state, loading: !state.loading }
    case SET_DIALOG_ERROR:
      return { ...state, error: true, errorList: action.payload }
    case DELETE_DIALOG_ERROR:
      return { ...state, error: false, errorList: null }
    case SET_DIALOG_SUCCESS:
      return {...state, success: true}
    case CLEAR_DIALOG:
      return initialState
    default:
      return state
  }
}

///thunk 

export function sendMessageRequest(payload) {
  return function(dispatch) {
    dispatch(dialogLoading())
    axios
      .post(`/communicating/sendmessage`, payload)
      .then(response => {
        dispatch(setDialogSuccess())
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setDialogError(error.response.data));
          else
            dispatch(setDialogError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setDialogError(["Error with requesting"]))
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(dialogLoading())
      });
  }
}

export function getDialogRequest(id) {
  return function(dispatch) {
    dispatch(dialogLoading())
    axios
      .get(`/communicating/${id}`)
      .then(response => {
        dispatch(setDialog(response.data))
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          if(errorListTypeChecking(error.response.data))
            dispatch(setDialogError(error.response.data));
          else
            dispatch(setDialogError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setDialogError(["Error with requesting"]))
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(dialogLoading())
      });
  }
}