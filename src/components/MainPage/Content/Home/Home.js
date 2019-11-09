import React from 'react';
import { connect } from 'react-redux'
import SiteDescription from './SiteDescription/SiteDescription'
import { postListRequest, clearPostList } from '../../../../store/postList'
import "./Home.css"

export class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    criterion = {
        sortingBy: 0,
        filterBy: null,
        searchText: '',
        pageSize: 10,
        pageNumber: 0
    }

    componentDidMount() {
        this.props.updatePostList(this.criterion);
    }
  
    componentWillUnmount() {
        this.props.clearPostList();   
    }
  
    render() {
        return (
            <div className="home">
                <SiteDescription />
                {//<h3> Popular posts </h3>
                <PostTape postList={this.props.postList}/>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePostList: (payload) => {dispatch(postListRequest(payload));    console.log(payload);},
        clearPostList:() => {dispatch(clearPostList())}
    }
}
  
const mapStateToProps = state => {
    return {
      postList: state.postList
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)


