import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
// selectors
import {
    selectBrand,
} from '../redux/website/Website.selectors';


const Footer = ({brand}) => {
    return (
        brand
        ? <footer>
            <div className="brand-info">
                <img src={brand.logo_url} alt=""/>
                <h2>{brand.full_name}</h2>
            </div>
            <div className="navigation">
                <ul>
                    <li><NavLink activeClassName='nav-link-active' to='/'><i className="fa fa-home" aria-hidden="true"></i> Home</NavLink></li>
                    <li><NavLink activeClassName='nav-link-active' to='/contact'><i className="fa fa-phone" aria-hidden="true"></i> Contact Us</NavLink></li>
                </ul>
                <ul>
                    <li><NavLink activeClassName='nav-link-active' to='/department'><i className="fa fa-database" aria-hidden="true"></i> Catalogue</NavLink></li>
                    <li><NavLink activeClassName='nav-link-active' to ='/search'><i className="fa fa-search" aria-hidden="true"></i> Search</NavLink></li>
                </ul>
                <ul>
                    <li><NavLink activeClassName='nav-link-active' to='/terms'><i className="fa fa-list" aria-hidden="true"></i> Terms of Service</NavLink></li>
                    <li><NavLink activeClassName='nav-link-active' to='/privacy'><i className="fa fa-question-circle" aria-hidden="true"></i> Privacy</NavLink></li>
                    <li><NavLink activeClassName='nav-link-active' to='/return'><i className="fa fa-backward" aria-hidden="true"></i> Return Policy</NavLink></li>
                </ul>
            </div>
            <div className="contact">
                <h4 className="contact"><i className="fa fa-phone-square" aria-hidden="true"></i> +91 {brand.contact_number}</h4>
                <h4 className="email"><i className="fa fa-envelope" aria-hidden="true"></i> {brand.email}</h4>
                <h4 className="address"><i className="fa fa-map-marker" aria-hidden="true"></i> {brand.address}</h4>
            </div>
            <div className="copyright">
                <p>&copy;All Rights Reserved pickinghub.com | Designed &amp; developed by <a href="https://gieitech.pythonanywhere.com/" target="__blank">GIEITech</a></p>
            </div>
            
        </footer>
        : <footer>

        </footer>
    )
}

const mapState = state =>({
    brand : selectBrand(state),

});

export default connect(
    mapState,
)(Footer);
