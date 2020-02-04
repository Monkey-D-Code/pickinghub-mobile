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

class Home extends Component{
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
        return(
            <Spring from={from} to={to} >
                {
                    spring =>(
                        <div className="home-page" style={spring}>
                            <h1>Home Page</h1>
                        </div>
                    )
                }
            </Spring>
        );
    }
}
const mapState = state=>({
    brand  :selectBrand(state),
    
})
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu())
})
export default connect(
    null,
    mapDispatch,
)(Home);
