import React from 'react';
import { Redirect } from 'react-router-dom'

import LogInButton from './LogInButton/LogInButton'
import LogOutButton from './LogOutButton/LogOutButton'
import AuthenticatePanel from './AuthenticatePanel/AuthenticatePanel'
import './AuthenticateControl.css'

class AuthenticateControl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        AuthToggle :false,
        redirect: false
      };
    }
  
    AuthenticateFormToggle = () => {
      this.setState(() => ({
        AuthToggle: !this.state.AuthToggle
      }));
    }

    componentDidMount() {
      
    }
  
    componentWillUnmount() {
      
    }
  
    render() {
      if(this.state.redirect) {
        this.setState({redirect: false});
        return <Redirect to='/' />
      } 
      return (
        <div id="authenticateControl">
          {this.props.logIn? 
            <LogOutButton
              setRedirect={() => this.setState({ redirect: true })} 
            /> : 
            <LogInButton 
              AuthenticateFormToggle={this.AuthenticateFormToggle}
              isToggleOn={this.state.AuthToggle}
            />
          }
          {this.state.AuthToggle && <AuthenticatePanel closePanel={() => this.AuthenticateFormToggle()}/>}
        </div>
      );
    }
}
  

export default AuthenticateControl;
