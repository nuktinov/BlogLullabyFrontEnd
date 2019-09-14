import React from 'react';
import {Switch, Route} from 'react-router-dom'
import UserBlog from './UserBlog/UserBlog'
import UserBlogUpdating from './UserBlog/UserBlogUpdating/UserBlogUpdating'

function BlogRouting () {
    return (
        <Switch>
            <Route exact path="/blog" render={()=><p>search by blog</p>} />
            <Route path='/blog/update' component={UserBlogUpdating} />
            <Route path='/blog/:username' component={UserBlog} />
        </Switch>
    )
};

export default BlogRouting;