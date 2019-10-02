import axios from 'axios'
import errorListTypeChecking from '../../logicElements/errorListTypeChecking'
const UPDATE_DIALOGLIST = 'GET_DIALOGLIST'
const CLEAR_DIALOGLIST = 'CLEAR_DIALOGLIST'
const DIALOGLIST_LOADING = 'DIALOGLIST_LOADING'
const SET_DIALOGLIST_ERROR = 'SET_DIALOGLIST_ERROR'
const DELETE_DIALOGLIST_ERROR = 'DELETE_DIALOGLIST_ERROR'

// action creators
export function updateDialogList(payload) {
  return {
    type: UPDATE_DIALOGLIST,
    payload
  }
}

export function clearDialogList() {
  return {
    type: CLEAR_DIALOGLIST
  }
}

export function dialogListLoading() {
  return {
    type: DIALOGLIST_LOADING
  }
}

export function setDialogListError(payload) {
  return {
    type: SET_DIALOGLIST_ERROR,
    payload
  }
}

export function deleteDialogListError() {
  return {
    type: DELETE_DIALOGLIST_ERROR
  }
}

// reducer

const initialState = {
  loading: false,
  errorList: null,
  dialogs: [],
  pageCount: 0
}

export default  function dialogList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DIALOGLIST:
      return { ...state, dialogs: action.payload.item1, pageCount: action.payload.item2 }
    case DIALOGLIST_LOADING:
      return { ...state, loading: !state.loading }
    case SET_DIALOGLIST_ERROR:
      return { ...state, errorList: action.payload }
    case DELETE_DIALOGLIST_ERROR:
      return { ...state, errorList: null }
    case CLEAR_DIALOGLIST:
      return initialState
    default:
      return state
  }
}

///thunk 

const url = `/dialog`;

export function getDialogListRequest(payload) {
  return function(dispatch) {
    dispatch(dialogListLoading())
    axios
      .get(url)
      .then(response => {
        dispatch(updateDialogList(response.data))
        console.log(response.data)
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setDialogListError(error.response.data));
          else
            dispatch(setDialogListError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setDialogListError(["Error with requesting"]))
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(dialogListLoading())
      });
  }
}

export function createDialogRequest(payload) {
  return function(dispatch) {
    dispatch(dialogListLoading())
    axios
      .post(url, payload)
      .then(response => {
        dispatch(updateDialogList(response.data))
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setDialogListError(error.response.data));
          else
            dispatch(setDialogListError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setDialogListError(["Error with requesting"]))
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(dialogListLoading())
      });
  }
}