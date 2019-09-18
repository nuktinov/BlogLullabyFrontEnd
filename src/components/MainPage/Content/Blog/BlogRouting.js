import React from 'react';
import {Switch, Route} from 'react-router-dom'
import UserBlog from './UserBlog/UserBlog'
import UserBlogUpdating from './UserBlog/UserBlogUpdating/UserBlogUpdating'
import BlogList from './BlogList/BlogList';

function BlogRouting () {
    return (
        <Switch>
            <Route exact path="/blog" component={BlogList} />
            <Route path='/blog/update' component={UserBlogUpdating} />
            <Route path='/blog/:username' component={UserBlog} />
        </Switch>
    )
};

export default BlogRouting;