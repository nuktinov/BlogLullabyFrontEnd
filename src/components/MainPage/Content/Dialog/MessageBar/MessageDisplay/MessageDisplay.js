import React from 'react';
import { connect } from 'react-redux'
import Message from '../../Message/Message'
import { readMessageRequest } from '../../../../../../store/dialog/dialog'
import './MessageDisplay.css'
class MessageDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollingDown: true
        };
    }

    componentWillUpdate() {
        const element = document.documentElement;
        if(this.state.scrollingDown)
            element.scrollTop = element.scrollHeight;
        if(Math.floor(element.scrollTop + element.clientHeight) >= (element.scrollHeight - 5) && this.state.scrollingDown != true)
            this.setState({ scrollingDown: true})
    }

    componentWillMount() {
        this.timerID = setInterval( () => {this.props.updateDisplay()}, 1500);
    }
    componentDidMount() {
        window.onscroll = () => this.setState({scrollingDown: false})
        if(this.props.messages != null) {
            const mess = this.props.messages.pop();
            console.log(!mess.isRead)
            console.log(mess.sender != this.props.accountUsername)
            if(!mess.isRead && mess.sender != this.props.accountUsername)
            {
                console.log("read")
                this.props.read(mess.id);
            }
        }
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
        clearInterval(this.timerID)
    }

    onScrolling(e) {
        this.setState({scrollingDown: false})
    }

    checkOwner(username){
        const result = this.props.accountUsername == username ?  true : false;
        return result;
    }


    render() {
        return (
            <div className="MessageDisplay" onScroll={(e) => this.onScrolling(e)}> 
                {this.props.messages && (
                    <ul> 
                        {this.props.messages.map((message, index) => 
                            <li key={index.toString()}
                                >
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

const mapStateToProps = state => {
    return {
      dialogs: state.dialogList.dialogs,
	  loading: state.dialogList.loading,
      errorList: state.dialogList.errorList,
      accountUsername: state.authentication.username, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        read: (payload) => { dispatch(readMessageRequest(payload)) }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageDisplay)
