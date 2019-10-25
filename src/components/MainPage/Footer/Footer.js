import React from 'react';
import './Footer.css'

export default function Footer () {
    return (
        <footer id="pageFooter">
            <p>If you want to hire me you can let me know:</p>
                <div className="contact">
                    <img 
                        src="/icons/Gmail_Icon.png"
                        alt="gmail"
                    />
                    <p>nuktinov@gmail.com</p>
                </div>
                <div className="contact">
                    <img 
                        src="/icons/Skype_Icon.png"
                        alt="skype"
                    />
                    <p>mySkype</p>
                </div>
        </footer>
    )
};