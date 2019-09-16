import React from 'react';
import dateFormatter from '../../../../../logicElements/dateFormatter'
import UserView from '../../UserView/UserView'
import { getPostRequest, clearPost } from '../../../../../store/post'
import { connect } from 'react-redux'
import './PostDisplay.css'

class Post extends React.Component {
  constructor(props) {
    super(props);
 
  }

  componentWillMount() {
    this.props.getPostRequest(this.props.match.params.id);
  }

  componentWillUnmount() { 
    //this.props.clearPostList();   
  }

  render() {
    const post = this.props.postState.post;

    return (
      <div >   
        {post==null ? null : (
          <div className="PostDisplay">
            <UserView userView={post.author}/>
            <h2>{post.title}</h2>
            <img 
              src={post.mainImageUrl}
              alt={post.title}
            />
            {post.bodyBlocks == null ? null : post.bodyBlocks.map((block, index) => block.blockType=='text' 
              ? (<p key={index}> {block.content} </p>)
              : (<img key={index} src={block.content} />))
            }  
            <div className='postPreviewData'>
              <data>
                <time>
                  {dateFormatter(post.date)}
                </time>
                <p>Visits: {post.visits}</p>
              </data>
            </div> 
          </div>)
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
        getPostRequest: (payload) => dispatch(getPostRequest(payload)),
      //clearPostList:() => {dispatch(clearPostList())}
  }
}

const mapStateToProps = state => {
  return {
    postState: state.post
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)