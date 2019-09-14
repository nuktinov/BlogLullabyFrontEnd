import React from 'react';
import { connect } from 'react-redux'
import { userLoginRequest, clearAuthentication } from '../../../../store/authentication'

class AuthorizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentWillUnmount() {
    this.props.clear();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
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
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: (payload) => dispatch(userLoginRequest(payload)),
    clear: () => dispatch(clearAuthentication())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AuthorizationForm)

//export default AuthorizationForm;