import React, { useState } from "react"
import { connect } from 'react-redux'
import { logOut } from '../../../../store/authentication'
import '../AuthenticateControl.css'

function LogOutButton ({ logOut, setRedirect }) {

    const element = document.querySelector('#authenticateControl');
    if(element != null)
        element.style.height = "8%";

    function handleClick() {
        logOut();
        setRedirect();
    }
    
    /*
    componentDidMount() {
        this._isMounted = true;
        const img = new Image(); 
        const setHeight = (height) => this._isMounted && this.setState({ height });
        const element = document.querySelector('#authenticateControl');
        if(element != null)
            element.style.height = "8%";
    }
    */
    return(
        <button onClick={handleClick}>
            Log out
        </button>
    );
};

const mapDispatchToProps = dispatch => {
    return {
      logOut: () => { dispatch(logOut()) }
    }
  }
export default connect(null, mapDispatchToProps)(LogOutButton)