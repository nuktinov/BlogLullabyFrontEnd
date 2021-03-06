import axios from 'axios'
import errorListTypeChecking from '../logicElements/errorListTypeChecking'
const UPDATE_POSTLIST = 'GET_POSTSLIST'
const CLEAR_POSTLIST = 'CLEAR_POSTSLIST'
const POSTLIST_LOADING = 'POSTSLIST_LOADING'
const SET_POSTLIST_ERROR = 'SET_POSTSLIST_ERROR'
const DELETE_POSTLIST_ERROR = 'DELETE_POSTLIST_ERROR'
const IS_ALL_POSTS = 'IS_ALL_POSTS'

// action creators
export function updatePostList(payload) {
  return {
    type: UPDATE_POSTLIST,
    payload
  }
}

export function clearPostList() {
  return {
    type: CLEAR_POSTLIST
  }
}

export function postListLoading(payload) {
  return {
    type: POSTLIST_LOADING,
    payload
  }
}

export function setPostListError(payload) {
  return {
    type: SET_POSTLIST_ERROR,
    payload
  }
}

export function deletePostListError() {
  return {
    type: DELETE_POSTLIST_ERROR
  }
}

export function isAllPosts() {
  return {
    type: IS_ALL_POSTS
  }
}

// reducer

const initialState = {
  isLoading: false,
  isAll: false,
  errors: null,
  elements: []
}

export default  function postList(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POSTLIST:
      return { ...state, elements: action.payload }
    case POSTLIST_LOADING:
      return { ...state, isLoading: action.payload }
    case SET_POSTLIST_ERROR:
      return { ...state, errors: action.payload }
    case DELETE_POSTLIST_ERROR:
      return { ...state, errors: null }
    case IS_ALL_POSTS:
        return { ...state, isAll: true }
    case CLEAR_POSTLIST:
      return initialState
    default:
      return state
  }
}

///thunk 

export function postListRequest(criterion) {
  return function(dispatch, getState) {
    dispatch(deletePostListError())
    dispatch(postListLoading(true))
    axios
      .post(`/postlist`,criterion)
      .then(response => {
        const items = response.data;
        if(items.length < criterion.pageSize)
          dispatch(isAllPosts())
        if(items.length != 0) {
          const newList = getState().postList.elements.concat(items)
          dispatch(updatePostList(newList))
        }
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setPostListError(error.response.data));
          else
            dispatch(setPostListError([error.response.statusText]));
        } else if (error.request) {
          dispatch(setPostListError(["Some errors with request"]));
          console.log(error.request);
        } else {
          dispatch(setPostListError(["Some errors."]))
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(postListLoading(false))
      });
  }
}

