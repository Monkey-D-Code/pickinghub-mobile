import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// importing selectors
import {
    selectActiveDemographic,

} from '../../redux/department/Department.selectors';



class DemographicDetails extends Component{
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(100vw)',

        },
        to : {
            opacity : 1,
            
            transform : 'translateX(0)',
        }
    }
    render=()=>{
        const id = this.props.match.params.id;
        const {from,to} = this.style;
        const {demographic} = this.props;
        const d = demographic(id);
        console.log('demographic id ' , id)
        return(
            <Spring from={from} to={to} >
                {
                    spring =>(
                        demographic(id)
                        ?
                        <div className="demographic-details" style={spring}>
                            <img 
                                src={demographic(id).cover_image} 
                                alt=""
                            />
                        </div>
                        :
                        <div className="error">
                            <h1>Error</h1>
                        </div>
                    )
                }
            </Spring>
        );
    }
}

const mapState = state =>({
    demographic : demo_id => selectActiveDemographic(demo_id)(state),
})

export default withRouter(
    connect(
        mapState,
    
    )(DemographicDetails)
);