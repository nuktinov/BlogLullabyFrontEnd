import React from 'react';
import Avatar from '../../../../Common/Avatar/Avatar'

class UserAvatarUpdating extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          file: null,
          imagePreviewUrl: props.profile.avatarUrl
        };
    }

    _deleteSubmit(e) {
        e.preventDefault();
        this.setState({
            file: null,
            imagePreviewUrl: this.props.profile.avatarUrl
        });
        e.target.files = [];
    }

    _uploadFile(e) {
      e.preventDefault();
      this.props.avatarSubmit(this.state.file)
    }
    
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
  
  render() {
    return (
      <div className="previewComponent">
        Update userAvatar:
        <form>
          <input className="fileInput" 
            type="file" 
            accept="image/*"
            onChange={(e)=>this._handleImageChange(e)} 
          />
        </form>
        <Avatar profile={{...this.props.profile, avatarUrl: this.state.imagePreviewUrl}} />
        <button className="submitButton" 
          onClick={(e)=>this._uploadFile(e)}>Upload Image</button>
        <button className="submitButton" 
          onClick={(e)=>this._deleteSubmit(e)}>Delete Image</button>
      </div>
    )
  }
}

export default UserAvatarUpdating