import { combineReducers } from 'redux';

import postList from './postList'
import authentication from './authentication'
import post from './post'
import userProfile from './userProfile'
import userList from './userList'
import dialogList from './dialog/dialogList'
import dialog from './dialog/dialog'
import dialogCreating from './dialog/dialogCreating'


const reducer = combineReducers({
    postList,
    authentication,
    post,
    userProfile,
    userList,
	dialogList,
    dialog,
    dialogCreating
})

export default reducer