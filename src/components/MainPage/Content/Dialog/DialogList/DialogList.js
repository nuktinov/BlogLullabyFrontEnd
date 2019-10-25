import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { getDialogListRequest, clearDialogList } from '../../../../../store/dialog/dialogList'
import DialogPreview from './DialogPreview';
import ScrollList from '../../../Common/ScrollList/ScrollList'
import './DialogList.css'

export class DialogList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageNumber: 0,
        PageSize: 10
      };
    }
        
    updateDialogList() {
        if(this.props.dialogList.pageCount === this.state.pageNumber + 1)
            return;
        const newState = {
            ...this.state,
            pageNumber: this.state.pageNumber + 1
        }
        this.props.getDialogList(newState)
        this.setState(newState)
    }

    componentDidMount() {
        this.props.getDialogList(this.state);
    }
    
    componentWillUnmount() {
      this.props.clearDialogList()
    }
  
    render() {
        return (
			<div className='dialogList'>
			    <Link to={`/dialog/create`}>Create</Link>
                <ScrollList 
                    list={this.props.dialogList}
                    updatePageNumber={() => this.updateDialogList()}
                    elementView={(item) => <DialogPreview dialog={item}/>}
                />
			</div>
		)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDialogList: (payload) => {dispatch(getDialogListRequest(payload))},
		clearDialogList: () =>{dispatch(clearDialogList())}
    }
}

const mapStateToProps = state => {
    return {
      dialogList: state.dialogList,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DialogList)