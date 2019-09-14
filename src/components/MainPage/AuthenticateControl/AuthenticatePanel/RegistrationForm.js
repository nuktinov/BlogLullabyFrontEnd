import React from 'react';
import { connect } from 'react-redux'
import {userRegistrationRequest, clearAuthentication } from '../../../../store/authentication'


class RegistrationForm extends React.Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if(this.props.successRequesting)
      alert('To continue registration, move to your email, and confirm registration.');
  }
  componentWillUnmount() {
    this.props.clear();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    this.props.submit(this.state);
    event.preventDefault();
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
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: (payload) => dispatch(userRegistrationRequest(payload)),
    clear: () => dispatch(clearAuthentication())
  }
}

export default connect(null,mapDispatchToProps)(RegistrationForm)