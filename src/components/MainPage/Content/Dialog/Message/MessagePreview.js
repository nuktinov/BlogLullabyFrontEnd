import React from "react"
import UserView from '../../../Common/UserView/UserView'
import dateFormatter from '../../../../../logicElements/dateFormatter'
import './Message.css'
import './MessagePreview.css'

//var a;

function MessagePreview({ message }) {
	if(message) {
		let className = "";
		if(!message.isRead) 
			className = "notRead";
    	return (
			<div className='messagePreview'>
				<UserView userView={message.sender}/>
            	<div className="messagePreviewData" id={`${className}`}>
                	<time>{dateFormatter(message.date)}</time>
					<div className="box-text">
						{message.body}
					</div>
                </div>
			</div>
		)
	}
	return null;
}

export default MessagePreview;

