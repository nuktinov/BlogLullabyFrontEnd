import React from 'react';
import dateFormatter from '../../../../../logicElements/dateFormatter'
import UserView from '../../../Common/UserView/UserView'
import { getPostRequest, clearPost } from '../../../../../store/post'
import { connect } from 'react-redux'
import './PostDisplay.css'

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.props.getPostRequest(this.props.match.params.id);
    this.state = {
      showMainImage: false
    }
  }

  componentDidUpdate() {
    const img = new Image(); 
    const set = (showMainImage) => this.setState({ showMainImage });
    const state = this.state.showMainImage;
    if(this.props.postState.post) {
      img.onload = function() {
        if(state != true)
          set(true)
      }
      img.onerror = function(){
        if(state != false)
          set(false)
      }
      img.src = this.props.postState.post.mainImageUrl;
    }
  }

  componentWillUnmount() { 
    this.props.clear();   
  }

  render() {
    const post = this.props.postState.post;

    return (
      <div >   
        {post==null ? null : (
          <div className="PostDisplay">
            <UserView userView={post.author}/>
            <h2>{post.title}</h2>
            {this.state.showMainImage && 
              <img 
              src={post.mainImageUrl}
              alt={post.title}
              />}
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
    clear:() => {dispatch(clearPost())}
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