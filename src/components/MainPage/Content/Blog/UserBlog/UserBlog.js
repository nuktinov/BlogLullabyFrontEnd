import React from 'react';
import { connect } from 'react-redux'
import {Switch, Route, Link} from 'react-router-dom'
import Loading from '../../../Common/Loading/Loading'
import ErrorList from '../../../Common/ErrorList/ErrorList'
import UserProfile from './UserProfile/UserProfile'
import UserAbout from './UserProfileAbout/UserAbout'
import { getUserProfileRequest, clearUserProfile } from '../../../../../store/userProfile'
import { clearPostList } from '../../../../../store/postList'
import './UserBlog.css'

class UserBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username
    };
    this.props.getUserProfile(this.state.username);  
  }
  
  componentWillUnmount() {
      this.props.clear();
  }
  
  render() {
    if(this.props.loading)
      return <Loading />
    else if(this.props.errorList)
      return <ErrorList errorList={this.props.errorList}/>
    else if(this.props.profile != null) return (
      <div>
        <div className="userBlogLinks">
          <Link to={`/blog/${this.state.username}`}>Blog</Link>
          <Link to={`/blog/${this.state.username}/about`}>About</Link>
          {(this.props.authUsername === this.state.username) 
            && <Link className="updatingLink" to="/blog/update">Update</Link>
          }
        </div>
        <Switch>
          <Route exact path={`/blog/:username`} component={UserProfile} />
          <Route path={`/blog/:username/about`} component={UserAbout} />
        </Switch>
      </div>
    )
    return null;
  }
}

const mapStateToProps = state => {
  return {
    logIn: state.authentication.logIn,
    authUsername: state.authentication.username,
    loading: state.userProfile.loading,
    errorList: state.userProfile.errorList,
    profile: state.userProfile.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: (userName) => {
    dispatch(getUserProfileRequest(userName))
    },
    clear: () => {
      dispatch(clearUserProfile())
      dispatch(clearPostList())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserBlog)