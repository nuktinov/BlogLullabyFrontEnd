import React from "react"
import UserView from '../../../Common/UserView/UserView'
import dateFormatter from '../../../../../logicElements/dateFormatter'
import './Message.css'

function Message({ message, isAccountMessage }) {

	if(message)
    	return (
			<div className='message'>
				<div className={isAccountMessage ? 'dialogMessageRevers' : 'dialogMessage' }>
					<UserView 
						userView={ message.owner }
						showName={!isAccountMessage}
					/>
					
						<time>{dateFormatter(message.date)}</time>
						<p>{message.body}</p>
					
				</div>
			</div>
		)
	return null;
}

export default Message;