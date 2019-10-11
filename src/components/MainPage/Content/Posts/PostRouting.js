import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Post from './PostDisplay/Post'
import PostPage from './PostPage'
import PostCreating from './PostCreating/PostCreating'

export default function PostRouting () {
    return (
        <Switch>
            <Route exact path="/post" component={PostPage} />
            <Route exact path='/post/create' component={PostCreating} />
            <Route path='/post/:id' component={Post} />
        </Switch>
    )
};