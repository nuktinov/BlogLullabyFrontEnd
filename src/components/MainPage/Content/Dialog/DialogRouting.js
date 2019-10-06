import React from 'react';
import { Switch, Route} from 'react-router-dom'

import DialogList from './DialogList/DialogList'
import DialogCreating from './DialogCreating/DialogCreating'
import DialogRoom from './DialogRoom/DialogRoom';
import("./Dialog.css")


class DialogRouting extends React.Component {
    constructor(props) {
      super(props);
    }
		
    componentDidMount() {
        //const element = document.querySelector("#mainPage")
        //element.style.gridTemplateRows = "8% 92% 15%";
    }
	

    componentWillUnmount() {
        //const element = document.querySelector("#mainPage")
        //element.style = null; 
    }
  
    render() {
        return (
            <div className='dialog'>
                <Switch>
                    <Route exact path="/dialog" component={DialogList} />
                    <Route  exact path="/dialog/create" component={DialogCreating} />
                    <Route  path='/dialog/:id' component={DialogRoom} />
                </Switch>
            </div>
        )
    }
}

function DialogRoutingg () {
    
    window.onload = function(){
        const element = document.querySelector("#mainPage")/*document.getElementById("mainPage")*/
        //element.css.height = "100%";
        element.style.gridTemplateRows = "8% 76% 15%";
        //console.log(mainPage)
    }
        
        
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

export default DialogRouting;