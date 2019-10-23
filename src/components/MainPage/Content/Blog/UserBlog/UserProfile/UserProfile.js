import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { postListRequest } from '../../../../../../store/postList'
import PostPreview from '../../../../Common/PostPreview/PostPreview'
import ScrollList from '../../../../Common/ScrollList/ScrollList'
import UserBlogPreview from '../../UserBlogPreview/UserBlogPreview'
import './UserProfile.css'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingBy: 1,
      filterBy: 1,
      searchText: this.props.match.params.username,
      pageSize: 2,
      pageNumber: 0,
      exactMatch: true
    };
  }

  updatePaging(pageNumber) {
    this.setState({ ...this.state, pageNumber });
    this.props.updatePostList({...this.state, pageNumber })
  }
    
  componentDidMount() {
    this.props.updatePostList(this.state);      
  }
    
  elementView(post) {
    return <PostPreview post={post}/>
  }

  render() {
    const profile = this.props.profile;
    return (
      <div className="userProfile">
        <UserBlogPreview profile={profile} />
        {this.props.authUsername 
          && !this.props.authUsername.localeCompare(this.props.match.params.username) 
          && <Link to={`/post/create`}>Add new post</Link>}
        <ScrollList 
          list={this.props.postList}
          updatePageNumber={() => this.updatePaging(this.state.pageNumber + 1)}
          elementView={this.elementView}
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
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)