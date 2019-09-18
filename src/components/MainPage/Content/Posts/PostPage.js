import React from 'react';
import { postListRequest, clearPostList } from '../../../../store/postList'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FilterPanel from './FilterPanel/FilterPanel'
import PostTape from '../PostTape/PostTape'
import ScrollList from '../ScrollList/ScrollList'
import PostPreview from '../PostTape/PostPreview/PostPreview'
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

  listElement(post) {
    return <PostPreview post={post}/>
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

        <ScrollList 
          errorList={this.props.postList.errorList}
          loading={this.props.postList.loading}
          isAll={this.props.postList.isAll}
          pageNumber={this.state.pageNumber}
          updatePageNumber={(page) => this.updatePaging(page)}
          listElement={this.listElement}
          elements={this.props.postList.postPreviews}
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