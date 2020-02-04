import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {Spring} from 'react-spring/renderprops';


// importing selectors
import {
    selectBrand,
    selectBrandError,
} from '../../redux/website/Website.selectors'; 
// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';

class Contact extends Component{
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
    render=()=>{
        const {from ,to} = this.style;
        const {brand,error} = this.props;
        return(
            <Spring from={from} to={to} >
                {
                    spring =>(
                        <div className="contact-page" style={spring}>
                            {
                                brand
                                &&
                                <img src={brand.logo_url} className='logo' />
                            }
                            <h1>Contact Us</h1>
                            
                            {
                                brand
                                &&
                                <div className="contact-info">
                                    <h4 className="phone"><i className="fa fa-phone-square" aria-hidden="true"></i> {brand.contact_number}</h4>
                                    <h4 className="email"><i className="fa fa-envelope" aria-hidden="true"></i> {brand.email}</h4>
                                    <h4 className="address"><i className="fa fa-map-marker" aria-hidden="true"></i> {brand.address}</h4>
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        );
    }
}
const mapState = state=>({
    brand  :selectBrand(state),
    error : selectBrandError(state),

})
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu())
})
export default connect(
    mapState,
    mapDispatch,
)(Contact);
