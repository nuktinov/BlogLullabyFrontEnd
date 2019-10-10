import React from 'react';
import './ErrorList.css'

export default function ErrorList({ errorList }) {
    if(errorList) {
        return (
            <ul className="errorList">
                {errorList.map((error, index) => 
                    <li key={index.toString()}>
                        <p>{error}</p>
                    </li>)}
            </ul>
        )
    }
    return null;
}