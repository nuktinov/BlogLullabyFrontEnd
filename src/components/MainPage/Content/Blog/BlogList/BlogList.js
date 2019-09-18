import React from 'react';
import { connect } from 'react-redux'
import { userListRequest, clearUserList } from '../../../../../store/userList'
import ScrollList from '../../ScrollList/ScrollList'
import UserView from '../../UserView/UserView'
import TextInput from '../../../Common/TextInput/TextInput'

class BlogList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageNumber: 0,
        pageSize: 10,
        username: ''
      };
    }
        
    componentWillMount() {
        this.props.getUserList(this.state);
    }
    componentDidMount() {
    }

  
    componentWillUnmount() {
      this.props.clear()
    }

    updateCriterion(username) {
        this.props.clear();
        this.setState({ username , pageNumber: 0})
        this.props.getUserList({ ...this.state, username, pageNumber: 0});
    }

    updatePageNumber(pageNumber) {
        this.setState({ pageNumber });
        this.props.getUserList({ ...this.state, pageNumber});
    }
    
    listElement(profile) {
        return <UserView userView={profile}/>
    }

    render() {
        const userList = this.props.userList;
        return (
			<div className='userList'>
                <TextInput
                   span="Username"
                   value={this.state.username}
                   onChange={(e) => this.updateCriterion(e.target.value)}
                />
                <ScrollList 
                    errorList={userList.errorList}
                    loading={userList.loading}
                    isAll={userList.isAll}
                    pageNumber={this.state.pageNumber}
                    updatePageNumber={(page) => this.updatePageNumber(page)}
                    listElement={this.listElement}
                    elements={userList.users}
                />
			</div>
		)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserList: (payload) => dispatch(userListRequest(payload)),
		clear: () =>dispatch(clearUserList())
    }
}

const mapStateToProps = state => {
    return {
      userList: state.userList,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)