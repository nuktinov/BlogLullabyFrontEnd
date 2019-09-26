import React from 'react';
import { connect } from 'react-redux'
import UserAvatarUpdating from './UserAvatarUpdating'
import UserPhotoUpdating from  './UserPhotoUpdating'
import TextInput from '../../../../Common/TextInput/TextInput'
import TextArea from '../../../../Common/TextArea/TextArea'
import {updateProfileTextFieldsRequest, 
  updateProfileImagesRequest, 
  changeUsernameRequest,
  updateUserProfileExecutingSuccess,
  deleteUserProfileError,
  getUserProfileRequest} from '../../../../../../store/userProfile'
import './UserBlogUpdating.css'
class UserBlogUpdating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.profile,
      file: null}

    this.textChange = this.textChange.bind(this);
    this.textSubmit = this.textSubmit.bind(this);
    this.usernameSubmit = this.usernameSubmit.bind(this);
  }


  componentWillMount() {
    this.props.getUserProfile(this.props.authUsername);
  }
  componentDidUpdate(){
    if(this.props.IsExecutingSuccess){
      this.props.successToggle();
      alert("Executed success")
    }
    if(this.props.errors) {
      this.props.deleteErrors();
      let error = "";
      for(let i = 0; i < this.props.errors.length; i++)
        error += this.props.errors[i] + '\n';
        
      alert(this.props.errors)
    }
  }

  textChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  textSubmit(event) {
    this.props.textSubmit(this.state);
    event.preventDefault();
  }

  usernameSubmit(event) {
    this.props.usernameSubmit(this.state.username);
    event.preventDefault();
  }

  label = (viewString, inputName, type = "text") => (
    <label>
      {viewString}:
      <input 
        type={type} 
        name={inputName}
        value={this.state[inputName] ? this.state[inputName] : ''}
        onChange={this.textChange} />
    </label>
  )

  render() {
    return (
      <div className='blogUpdating'>
        <h3> Update Blog </h3>
        <form onSubmit={this.usernameSubmit}>
          <TextInput 
            span="Username:"
            name="username"
            value={this.state["username"]}
            onChange={this.textChange} 
          />
          <input type="submit" value="Save" className="saveBtn"/>
        </form>
        <form className="userBlogTextUpdatingForm"
          onSubmit={this.textSubmit}>
          <TextInput 
            span="Firstname:"
            name="firstName"
            value={this.state["firstName"]}
            onChange={this.textChange} 
          />
          <TextInput 
            span="Lastname:"
            name="lastName"
            value={this.state["lastName"]}
            onChange={this.textChange} 
          />
          <TextInput 
            span="Specialization:"
            name="specialization"
            value={this.state["specialization"]}
            onChange={this.textChange} 
          />
          <TextInput 
            span="City:"
            name="city"
            value={this.state["city"]}
            onChange={this.textChange} 
          />
          <span>Description:</span>
          <TextArea 
            name="description"
            value={this.state["description"]}
            onChange={this.textChange}
          />
          <input type="submit" value="Save" className="saveBtn"/>
        </form>
        {this.props.profile &&
        <UserAvatarUpdating
          profile={this.props.profile}
          avatarSubmit={this.props.avatarSubmit}/>}
        {this.props.profile &&
        <UserPhotoUpdating
          profile={this.props.profile}
          avatarSubmit={this.props.avatarSubmit}/>}
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
  return {
    textSubmit: (payload) => dispatch(updateProfileTextFieldsRequest(payload)),
    avatarSubmit: (payload) => dispatch(updateProfileImagesRequest(payload,"avatar")),
    photoSubmit: (payload) => dispatch(updateProfileImagesRequest(payload,"photo")),
    usernameSubmit: (payload) => dispatch(changeUsernameRequest(payload)),
    successToggle: () => dispatch(updateUserProfileExecutingSuccess()),
    deleteErrors: () => dispatch(deleteUserProfileError()),
    getUserProfile: (userName) => { dispatch(getUserProfileRequest(userName)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserBlogUpdating)