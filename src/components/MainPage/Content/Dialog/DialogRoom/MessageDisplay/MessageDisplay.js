import React from 'react';
import Message from '../../Message/Message'
import checkVisible from '../../../../../../logicElements/checkVisible'
import './MessageDisplay.css'

class MessageDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.scrollingDown = true;
        this.scrollHeightAfterLoading = null
        this.messagesCount = 0
    }

    componentDidUpdate() {
        // функционал для сохранения скролла при получении сообщения
        const element = document.documentElement;
        if(this.scrollingDown)
            element.scrollTop = element.scrollHeight;
        
        // функционал для сохранения скролла при загрузке предыдущих сообщений
        if(this.scrollHeightAfterLoading && (this.messagesCount < this.props.messages.length)) {
            element.scrollTop = element.scrollHeight - this.scrollHeightAfterLoading;
            this.scrollHeightAfterLoading = null;
        }
    }

    componentWillMount() {
    }
    componentDidMount() {
        window.onscroll = () => { 
            
            // функционал для сохранения скролла при получении сообщения
            this.scrollingDown = false;
            const element = document.documentElement;
            if(Math.floor(element.scrollTop + element.clientHeight) >= (element.scrollHeight - 3) 
                && this.scrollingDown != true) {
                this.scrollingDown = true
            }

            // функционал для сохранения скролла при загрузке предыдущих сообщений
            if(document.documentElement.scrollTop == 0) {
                this.scrollHeightAfterLoading = document.documentElement.scrollHeight;
                this.messagesCount = this.props.messages.length;
                this.props.loadPreviousMessages();
            }

            // функционал для отметки сообщений прочитанными
            let lastMess = {
                date: new Date(1950, 0, 1).toString()
            }
            this.props.messages && 
            this.props.messages.map((message) => {
                let target = document.querySelector(`#mess${message.id}`);
                checkVisible(target) && !message.isRead && message.sender.username !== this.props.accountUsername
                    && new Date(message.date) > new Date(lastMess.date) 
                    && (lastMess = message)
            });
            if(lastMess.id)
                this.props.readMessage(lastMess.id)
        }
    }

    componentWillUnmount() {
        window.onscroll =  null;
    }

    checkOwner(username){
        const result = this.props.accountUsername == username ?  true : false;
        return result;
    }

    render() {
        return (
            <div className="messageDisplay"> 
                {this.props.messages && (
                    <ul> 
                        {this.props.messages.map((message) => 
                            <li key={message.id} 
                                id={`mess${message.id}`} 
                                className={message.isRead ? null : "notReadMessage"}>
                                <Message 
                                    message={message}
                                    isAccountMessage={this.checkOwner(message.sender.username)}
                                />
                            </li>)}
                    </ul>
                )}
            </div>
        );
    }
}

export default MessageDisplay
