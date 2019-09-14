import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { dialogCreatingRequest, clearDialogCreating } from '../../../../../store/dialog/dialogCreating'
import Loading from '../../../Common/Loading'
import ErrorList from '../../../Common/ErrorList'

class DialogCreating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      members: ['']
	  }
    this.textSubmit = this.textSubmit.bind(this);
    this.textChange = this.textChange.bind(this);
	  this.titleChange = this.titleChange.bind(this);
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
  
  label = (value, index) => (
    <label>
      member {index + 1}:
      <input 
        type="text" 
        name={index}
        value={value ? value : ''}
        onChange={this.textChange} />
    </label>
  )
  
  titleLabel = () => (
    <label>
      title:
      <input 
        type="text" 
        value={this.state.title}
        onChange={this.titleChange} />
    </label>
  )

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
  
  titleChange(event) {
    this.setState({title: event.target.value});
  }

  textSubmit(event) {
    event.preventDefault();
    let members = this.state.members;
    members.pop();
    //console.log({...this.state, members})
    this.props.createDialog({...this.state, members});
  }

  render() {
    if(this.props.success)
      return <Redirect to="/dialog" />;
    return (
      <div>
        <form
          onSubmit={this.textSubmit}>
          {this.titleLabel()}
			    {this.state.members.map((item,index) => this.label(item, index)) }
          <input type="submit" value="Create" />
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