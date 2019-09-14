import axios from 'axios'
const UPDATE_USERLIST = 'UPDATE_USERLIST'
const CLEAR_USERLIST = 'CLEAR_USERLIST'
const USERLIST_LOADING = 'USERLIST_LOADING'
const SET_USERLIST_ERROR = 'SET_USERLIST_ERROR'
const DELETE_USERLIST_ERROR = 'DELETE_USERLIST_ERROR'

// action creators
export function setUserList(payload) {
  return {
    type: UPDATE_USERLIST,
    payload
  }
}

export function clearUserList() {
  return {
    type: CLEAR_USERLIST
  }
}

export function userListLoading() {
  return {
    type: USERLIST_LOADING
  }
}

export function setUserListError(payload) {
  return {
    type: SET_USERLIST_ERROR,
    payload
  }
}

export function deleteUserListError() {
  return {
    type: DELETE_USERLIST_ERROR
  }
}

// reducer

const initialState = {
  loading: false,
  error: false,
  errorList: [],
  userViews: []
}

export default  function userList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERLIST:
      return { ...state, postPreviews: action.payload }
    case USERLIST_LOADING:
      return { ...state, loading: !state.loading }
    case SET_USERLIST_ERROR:
      return { ...state, error: true, errorList: action.payload }
    case DELETE_USERLIST_ERROR:
      return { ...state, error: false, errorList: [] }
    case CLEAR_USERLIST:
      return initialState
    default:
      return state
  }
}

///thunk 

export function getUserListRequest(criterion) {
  return function(dispatch) {
    dispatch(userListLoading())
    axios
      .post(`/userlist`,criterion)
      .then(response => {
        dispatch(setUserList(response.data))
      })
      .catch(error => {
        if (error.response) {
          if(error.response.data != '')
            dispatch(setUserListError(error.response.data));
          else
            dispatch(setUserListError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(userListLoading())
      });
  }
}
