import React from 'react';
import { connect } from 'react-redux'
import Message from '../../Message/Message'
import './MessageDisplay.css'
class MessageDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollingDown: true
        };
    }

    componentWillUpdate() {
        const element = document.querySelector(".MessageDisplay");
        if(this.state.scrollingDown)
            element.scrollTop = element.scrollHeight;
        if(Math.floor(element.scrollTop + element.clientHeight) == element.scrollHeight && this.state.scrollingDown != true)
            this.setState({ scrollingDown: true})
    }

    componentDidMount() {
        this.timerID = setInterval( () => {this.props.updateDisplay()}, 1500);
    }

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
                                    isAccountMessage={this.checkOwner(message.owner.username)}
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
	  errorList: state.dialogList.errorList
    }
  }


export default connect(
    mapStateToProps
)(MessageDisplay)
