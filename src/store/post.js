import axios from 'axios'
import errorListTypeChecking from '../logicElements/errorListTypeChecking'
const SET_POST_SUCCESS = 'SET_POST_SUCCESS'
const SET_POST = 'SET_POST'
const CLEAR_POST = 'CLEAR_POST'
const POST_LOADING = 'POST_LOADING'
const SET_POST_ERROR = 'SET_POST_ERROR'
const DELETE_POST_ERROR = 'DELETE_POST_ERROR'


// action creators

export function setCreatedPostId(payload) {
  return {
    type: SET_POST_SUCCESS,
    payload
  }
}

export function setPost(payload) {
    return {
      type: SET_POST,
      payload
    }
}

export function clearPost() {
  return {
    type: CLEAR_POST
  }
}

export function postLoading() {
  return {
    type: POST_LOADING
  }
}

export function setPostError(payload) {
  return {
    type: SET_POST_ERROR,
    payload
  }
}

export function deletePostError() {
  return {
    type: DELETE_POST_ERROR
  }
}


// reducer


const initialState = {
  loading: false,
  error: false,
  errorList: null,
  post: null,
  createdPostId: null
}


export default  function post(state = initialState, action) {
  switch (action.type) {
    case SET_POST_SUCCESS:
        return { ...state, createdPostId: action.payload }
    case SET_POST:
        return { ...state, post: action.payload }
    case POST_LOADING:
      return { ...state, loading: !state.loading }
    case SET_POST_ERROR:
      return { ...state, error: true, errorList: action.payload }
    case DELETE_POST_ERROR:
      return { ...state, error: false, errorList: null }
    case CLEAR_POST:
      return initialState
    default:
      return state
  }
}


export function getPostRequest(id) {
  return function(dispatch) {
    dispatch(postLoading())
    axios
      .get(`post/${id}`)
      .then(response => {
        dispatch(setPost(response.data))
        console.log(response.data)
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setPostError(error.response.data));
          else
            dispatch(setPostError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(postLoading())
      });
  }
}

export function deletePostRequest(id) {
  return function(dispatch) {
    dispatch(postLoading())
    axios
      .delete(`post/${id}`)
      .then(response => {
        //do sumthing
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setPostError(error.response.data));
          else
            dispatch(setPostError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(postLoading())
      });
  }
}

export function createPostRequest(post) {
  return function(dispatch) {
    dispatch(postLoading())
    const url = `/post`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
    };
    axios
      .post(url, post, config)
      .then(response => {
        dispatch(setCreatedPostId(response.data))
      })
      .catch(error => {
        if (error.response) {
          if(errorListTypeChecking(error.response.data))
            dispatch(setPostError(error.response.data));
          else
            dispatch(setPostError([error.response.statusText]));
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ', error.message);
        }
      })
      .finally(() => {
        dispatch(postLoading())
      });
  }
}