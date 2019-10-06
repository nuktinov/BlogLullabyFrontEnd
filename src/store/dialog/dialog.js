import axios from 'axios'
import errorListTypeChecking from '../../logicElements/errorListTypeChecking'
const SET_DIALOG = 'SET_DIALOG'
const CLEAR_DIALOG = 'CLEAR_DIALOG'
const ADD_MESSAGE = 'ADD_MESSAGE'
const ADD_PREVIOUS_MESSAGES = 'ADD_PREVIOUS_MESSAGES'
const DIALOG_LOADING = 'DIALOG_LOADING'//
const SET_DIALOG_ERROR = 'SET_DIALOG_ERROR'//
const DELETE_DIALOG_ERROR = 'DELETE_DIALOG_ERROR'//
// action creators
export function setDialog(payload) {
  return {
    type: SET_DIALOG,
    payload
  }
}

export function clearDialog() {
  return {
    type: CLEAR_DIALOG
  }
}

export function addMessage(payload) {
  return {
    type: ADD_MESSAGE,
    payload
  }
}

export function addPreviousMessages(payload) {
  return {
    type: ADD_PREVIOUS_MESSAGES,
    payload
  }
}

export function dialogLoading() {
  return {
    type: DIALOG_LOADING
  }
}

export function setDialogError(payload) {
  return {
    type: SET_DIALOG_ERROR,
    payload
  }
}

export function deleteDialogError() {
  return {
    type: DELETE_DIALOG_ERROR
  }
}
/*
export function IsAllMessagesLoading() {
  return {
    type: IS_ALL_MESSAGES_LOADING
  }
}*/

// reducer

const initialState = {
  loading: false,
  errorList: null,
  dialog: null,
  success: null,
  IsAllMessagesLoading: false
}

export default  function dialog(state = initialState, action) {
  switch (action.type) {
    case SET_DIALOG:
      return { ...state, dialog: action.payload }
    case ADD_MESSAGE:
      return { ...state, dialog: {...state.dialog, 
          messages: state.dialog.messages.concat({ ...action.payload, 
            sender:{ ...state.dialog.members.find(x => x.username === action.payload.sender.username), 
              lastVisit: new Date()
            }
          })
        } 
      }
    case ADD_PREVIOUS_MESSAGES: 
      return {...state, dialog: {...state.dialog, 
          messages: action.payload.concat(state.dialog.messages)
        },
        IsAllMessagesLoading: action.payload.length == 0 ? true : false
      }
    case DIALOG_LOADING:
      return { ...state, loading: !state.loading }
    case SET_DIALOG_ERROR:
      return { ...state, error: true, errorList: action.payload }
    case DELETE_DIALOG_ERROR:
      return { ...state, error: false, errorList: null }
    case CLEAR_DIALOG:
      return initialState
    default:
      return state
  }
}

///thunk 
/*
export function sendMessageRequest(payload) {
  return function(dispatch) {
    dispatch(dialogLoading())
    axios
      .post(`/message/sendmessage`, payload)
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
      .get(`/dialog/${id}`)
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

export function readMessageRequest(id) {
  return function(dispatch) {
    dispatch(dialogLoading())
    axios
      .put(`/message/${id}`)
      .then(response => {
        dispatch(setDialogSuccess())
        console.log("запрос")
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
}*/