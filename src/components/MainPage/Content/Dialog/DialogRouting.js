import React from 'react';
import { Switch, Route} from 'react-router-dom'
import DialogList from './DialogList/DialogList'
import DialogCreating from './DialogCreating/DialogCreating'
import DialogRoom from './DialogRoom/DialogRoom';

export default function DialogRouting () {   
    return (
        <div className='dialog'>
            <Switch>
                <Route exact path="/dialog" component={DialogList} />
				<Route  exact path="/dialog/create" component={DialogCreating} />
                <Route  path='/dialog/:id' component={DialogRoom} />
            </Switch>
        </div>
    )
}; 