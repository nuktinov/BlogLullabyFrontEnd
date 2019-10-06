import React from 'react';
import { connect } from 'react-redux'
import MessageDisplay from './MessageDisplay/MessageDisplay'
import WritingMessagePanel from './WritingMessagePanel/WritingMessagePanel'
import Loading from '../../../Common/Loading/Loading'
import dialogHub from '../../../../../hubs/dialogHub'
import './DialogRoom.css'

class DialogRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogId: this.props.match.params.id,
        };
    }

    componentDidMount() {
        // скрываем подвал
        const element = document.querySelector("#pageFooter")
        element.style.visibility = "hidden";
        element.style.height = "0px";
        // подключаемсяя к хабу и получаем диалог
        this.hub = new dialogHub();
        this.hub.connect(this.props.match.params.id);
    }

    componentWillUnmount() {
        //возвращаем подвал
        const element = document.querySelector("#pageFooter")
        element.style = null; 
        //откючаемся от хаба 
        this.hub.stop();
    }

    sendMessage(messageText) {
        const mess = {
            dialogId: this.state.dialogId,
            body: messageText,
        }
        return this.hub.sendMessage(mess);
    }

    loadPreviousMessages() {
        if(!this.props.IsAllMessagesLoading) {
            this.hub.loadPreviousMessages(this.state.dialogId, this.props.dialog.messages.length);
        }
    }
    
    render() {
        const dialog = this.props.dialog
        return (
            <div className="MessageBar">
                <p>{dialog.title}</p>
                {dialog.loading 
                    ? <Loading />
                    : <MessageDisplay  
                        messages={this.props.dialog.messages}
                        accountUsername={this.props.accountUsername}
                        loadPreviousMessages={() => this.loadPreviousMessages()}
                    />
                }
                <WritingMessagePanel sendMessage={(message) => this.sendMessage(message)}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accountUsername: state.authentication.username,
        dialog: state.dialog.dialog ? state.dialog.dialog : {title: '', messages: null, members: null},
	    loading: state.dialog.loading,
        errorList: state.dialog.errorList,
        userProfile: state.userProfile.profile,
        IsAllMessagesLoading: state.dialog.IsAllMessagesLoading
    }
}

export default connect(mapStateToProps)(DialogRoom)