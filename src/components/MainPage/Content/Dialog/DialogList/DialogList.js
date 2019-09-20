import React from 'react';
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'
import { getDialogListRequest, clearDialogList } from '../../../../../store/dialog/dialogList'
import DialogPreview from './DialogPreview';
import Loading from '../../../Common/Loading/Loading'
import ErrorList from '../../../Common/ErrorList/ErrorList'
import './DialogList.css'

export class DialogList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
	  this.createDialog = this.createDialog.bind(this);
    }
	
	createDialog(event) {
		this.props.textSubmit(this.state);
		event.preventDefault();
	}
	
	crit = {
        pageNumber: 0,
        PageSize: 10
    }
		
    componentDidMount() {
        this.props.getDialogList(this.crit);
    }
	
	componentWillUpdate() {
    }
  
    componentWillUnmount() {
      this.props.clearDialogList()
    }
  
    render() {
        return (
			<div className='dialogList'>
			    <Link to={`/dialog/create`}>Create</Link>
                {this.props.loading ? <Loading loading={this.props.loading} /> : (
                    this.props.errorList ? <ErrorList errorList={this.props.errorList}/> : (
                        <ul > 
                            {this.props.dialogs.map((dialog) => 
                                <li key={dialog.id.toString()}>
                                    <DialogPreview dialog={dialog}/>
                                </li>)}
                        </ul>
                    )
                )}
			</div>
		)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDialogList: (payload) => {
        dispatch(getDialogListRequest(payload))
        },
		clearDialogList: () =>{dispatch(clearDialogList())}
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
    mapStateToProps,
    mapDispatchToProps
)(DialogList)