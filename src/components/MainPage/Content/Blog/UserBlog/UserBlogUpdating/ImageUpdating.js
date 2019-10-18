import React, { useState } from 'react'
import Avatar from '../../../../Common/Avatar/Avatar'
import UploadImage from '../../../../Common/InputFileButton/InputFileButton'
import DeleteButton from '../../../../Common/DeleteButton/DeleteButton'

export default function ImageUpdating({ imageSubmit, profile, imageName }) {
    !profile && (profile = {})
    const [image, setImage] = useState({
        file: null,
        previewUrl: imageName === 'avatar' 
        ? profile.avatarUrl
        : profile.photoUrl
    });
    
    function _deleteSubmit(e) {
        e.preventDefault();
        setImage({
            file: null,
            previewUrl: profile.avatarUrl
        });
        e.target.files = [];
    }
    
    function _uploadFile(e) {
        e.preventDefault();
        imageSubmit(image.file, imageName)
    }
    
    function _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            setImage({
                file: file,
                previewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }
      
    if(imageName === 'avatar')
        return avatar( profile, image, _deleteSubmit, _uploadFile, _handleImageChange )
    if(imageName === 'photo')
        return photo( image, _deleteSubmit, _uploadFile, _handleImageChange )
    return null
}

function avatar( profile, image, _deleteSubmit, _uploadFile, _handleImageChange ) {
    return (
        <div className="avatarUpdating">
            <span>Avatar:</span>
            <div>
                <Avatar profile={{...profile, avatarUrl: image.previewUrl}} />
                <div>
                    <UploadImage 
                        onChange={(e)=>_handleImageChange(e)}
                    />
                    <DeleteButton onClick={(e)=>_deleteSubmit(e)}/>
                </div>
            </div>
            <button className="saveBtn" 
                onClick={(e)=>_uploadFile(e)}>Save</button>
        </div>
    )
}

function photo( image, _deleteSubmit, _uploadFile, _handleImageChange ) {
    return (
        <div className="photoUpdating">
            <span>Photo:</span>
            <div>
                <img src={image.previewUrl}></img>
                <div>
                    <UploadImage 
                        onChange={(e)=>_handleImageChange(e)}
                    />
                    <DeleteButton onClick={(e)=>_deleteSubmit(e)}/>
                </div>
            </div>
            <button className="saveBtn" 
                onClick={(e)=>_uploadFile(e)}>Save</button>
        </div>
    )
}