import React from 'react';
import Message from '../../Message/Message'
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
        }
        ///
        ////////////////// нужное позже
        /*
        if(this.props.messages != null) {
            const mess = this.props.messages.pop();
            console.log(!mess.isRead)
            console.log(mess.sender != this.props.accountUsername)
            if(!mess.isRead && mess.sender != this.props.accountUsername)
            {
                console.log("read")
                this.props.read(mess.id);
            }
        }*/
    }

    /*componentDidUpdate() {
        if(this.props.messages != null) {
            const mess = this.props.messages.pop();
            if(!mess.isRead && mess.owner != this.props.accountUsername)
            {
                this.props.read(mess.Id);
            }
        }
    }*/

    componentWillUnmount() {
    }

    checkOwner(username){
        const result = this.props.accountUsername == username ?  true : false;
        return result;
    }

    render() {
        return (
            <div className="MessageDisplay"> 
                {this.props.messages && (
                    <ul> 
                        {this.props.messages.map((message) => 
                            <li key={message.id}>
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
