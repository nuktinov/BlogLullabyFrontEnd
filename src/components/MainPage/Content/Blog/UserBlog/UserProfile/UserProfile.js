import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { getUserProfileRequest, deleteUserProfileError } from '../../../../../../store/userProfile'
import { postListRequest, clearPostList } from '../../../../../../store/postList'
import Avatar from '../../../../Common/Avatar/Avatar'

import PostTape from '../../../PostTape/PostTape'
import TextInfo from './TextInfo'
import './UserProfile.css'
class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      this.init = {
            sortingBy: 1,
            filterBy: 1,
            searchText: this.props.match.params.username,
            pageSize: 2,
            pageNumber: 0
      };
      this.state = this.init;
    }

    updatePaging(pageNumber) {
      this.setState({ ...this.state, pageNumber });
      this.props.updatePostList({...this.state, pageNumber })
    }
    
    componentDidMount() {
      this.setState(this.init)
      this.props.clearPostList();
      this.props.updatePostList(this.init);      
    }

    componentWillUnmount() {
      this.props.clearPostList();   
    }
    
    render() {
      const profile = this.props.profile;
        return (
            <div className="userProfile">
                <div className='basicBlock'>
                  <Avatar profile={profile} />
                  <TextInfo profile={profile} />
                </div>
                <p>Posts</p>
                {this.props.authUsername 
                  && !this.props.authUsername.localeCompare(this.props.match.params.username) 
                  && <Link to={`/post/create`}>Add new post</Link>}
                <PostTape
                  postList={this.props.postList}
                  sendCriterion={(pageNumber) => {this.updatePaging(pageNumber)} }
                  pageNumber = {this.state.pageNumber}
                />
            </div>
        ) 
    }
}

const mapStateToProps = state => {
    return {
      profile: state.userProfile.profile,
      authUsername: state.authentication.username,
      postList: state.postList
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updatePostList: (payload) => dispatch(postListRequest(payload)),
      clearPostList:() => dispatch(clearPostList())
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
