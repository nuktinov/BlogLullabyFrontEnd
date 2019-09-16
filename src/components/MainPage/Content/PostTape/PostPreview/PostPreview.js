import React, { useState } from "react"
import { Link } from 'react-router-dom'
import UserView from '../../UserView/UserView'
import './PostPreview.css'
import dateFormatter from '../../../../../logicElements/dateFormatter'

class PostPreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          height: 40
      }
      this._isMounted = false;
    }
		
    componentDidMount() {
        this._isMounted = true;
        const img = new Image(); 
        const setHeight = (height) => this._isMounted && this.setState({ height });
        const width = document.querySelector('.preview').offsetWidth;
        img.onload = function() {
            const height = (this.height * width)/this.width;
            setHeight(height - height/100*2.5);
        }
        img.src = this.props.post.mainImageUrl;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
	
  
    render() {
        const post = this.props.post;
        return post == null ? null : (
                <div className="postPreview">
                    <UserView 
                        userView={post.author}
                    />
                    <Link to={`/post/${post.id}`} >
                        <div className="preview" 
                        style={{ 
                            backgroundImage: `url(${post.mainImageUrl})`,
                            height: `${this.state.height}px`,
                            maxHeight: "500px",
                        }}>
                            <div>
                                <span>{post.title}</span>
                            </div>
                        </div>
                    </Link>
                    <div className='postPreviewData'>
                        <data>
                            <time>
                                {dateFormatter(post.date)}
                            </time>
                            <p>Visits: {post.visits}</p>
                        </data>
                    </div>
                </div>
        )
    }
}

export default PostPreview;
