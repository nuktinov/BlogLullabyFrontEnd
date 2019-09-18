import React from 'react';
import Loading from '../../Common/Loading/Loading'
import ErrorList from '../../Common/ErrorList/ErrorList'

export class ScrollList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pageNumber: 0
      };
    }

    componentDidMount() {
        this.timerID = setInterval( () => this.scrolling(), 1500)
    }

    scrolling() {
        const element = document.documentElement;
        if(element != null) {
            if( element.scrollTop + element.clientHeight > element.scrollHeight - (0.1 * element.clientHeight)) {
                if(!this.props.loading 
                    && !this.props.errorList
                    && !this.props.isAll) {
                this.props.updatePageNumber(this.props.pageNumber + 1) 
                }
            }
        }
    }

    componentWillUpdate() {
        
    }

    componentDidUpdate() {

    }
  
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
  
    render() {
        const loading = this.props.loading
        const errorList = this.props.errorList
        return (
            <div className="scrollList">
                <ul> 
                    {this.props.elements.map((element) => 
                        <li key={element.id.toString()}>
                            {this.props.listElement(element)}
                        </li>)}
                </ul>
                {loading && <Loading loading={loading}/>}
                {errorList && <ErrorList errorList={errorList}/>}    
            </div>
        )
    }
}

export default ScrollList