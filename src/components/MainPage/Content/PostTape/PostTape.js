import React from 'react';
import PostPreview from './PostPreview/PostPreview'
import Loading from '../../Common/Loading/Loading'
import ErrorList from '../../Common/ErrorList/ErrorList'
import './PostTape.css'

export class PostTape extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageNumber: 0
      };
    }

    componentDidMount() {
        this.timerID = setInterval( () => this.scrolling(), 1500)
    }

    scrolling() {
        const element = document.documentElement;
        if(element != null) {
            if( element.scrollTop + element.clientHeight > element.scrollHeight - (0.1 * element.clientHeight)) {
                if(!this.props.postList.loading 
                    && !this.props.postList.errorList
                    && !this.props.postList.isAllPosts) {
                this.props.sendCriterion(this.props.pageNumber + 1) 
                }                  
            }
        }
    }

    componentWillUpdate() {
        
    }

    componentDidUpdate() {

    }
  
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
  
    render() {
        const loading = this.props.postList.loading
        const errorList = this.props.postList.errorList
        return (
            <div className="postList">
                <ul className='postTape'> 
                    {this.props.postList.postPreviews.map((post) => 
                        <li key={post.id.toString()}>
                            <PostPreview post={post}/>
                        </li>)}
                </ul>
                {loading && <Loading loading={loading}/>}
                {errorList && <ErrorList errorList={errorList}/>}    
            </div>
        )
    }
}

export default PostTape