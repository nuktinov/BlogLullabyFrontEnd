import React from 'react';
import { connect } from 'react-redux'

import './MainPage.css'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import Content from './Content/Content'
import Ads from './Ads/Ads'
import Footer from './Footer/Footer'
import AuthenticateControl from './AuthenticateControl/AuthenticateControl'
import { checkAuthentication } from '../../store/authentication'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.checkAuthentication();
  }

  componentDidUpdate() {
    this.props.checkAuthentication();
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
        <div id="mainPage">
          <Header />
          <NavBar logIn={this.props.logIn} userName={this.props.username}/>
          <Content />
          <Ads />
          <Footer />
          <AuthenticateControl logIn={this.props.logIn}/>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      checkAuthentication: () => {
      dispatch(checkAuthentication())
    }
  }
}

const mapStateToProps = state => {
  return {
    logIn: state.authentication.logIn,
    username: state.authentication.username
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)