import axios from 'axios'
import errorListTypeChecking from '../../logicElements/errorListTypeChecking'
const CLEAR_DIALOG_CREATING = 'CLEAR_DIALOG_CREATING'
const DIALOG_CREATING_LOADING = 'DIALOG_CREATING_LOADING'
const SET_DIALOG_CREATING_ERROR = 'SET_DIALOG_CREATING_ERROR'
const SET_DIALOG_CREATING_SUCCESS = 'SET_DIALOG_CREATING_SUCCESS'
// action creators

export function clearDialogCreating() {
  return {
    type: CLEAR_DIALOG_CREATING
  }
}

export function dialogCreatingLoading(payload) {
  return {
    type: DIALOG_CREATING_LOADING,
    payload
  }
}

export function setDialogCreatingError(payload) {
  return {
    type: SET_DIALOG_CREATING_ERROR,
    payload
  }
}

export function setDialogCreatingSuccess() {
  return {
    type: SET_DIALOG_CREATING_SUCCESS
  }
}


// reducer

const initialState = {
  loading: false,
  errorList: null,
  success: null
}

export default  function dialogCreating(state = initialState, action) {
  switch (action.type) {
    case DIALOG_CREATING_LOADING:
      return { ...state, loading: action.payload }
    case SET_DIALOG_CREATING_ERROR:
      return { ...state, errorList: action.payload }
    case SET_DIALOG_CREATING_SUCCESS:
      return {...state, success: true}
    case CLEAR_DIALOG_CREATING:
      return initialState
    default:
      return state
  }
}

///thunk 

export function dialogCreatingRequest(payload) {
  return function(dispatch) {
    dispatch(clearDialogCreating())
    dispatch(dialogCreatingLoading(true))
    axios
      .post(`/communicating`, payload)
      .then(response => {
        dispatch(setDialogCreatingSuccess())
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setDialogCreatingError(error.response.data));
          else
            dispatch(setDialogCreatingError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setDialogCreatingError(["Error with requesting"]))
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(dialogCreatingLoading(false))
      });
  }
}
