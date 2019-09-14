import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './Home/Home'
import ErrorPage from './ErrorPage/ErrorPage'
import Blog from './Blog/BlogRouting'
import Dialog from './Dialog/DialogRouting'
import Post from './Posts/PostRouting'

function Content () {
    return (
        <div id="pageContent">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path='/blog' component={Blog} />
                <Route path='/dialog' component={Dialog} />
                <Route path='/post' component={Post} />
                <Route component={ErrorPage} />
            </Switch>        
        </div>
    )
};

export default Content;