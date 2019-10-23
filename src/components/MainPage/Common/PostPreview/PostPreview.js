import React from "react"
import { Link } from 'react-router-dom'
import UserView from '../UserView/UserView'
import './PostPreview.css'
import dateFormatter from '../../../../logicElements/dateFormatter'

class PostPreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          height: "8vh",
          imageUrl: null
      }
      this._isMounted = false;
    }
		
    componentDidMount() {
        this._isMounted = true;
        const img = new Image(); 
        const setHeight = (height) => this._isMounted && 
            this.setState({ 
                height, 
                imageUrl: `url(${this.props.post.mainImageUrl})`
            });
        
        const width = document.querySelector('.preview').offsetWidth;
        img.onload = function() {
            const height = (this.height * width)/this.width;
            setHeight(`${height - height/100*2.5}px`);
        }
        img.onerror = function() {
            //setHeight("8vh");
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
                                backgroundImage: this.state.imageUrl,
                                height: this.state.height,
                                maxHeight: "500px",
                            }}>
                            <div>
                                {post.title &&
                                    <span>{post.title}</span>
                                }
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
