import React from 'react';
import './TextInput.css'

export default function TextInput({ span, name, value, onChange }) {
    return (
        <label className="textInput">
            {span && span}
            <input 
            type="text" 
            name={name}
            value={value ? value : ''}
            onChange={onChange} />
        </label>
    )
    
}