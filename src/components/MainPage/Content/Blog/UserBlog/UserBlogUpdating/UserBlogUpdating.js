import React, { useState} from 'react';
import { connect } from 'react-redux'
import ImageUpdating from './ImageUpdating'
import TextFieldsUpdating from './TextFieldsUpdating'
import ErrorView from '../../../../Common/ErrorView/ErrorView'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../../../store/userProfile'
import './UserBlogUpdating.css'

class UserBlogUpdating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.profile,
    }
    this.profile = props.profile;
    this.props.getUserProfileRequest(this.props.authUsername);
  }

  componentDidMount() {
    this.setState({...this.props.profile})
  }

  componentDidUpdate(){
    if(this.props.profile 
      && this.state.username !== this.props.profile.username)
      this.setState({ ...this.props.profile })
    if(this.props.IsExecutingSuccess){
      this.props.updateUserProfileExecutingSuccess();
      alert("Executed success")
    }
  }

  componentWillUnmount(){
    this.props.clearUserProfile();
  }


  textChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  textSubmit = (event) => {
    event.preventDefault();
    this.props.updateProfileTextFieldsRequest(this.state);
  }

  usernameSubmit = (event) => {
    event.preventDefault();
    this.props.changeUsernameRequest(this.state.username);
  }

  render() {
    return (
      <div className='blogUpdating'>
        <h3> Update Blog </h3>
        <TextFieldsUpdating 
          submit={this.textSubmit}
          textChange={this.textChange}
          fields={this.state}
          usernameSubmit={this.usernameSubmit}
        />
        <ImageUpdating
          profile={this.props.profile}
          imageSubmit={(payload, imageName) => this.props.updateProfileImagesRequest(payload, imageName)}
          imageName="avatar"
        />
        <ImageUpdating
          profile={this.props.profile}
          imageSubmit={(payload, imageName) => this.props.updateProfileImagesRequest(payload, imageName)}
          imageName="photo"
        />
        <ErrorView 
          errorList={this.props.errors}
          deleteErrors={this.props.deleteUserProfileError}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      authUsername: state.authentication.username,
      profile: state.userProfile.profile,
      IsExecutingSuccess: state.userProfile.executingIsSuccess,
      errors: state.userProfile.errorList
    }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...actions,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserBlogUpdating)