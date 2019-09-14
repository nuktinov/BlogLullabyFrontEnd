import React from 'react';

class Ads extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        AuthToggle :false
      };
    }
  
    AuthenticateFormToggle = (isToggleOn) => {
      this.setState(() => ({
        AuthToggle: isToggleOn
      }));
    }
  
    componentDidMount() {
      
    }
  
    componentWillUnmount() {
      
    }
  
    render() {
      return (
        <div id="siteAds">
        </div>
      );
    }
}
  

export default Ads;