import React from 'react';

export default function ErrorList({ errorList }) {
    if(errorList) {
        return (
            <ul>
                {console.log(errorList)} 
                {errorList.map((error, index) => 
                    <li key={index.toString()}>
                        {error}
                    </li>)}
            </ul>
        )
    }
    return null;
}