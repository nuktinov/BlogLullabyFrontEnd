import React from 'react';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    };
  }

  componentDidUpdate() {
    if(this.props.successRequesting)
      alert('To continue registration, move to your email, and confirm registration.');
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
	event.preventDefault();
	if(this.state.password !== this.state.confirmPassword)
		alert("Password and password confirmation do not match");
	else
		this.props.submit(this.state);
  }

  label = (viewString, inputName, type = "text") => (
    <label>
      {viewString}:
      <input 
        type={type}
        name={inputName}
        value={this.state[inputName]}
        onChange={this.handleChange} />
    </label>
  )

  render() {
    return (
      <form 
      onSubmit={this.handleSubmit}>
        {this.label("Email", "email")}
        {this.label("Username", "userName")}
        {this.label("Firstname", "firstName")}
        {this.label("Lastname", "lastName")}
        {this.label("Password", "password", "password")}
        {this.label("Confirm password", "confirmPassword", "password")}
        <input type="submit" value="Sign up" />
      </form>
    );
  }
}