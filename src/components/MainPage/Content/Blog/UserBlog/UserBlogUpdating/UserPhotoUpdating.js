import React from 'react';
import UploadImage from '../../../../Common/InputFileButton/InputFileButton'
import DeleteButton from '../../../../Common/DeleteButton/DeleteButton'

class UserPhotoUpdating extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          file: null,
          imagePreviewUrl: props.profile.photoUrl
        };
    }

    _deleteSubmit(e) {
        e.preventDefault();
        this.setState({
            file: null,
            imagePreviewUrl: this.props.profile.photoUrl
        });
        e.target.files = [];
    }

    _uploadFile(e) {
      e.preventDefault();
      this.props.photoSubmit(this.state.file)
    }
    
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
      const save = (imagePreviewUrl) => this.setState({
        file,
        imagePreviewUrl
      });
      reader.onloadend = () => {
        save(reader.result)
      }
      reader.readAsDataURL(file)
    }
  
  render() {
    return (
      <div className="photoUpdating">
        <span>Photo:</span>
        <div>
          <img src={this.state.imagePreviewUrl}></img>
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

export default UserPhotoUpdating