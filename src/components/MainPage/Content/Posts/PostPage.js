import React from 'react';
import { postListRequest, clearPostList } from '../../../../store/postList'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FilterPanel from './FilterPanel/FilterPanel'
import PostTape from '../PostTape/PostTape'
import './PostPage.css'

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sortingBy: 0,
        filterBy: null,
        searchText: '',
        pageSize: 2,
        pageNumber: 0
    };
  }

  componentDidMount() {
    this.props.updatePostList(this.state);
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() { 
    this.props.clearPostList();   
  }

  updateCriterions(criterion) {
    this.setState({...criterion, pageNumber: 0}); 
    this.props.clearPostList();
    this.props.updatePostList({...this.state, ...criterion, pageNumber: 0})
  }

  updatePaging(pageNumber) {
    this.setState({ pageNumber });
    this.props.updatePostList({...this.state, pageNumber })
  }

  render() {
    return (
      <div className='postPage'>   
        <div className='postPageControlPanel'>     
          <FilterPanel sendCriterion={(criterion) => {this.updateCriterions(criterion)} }/>
          {this.props.logIn && 
            <Link to={`/post/create`}>
              Create
            </Link>
          }
        </div>
        <div className='postPageTape'>
        <PostTape
          postList={this.props.postList}
          sendCriterion={(pageNumber) => {this.updatePaging(pageNumber)} }
          pageNumber = {this.state.pageNumber}
        />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updatePostList: (payload) => dispatch(postListRequest(payload)),
      clearPostList:() => dispatch(clearPostList())
  }
}

const mapStateToProps = state => {
  return {
    postList: state.postList,
    logIn: state.authentication.logIn
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)