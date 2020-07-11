import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';


class Back extends Component {

    render =()=>{
        return (
            <div className="back-button">
                <button onClick={()=>this.props.history.goBack()}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            </div>
        )
    }
}


export default withRouter(Back);