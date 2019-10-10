import React from 'react';

export default class AuthorizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    this.props.submit(this.state)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input 
            type="text" 
            name="login"
            value={this.state.login}
            onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input 
          type="password"
          name="password"
          value={this.state.password} 
          onChange={this.handleChange} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    );
  }
} 
