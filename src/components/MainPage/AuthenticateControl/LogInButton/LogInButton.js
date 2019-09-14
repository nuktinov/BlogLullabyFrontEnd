import React from 'react';

class LogInButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: props.isToggleOn};
        this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.props.AuthenticateFormToggle();
    }
  
    render() {
        return (
          <button onClick={this.handleClick}>
            {this.props.isToggleOn ? "LOG IN" : "Log in"}
          </button>
        );
    }
}

export default LogInButton;