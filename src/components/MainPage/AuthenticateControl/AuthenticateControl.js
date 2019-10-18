import React from 'react';
import { Redirect } from 'react-router-dom'
import LogInButton from './LogInButton/LogInButton'
import LogOutButton from './LogOutButton/LogOutButton'
import AuthenticatePanel from './AuthenticatePanel/AuthenticatePanel'
import './AuthenticateControl.css'

export default class AuthenticateControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOn :false,
      redirect: false
    };
  }
  
  authenticatePanelToggle = () => {
    this.setState({
      isPanelOn: !this.state.isPanelOn
    })
  }
  
  render() {
    if(this.state.redirect) {
      this.setState({redirect: false});
      return <Redirect to='/' />
    } 
    return (
      <div id="authenticateControl">
        {this.props.logIn
          ? <LogOutButton
              setRedirect={() => this.setState({ redirect: true })} 
          />
          : <LogInButton 
              authenticatePanelToggle={this.authenticatePanelToggle}
              isPanelOn={this.state.isPanelOn}
          />
        }
        {this.state.isPanelOn && 
          <AuthenticatePanel 
            closePanel={this.authenticatePanelToggle}
          />
        }
      </div>
    );
  }
}
