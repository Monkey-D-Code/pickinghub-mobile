import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectBrand,
    

} from '../../redux/website/Website.selectors';

// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions'

class Terms extends Component{
    style = {
        from : {
            opacity : 0,
            transform : 'translateY(100vh)',

        },
        to : {
            opacity : 1,
            transform : 'translateY(0)',
        }
    }
    componentDidMount = ()=>{
        this.props.toggle();
    }
    render = ()=>{
        const {from,to} = this.style;
        const {brand } = this.props;
    
        return(
            <Spring from={from} to={to}>
                {
                    spring =>(
                        <div className="terms" style={spring}>
                            
                            
                            <h1>Terms & Conditions</h1>
                            {
                                brand
                                &&
                                <div className="terms-list">
                                    
                                    {
                                        brand.terms_conditions.map((term,i)=>(
                                            <div className="single-term" key={i}>
                                                <h4><i className="fa fa-check" aria-hidden="true"></i> {term.label}</h4>
                                                <p>
                                                    {term.desc}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        );
    }
}

const mapState = state =>({
    brand  : selectBrand(state),
    
})
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
})
export default withRouter(connect(
    mapState,
    mapDispatch,
)(Terms));