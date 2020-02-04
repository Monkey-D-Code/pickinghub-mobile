import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink,withRouter} from 'react-router-dom';


// importing selectors
import {
    selectBrand,
    selectBrandError,
    selectNavigationSwitch,

} from '../redux/website/Website.selectors';
import {
    selectIsAuth,
} from '../redux/user/User.selectors';

// importing actions
import {
    toggleMenu,

} from '../redux/website/website.actions';


class Navbar extends Component{
    
    render=()=>{
        const {
            visible,
            toggle,
            brand,
            error,

            isAuth,

        } = this.props;
        return(
            <div>
                {
                    brand
                    &&
                    <div className={
                        visible ? "navigation-bar active" : "navigation-bar"
                    }>
                        <div className="brand">
                            <img 
                                src={brand.logo_url} 
                                alt=""
                            />
                            <h1>
                                {brand.full_name}
                            </h1>
                        </div>
                        <nav>
                            <ul>
                                <li><NavLink activeClassName='nav-link-active' to='/'><i className="fa fa-home" aria-hidden="true"></i> Home</NavLink></li>
                                <li><NavLink activeClassName='nav-link-active' to='/contact'><i className="fa fa-phone" aria-hidden="true"></i> Contact Us</NavLink></li>
                                
                                
                            </ul>
                            
                            {
                                !isAuth
                                ? <ul>
                                        <li><NavLink activeClassName='nav-link-active' to='/login'><i className="fa fa-sign-in" aria-hidden="true"></i> Login</NavLink></li>
                                        <li><NavLink activeClassName='nav-link-active' to='/register'><i className="fa fa-user-plus" aria-hidden="true"></i> Register</NavLink></li>
                                    </ul>
                                : <ul>
                                        <li><NavLink activeClassName='nav-link-active' to='/profile'><i className="fa fa-user" aria-hidden="true"></i> Profile</NavLink></li>
                                        <li><NavLink activeClassName='nav-link-active' to='/orders'><i className="fa fa-truck" aria-hidden="true"></i> Orders</NavLink></li>
                                        <li><NavLink activeClassName='nav-link-active' to='/cart'><i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart</NavLink></li>
                                    </ul>
                            }
                            <ul>
                                <li><NavLink activeClassName='nav-link-active' to='/department'><i className="fa fa-database" aria-hidden="true"></i> Catalogue</NavLink></li>
                                <li><NavLink activeClassName='nav-link-active' to ='/search'><i className="fa fa-search" aria-hidden="true"></i> Search</NavLink></li>
                            </ul>
                            <ul>
                                <li><NavLink activeClassName='nav-link-active' to='/terms'><i className="fa fa-list" aria-hidden="true"></i> Terms of Service</NavLink></li>
                                <li><NavLink activeClassName='nav-link-active' to='/privacy'><i className="fa fa-question-circle" aria-hidden="true"></i> Privacy</NavLink></li>
                                <li><NavLink activeClassName='nav-link-active' to='/return'><i className="fa fa-backward" aria-hidden="true"></i> Return Policy</NavLink></li>
                            </ul>
                        </nav>
                        
                    </div>
                }
                {
                    error
                    &&
                    <div className="error">
                        <h4>
                            {
                                JSON.stringify(error)
                            }
                        </h4>
                    </div>
                }
                <button 
                    type='button' 
                    onClick={toggle} 
                    className={
                        visible ? 'nav-toggle visible' : 'nav-toggle'
                    }
                >
                    {
                        visible
                        ? <i className="fa fa-times" aria-hidden="true"></i>
                        : <i className="fa fa-bars" aria-hidden="true"></i>
                    }
                </button>
            </div>

        )
    }
}

const mapState = state =>({
    visible : selectNavigationSwitch(state),
    brand : selectBrand(state),
    error : selectBrandError(state),
    isAuth : selectIsAuth(state),
});

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
})

export default connect(
    mapState,
    mapDispatch,

)(Navbar);