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
  console.log("set")
  return {
    type: UPDATE_USERLIST,
    payload
  }
}

export function clearUserList() {
  console.log("clear")
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
  loading: false,
  errorList: null,
  users: [],
  isAll: false
}

export default  function userList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERLIST:
      return { ...state, users: action.payload }
    case USERLIST_LOADING:
      return { ...state, loading: !state.loading }
    case SET_USERLIST_ERROR:
      return { ...state, errorList: action.payload }
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
        console.log(response.data)
        let mass = response.data;
        if(mass.length < criterion.pageSize)
          dispatch(isAllUsers())
        for(let i = 0; i < mass.length; i++)
          mass[i] = { ...mass[i], id: mass[i].username}
        if(mass.length != 0) {
          const newList = getState().userList.users.concat(mass)
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
