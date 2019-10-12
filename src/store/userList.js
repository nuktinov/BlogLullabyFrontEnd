import axios from 'axios'
import errorListTypeChecking from '../logicElements/errorListTypeChecking'
const UPDATE_USERLIST = 'UPDATE_USERLIST'
const CLEAR_USERLIST = 'CLEAR_USERLIST'
const USERLIST_LOADING = 'USERLIST_LOADING'
const SET_USERLIST_ERROR = 'SET_USERLIST_ERROR'
const DELETE_USERLIST_ERROR = 'DELETE_USERLIST_ERROR'
const IS_ALL_USERS = 'IS_ALL_USERS'

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

export function isAllUsers() {
  return {
    type: IS_ALL_USERS
  }
}

// reducer

const initialState = {
  isLoading: false,
  isAll: false,
  errors: null,
  elements: []
}

export default  function userList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERLIST:
      return { ...state, elements: action.payload }
    case USERLIST_LOADING:
      return { ...state, isLoading: !state.isLoading }
    case SET_USERLIST_ERROR:
      return { ...state, errors: action.payload }
    case DELETE_USERLIST_ERROR:
      return { ...state, errorList: null }
    case IS_ALL_USERS:
      return { ...state, isAll: true }
    case CLEAR_USERLIST:
      return initialState
    default:
      return state
  }
}

///thunk 

export function userListRequest(criterion) {
  return function(dispatch, getState) {
    dispatch(userListLoading())
    axios
      .post(`/userlist`,criterion)
      .then(response => {
        let items = response.data;
        if(items.length < criterion.pageSize)
          dispatch(isAllUsers())
        for(let i = 0; i < items.length; i++)
          items[i] = { ...items[i], id: items[i].username}
        if(items.length != 0) {
          const newList = getState().userList.elements.concat(items)
          dispatch(setUserList(newList))
        }
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setUserListError(error.response.data));
          else
            dispatch(setUserListError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setUserListError(["Error with request"]));
        } else {
          dispatch(setUserListError(["Error"]));
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(userListLoading())
      });
  }
}
