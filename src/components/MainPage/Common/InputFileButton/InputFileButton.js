import React from 'react';
import './InputFileButton.css'

function InputImageButton ({name, onChange}) {

    return (
        <div className="file-upload">
            <label>
                <input 
                    className="uploade-file"
                    type="file" 
                    accept="image/*"
                    name={name} 
                    onChange={onChange} 
                />
                <span>Upload image</span>
            </label>
        </div>
    )
};

export default InputImageButton;