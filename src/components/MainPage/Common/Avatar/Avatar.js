import React from 'react';
import checkOnline from '../../../../logicElements/checkOnline'
import './Avatar.css'

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: "height",
      avatarUrl: this.props.profile.avatarUrl
    }
    this._isMounted = false;
  }
    
  componentWillMount() {
    this._isMounted = true;
    this.checkAvatar(this.props.profile.avatarUrl)
  }

  checkAvatar(avatarUrl) {
    const img = new Image(); 
    const setWidth = () => this._isMounted && this.setState({property: "width"});
    const setHeight = () => this._isMounted && this.setState({property: "height"});
    const setAvatarUrl = () => this._isMounted && this.setState({avatarUrl});
    const setNotLoadAvatarUrl = () => {this._isMounted && this.setState({avatarUrl:"/common/Not_Load_Image.jpg"})}
    img.onload = function() {
      this.height > this.width ? setWidth() : setHeight();
      setAvatarUrl();
    }
    img.onerror = function(){
      setNotLoadAvatarUrl()
    }
    img.src = avatarUrl;
  }

  componentDidUpdate() {
    if(this.props.profile.avatarUrl != this.state.avatarUrl)
      this.checkAvatar(this.props.profile.avatarUrl)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
    
  render() {
    const profile = this.props.profile;
    
    return (
      <div className={`avatar ${checkOnline(profile.lastVisit)}`} >
        <img 
          src={this.state.avatarUrl}
          alt="profile avatar"
          style={{[this.state.property]:"100%"}}
        />
      </div>
    )
  }
}