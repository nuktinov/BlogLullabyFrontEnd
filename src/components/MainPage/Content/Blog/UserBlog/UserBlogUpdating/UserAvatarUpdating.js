import React from 'react';
import Avatar from '../../../../Common/Avatar/Avatar'
import UploadImage from '../../../../Common/InputFileButton/InputFileButton'
import DeleteButton from '../../../../Common/DeleteButton/DeleteButton'

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
      <div className="avatarUpdating">
        <span>Avatar:</span>
        <div>
          <Avatar profile={{...this.props.profile, avatarUrl: this.state.imagePreviewUrl}} />
          <div>
            <UploadImage 
              onChange={(e)=>this._handleImageChange(e)}
            />
            <DeleteButton onClick={(e)=>this._deleteSubmit(e)}/>
          </div>
        </div>
        <button className="saveBtn" 
          onClick={(e)=>this._uploadFile(e)}>Save</button>
      </div>
    )
  }
}

export default UserAvatarUpdating