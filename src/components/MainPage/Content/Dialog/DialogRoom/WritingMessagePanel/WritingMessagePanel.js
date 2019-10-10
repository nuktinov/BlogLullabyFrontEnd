import React, { useState } from "react"
import TextArea from '../../../../Common/TextArea/TextArea'
import './WritingMessagePanel.css'
function WritingMessagePanel({ sendMessage }) {
    const [message, setMessage] = useState('');
    function onChange(e) {
        e.preventDefault();
        setMessage(e.target.value)
    }

    function send(e) {
        e.preventDefault();
        sendMessage(message)
            .then((success) => success && setMessage(''))
    }
    return (
        <form 
            className='writingMessagePanel'
            onSubmit={send}>
            <label>
                Message:
                <TextArea 
                    name="name"
                    value={message}
                    onChange={onChange}
                    maxHeight="30vh"
                />
            </label>
            <input type="submit" value="Send" />
        </form>
		)
}

export default WritingMessagePanel;