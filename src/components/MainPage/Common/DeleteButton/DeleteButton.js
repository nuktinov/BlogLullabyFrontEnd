import React from 'react';
import './DeleteButton.css'

export default function DeleteButton({ onClick }) {
    return (  
        <button 
            className='deleteBtn'
            onClick={onClick}>
            x
        </button>
    )
}