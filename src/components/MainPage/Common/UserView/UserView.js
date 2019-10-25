import React from "react"
import { Link } from 'react-router-dom'
import checkOnline from '../../../../logicElements/checkOnline'
import './UserView.css'

class UserView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            property: "height",
            avatarUrl: this.props.userView.avatarUrl,
            showName: true
      }
      this._isMounted = false;
    }
		
    componentDidMount() {
        if(this.props.showName !== undefined)
            this.setState({showName: this.props.showName});
        this._isMounted = true;
        const img = new Image(); 
        const setWidth = () => this._isMounted && this.setState({property: "width"});
        const setAvatarUrl = () => {this._isMounted && this.setState({avatarUrl:"/common/Not_Load_Image.jpg"})}
        img.onload = function() {
            if(this.height > this.width)
                setWidth();   
        }
        img.onerror = function(){
            setAvatarUrl()
        }
        img.src = this.props.userView.avatarUrl;       
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
	
    render() {
        return (
            <div className='userView'>
                <Link  to={`/blog/${this.props.userView.username}`} className={ `${checkOnline(this.props.userView.lastVisit)}`}>  
                    <img 
                        src={this.state.avatarUrl}
                        alt={this.props.userView.username} 
                        style={{[this.state.property]:"100%"}}
                    />
                </Link>
                {this.state.showName && <p>{this.props.userView.username} </p>}
            </div>
        )
    }
}

export default UserView;