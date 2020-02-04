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
        const {brand,error} = this.props;
        return(
            <Spring from={from} to={to} >
                {
                    spring =>(
                        <div className="home-page" style={spring}>
                            {
                                brand
                                &&
                                <div className="brand-hero">
                                    <img className='hero-image' src={brand.random_hero_image} alt=""/>
                                    <div className="brand-info">
                                        <div className="name">
                                            <img 
                                                src={brand.logo_url} 
                                                alt=""
                                                className='logo'
                                            />
                                            <div className='heading'>
                                                <h1>{brand.full_name}</h1>
                                                <div className="others">
                                                    <p className="tag-name">
                                                        {brand.tag_line}
                                                    </p>
                                                    <p className="foundation-date">Since {new Date(brand.foundation_date).toDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="about">
                                        <img 
                                            src={brand.random_normal_image} 
                                            alt={`${brand.full_name}`}
                                        />
                                        <p>{brand.about}</p>
                                    </div>
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
)(Home);
