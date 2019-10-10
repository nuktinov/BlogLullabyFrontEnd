import React from 'react';
import './ErrorView.css'

export default function ErrorView({ errorList }) {

    function fadeOutEffect() {
        var fadeTarget = document.querySelector(".errorView");
        var fadeEffect = fadeTarget && setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.05;
            } else {
                clearInterval(fadeEffect);
            }
        }, 100);
    }

    if(errorList) {
        setTimeout(fadeOutEffect, 1000);
        return (
            <ul className="errorView">
                {errorList.map((error, index) => 
                    <li key={index.toString()}>
                        {error}
                    </li>)}
            </ul>
        )
    }
    return null;
}