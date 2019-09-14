import React, { useState } from "react"
import './WritingMessagePanel.css'
function WritingMessagePanel({ sendMessage }) {
    const [message, setMessage] = useState('');
    function onChange(e) {
        e.preventDefault();
        setMessage(e.target.value)
    }

    function send(e) {
        e.preventDefault();
        const success = sendMessage(message);
        if(success) {
            setMessage('');
        }
    }
    	return (
                <form 
                className='writingMessagePanel'
                onSubmit={send}>
                    <label>
                        new message:
                        <textarea 
                        rows="4"
                        type="text" 
                        value={message}
                        onChange={onChange} />
                    </label>
                    <input type="submit" value="Send" />
                </form>
		)
}

export default WritingMessagePanel;