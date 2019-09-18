import React from 'react';
import Loading from '../../Common/Loading/Loading'
import ErrorList from '../../Common/ErrorList/ErrorList'

export class ScrollList extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        this.timerID = setInterval( () => this.scrolling(), 1500)
    }

    scrolling() {
        const element = document.documentElement;
        if(element != null) {
            if( element.scrollTop + element.clientHeight > element.scrollHeight - (0.2 * element.clientHeight)) {
                if(!this.props.list.isLoading 
                    && !this.props.list.errors
                    && !this.props.list.isAll) {
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
        const list = this.props.list
        return (
            <div className="scrollList">
                <ul> 
                    {list.elements.map((element) => 
                        <li key={element.id.toString()}>
                            {this.props.elementView(element)}
                        </li>)
                    }
                </ul>
                <Loading loading={list.isLoading}/>
                <ErrorList errorList={list.errors}/>    
            </div>
        )
    }
}

export default ScrollList