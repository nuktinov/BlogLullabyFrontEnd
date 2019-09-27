import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { dialogCreatingRequest, clearDialogCreating } from '../../../../../store/dialog/dialogCreating'
import TextInput from '../../../Common/TextInput/TextInput'
import Loading from '../../../Common/Loading/Loading'
import ErrorList from '../../../Common/ErrorList/ErrorList'
import './DialogCreating.css'

class DialogCreating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      members: ['']
	  }
  }

  textChange(event){
    if(event.target.value == '') {
      let members = this.state.members;
      members.splice(event.target.name, 1);
      this.setState({members});
    }
    else {
      let members = this.state.members;
	    members[event.target.name] = event.target.value;
      this.setState({members});
    }
  }

  componentDidUpdate(){
    if(this.state.members[this.state.members.length - 1]) {
      let members = this.state.members;
      members[this.state.members.length] = ''
      this.setState({members});
    }
  }

  componentWillUnmount(){
    this.props.clearDialogCreating();
  }
  
  textSubmit(event) {
    event.preventDefault();
    let members = this.state.members;
    members.pop();
    this.props.createDialog({...this.state, members});
  }

  render() {
    if(this.props.success)
      return <Redirect to="/dialog" />;
    return (
      <div>
        <form
          onSubmit={e => this.textSubmit(e)}>
          <TextInput
            span="Title:"
            value={this.state.title}
            onChange={e => this.setState({title: e.target.value})}
          />
			    {this.state.members.map((value,index) => 
            <TextInput
              span={`Member ${index + 1}:`}
              name={index}
              value={value}
              onChange={(e) =>this.textChange(e)}
            />
          )}
          <input type="submit" value="Create" className="saveBtn"/>
        </form>
        <Loading loading={this.props.loading} />
        <ErrorList errorList={this.props.errorList} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dialogCreating.loading,
    errorList: state.dialogCreating.errorList,
    success: state.dialogCreating.success
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDialog: (payload) => dispatch(dialogCreatingRequest(payload)),
    clearDialogCreating: () => dispatch(clearDialogCreating())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DialogCreating)