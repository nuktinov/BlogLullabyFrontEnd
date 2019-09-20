import React from 'react';
import { connect } from 'react-redux'
import { clearAuthentication } from '../../../../store/authentication'
import './AuthenticatePanel.css'
import AuthorizationForm from './AutorizationForm'
import RegistrationForm from './RegistrationForm'
import Loading from '../../Common/Loading/Loading'
import ErrorList from '../../Common/ErrorList/ErrorList'


class AuthenticatePanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate() {
      if(this.props.successRequesting) {
        this.props.closePanel();
      }
    }

    componentWillUnmount() {
      this.props.clear();
    }

    handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
  
    render() {
      return (
        <div className="authenticatePanel">
          <div className="authenticateForm">
            {this.state.isToggleOn ? <AuthorizationForm /> : 
              <RegistrationForm
                successRequesting={this.props.successRequesting} 
              /> 
            }
            <button onClick={this.handleClick}>
              {this.state.isToggleOn ? "To Registation" : "To log in"}
            </button>
          </div>
          {(this.props.loading || this.props.errorList) && (
          <div className="authenticateDescription">
            <Loading loading={this.props.loading}/>
            <ErrorList errorList={this.props.errorList} />
          </div>)}
        </div>
    )
    }
}


const mapStateToProps = state => {
    return {
      error: state.authentication.error,
      errorList: state.authentication.errorList,
      loading: state.authentication.loading,
      successRequesting: state.authentication.success
    }
}

const mapDispatchToProps = dispatch => {
  return {
    clear: () => dispatch(clearAuthentication())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatePanel)