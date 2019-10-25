import React from 'react';
import { connect } from 'react-redux'
import { clearAuthentication, userLoginRequest, userRegistrationRequest } from '../../../../store/authentication'
import './AuthenticatePanel.css'
import AuthorizationForm from './AutorizationForm'
import RegistrationForm from './RegistrationForm'
import Loading from '../../Common/Loading/Loading'
import ErrorList from '../../Common/ErrorList/ErrorList'

class AuthenticatePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  componentDidUpdate() {
    if(this.props.successRequesting) {
      this.props.closePanel();
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  handleClick = () => {
    if(!this.props.loading)
      this.setState({
        formToggle: !this.state.formToggle
      });
  }

  render() {
    return (
      <div className="authenticatePanel">
        <div className="authenticateForm">
          {this.state.formToggle
            ? <AuthorizationForm 
                submit={this.props.logIn}
              /> 
            : <RegistrationForm
              successRequesting={this.props.successRequesting} 
              submit={this.props.registration}
            /> 
          }
          <button onClick={this.handleClick}>
            {this.state.formToggle ? "To sign up" : "To sign in"}
          </button>
        </div>
        <Loading loading={this.props.loading}/>
        {this.props.errorList && (
          <div className="authenticateDescription">
            <ErrorList errorList={this.props.errorList} />
          </div>)
        }
      </div>
    )
  }  
}

const mapStateToProps = state => {
  return {
    errorList: state.authentication.errorList,
    loading: state.authentication.loading,
    successRequesting: state.authentication.success
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch(clearAuthentication()),
    logIn: (payload) => dispatch(userLoginRequest(payload)),
    registration: (payload) => dispatch(userRegistrationRequest(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatePanel)