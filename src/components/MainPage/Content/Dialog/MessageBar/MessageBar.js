import React from 'react';
import { connect } from 'react-redux'
import MessageDisplay from './MessageDisplay/MessageDisplay'
import WritingMessagePanel from './WritingMessagePanel/WritingMessagePanel'
import { getDialogRequest, sendMessageRequest } from '../../../../../store/dialog/dialog'
import './MessageBar.css'

class MessageBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        const element = document.querySelector("#pageFooter")
        element.style.visibility = "hidden";
        element.style.height = "0px";
    }

    componentWillUnmount() {
        const element = document.querySelector("#pageFooter")
        element.style = null; 
    }

    sendMessage(messageText) {
        const dialogId = this.state.id;
            const mess = {
                dialogId,
                body: messageText
            }
        this.props.sendMessage(mess)
        return true;
    }

    updateDisplay() {
        //console.log("update")
        this.props.getDialog(this.state.id);
    }
    render() {
        return (
            <div className="MessageBar">
                <p>{this.props.dialog.title}</p>
                <MessageDisplay 
                    updateDisplay={() => this.updateDisplay()} 
                    messages={this.props.dialog.messages}
                    accountUsername={this.props.accountUsername}/>
                <WritingMessagePanel sendMessage={(message) => this.sendMessage(message)}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDialog: (id) => { dispatch(getDialogRequest(id)) },
        sendMessage: (payload) => { dispatch(sendMessageRequest(payload)) }
		//clearDialogList: () =>{dispatch(clearDialogList())}
    }
}

const mapStateToProps = state => {
    return {
        accountUsername: state.authentication.username,
        dialog: state.dialog.dialog ? state.dialog.dialog : {title: '', messages: null, members: null},
	    loading: state.dialog.loading,
	    errorList: state.dialog.errorList
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBar)