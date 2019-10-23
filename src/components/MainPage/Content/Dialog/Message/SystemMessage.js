import React from "react"
import UserView from '../../../Common/UserView/UserView'
import dateFormatter from '../../../../../logicElements/dateFormatter'
import './Message.css'
import './MessagePreview.css'

//var a;

export default function SystemMessage({ message }) {
	if(message) {
		//let className = "";
		//if(!message.isRead) 
		//	className = "notRead";
    	return (
			<div className='sysnemMessage'>
            	{message.body}
			</div>
		)
	}
	return null;
}