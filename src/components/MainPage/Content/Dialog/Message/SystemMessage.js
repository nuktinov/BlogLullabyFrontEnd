import React from "react"
import './Message.css'
import './MessagePreview.css'

export default function SystemMessage({ message }) {
	if(message) {
    	return (
			<div className='systemMessage'>
            	{message.body}
			</div>
		)
	}
	return null;
}