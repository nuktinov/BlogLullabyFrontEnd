import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userListRequest, clearUserList } from '../../../../../store/userList'
import ScrollList from '../../../Common/ScrollList/ScrollList'
import UserBlogPreview from '../UserBlogPreview/UserBlogPreview'
import FilterPanel from './FilterPanel'
import './BlogList.css'

class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                pageNumber: 0,
                pageSize: 10,
                username: '',
                fullName: '',
                city: '',
                online: false
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

    updateCriterion(e) {
        this.props.clear();
        let criterion;
        if(e.target.name === "online") 
            criterion = { [e.target.name]: !this.state.online , pageNumber: 0};
        else
            criterion = { [e.target.name]: e.target.value , pageNumber: 0};
        this.setState(criterion);
        this.props.getUserList({ ...this.state, ...criterion});
    }

    updatePageNumber(pageNumber) {
        this.setState({ pageNumber });
        this.props.getUserList({ ...this.state, pageNumber});
    }

    elementView(profile) {
        return (
            <div className="userListElement">
                <UserBlogPreview profile={profile}/>
                <Link to={`/blog/:${profile.username}`}> Check  </Link>
            </div>
        )
    }

    render() {
        return (
			<div className='userList'>
                <h3>Blog search</h3>
                <FilterPanel 
                    setFilter={(e) => this.updateCriterion(e)}
                    filters={this.state}
                />
                <ScrollList 
                    list={this.props.userList}
                    pageNumber={this.state.pageNumber}
                    updatePageNumber={(page) => this.updatePageNumber(page)}
                    elementView={this.elementView}
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