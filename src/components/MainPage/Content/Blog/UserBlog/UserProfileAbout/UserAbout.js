import React from "react"
import { connect } from 'react-redux'
import './UserAbout.css'

class UserAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgProperty: "width",
            photoUrl: this.props.profile.photoUrl,
            textStyle: null
        }
        this._isMounted = false;
    }
		
    componentDidMount() {
        this._isMounted = true;
        const img = new Image(); 
        const setHeight = () => this._isMounted && this.setState({imgProperty: "height"});
        const setNotLoadAvatarUrl = () => {this._isMounted && this.setState({photoUrl:"/common/Not_Load_Image.jpg"})}
        const setTextStyle = () => {
            this._isMounted && this.setState({
                textStyle: {
                    left: "23%",
                    top:"50%",
                    transform:"translate(-50%, -50%)"
                }
            })
        }
        img.onload = function() {
            if(this.height >= this.width) {
                setHeight();
                setTextStyle();
            }
        }
        img.onerror = function(){
            setNotLoadAvatarUrl()
        }
        img.src = this.state.photoUrl;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
  
    render() {
        const profile = this.props.profile;
        return profile == null ? null : (
            <div className="userProfileAbout">
                <h3>{profile.username}</h3>
                <div className='userPhoto'>
                    <img src={this.state.photoUrl} 
                        style={{
                            [this.state.imgProperty]: "100%"
                        }}/>
                    <span style={this.state.textStyle}>
                        {profile.specialization}
                    </span>
                </div>
                <p>{profile.description}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      profile: state.userProfile.profile
    }
}

export default connect(mapStateToProps)(UserAbout)