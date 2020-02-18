import React from 'react'
import {connect} from 'react-redux';
import {useSpring,animated} from 'react-spring';
import {Route,NavLink,withRouter} from 'react-router-dom';

// importing selectors
import { 
    selectActiveSeller,

 } from '../../redux/user/User.selectors';

//  importing actions
import {
    logout,
} from '../../redux/user/User.actions';

// importing nested components
import UpdateSeller from './UpdateSeller';

const SellerProfile = ({seller,logout,match}) => {
    const spring = useSpring({
        opacity : 1,
        from : {
            opacity : 0,
        }
    })
    return (
        <animated.div style={spring} className='seller-profile'>
            <Route exact path={`${match.path}`}>
                {
                    seller
                    &&
                    <div className="seller-info">
                        <img 
                            src={seller.cover_image ? seller.cover_image : `https://ui-avatars.com/api/?name=${seller.user.first_name}+${seller.user.last_name}&size=500&background=531CB3&color=E0CA3C`} 
                            alt={`${seller.user.first_name} ${seller.user.last_name}`} 
                            className="cover-image"
                        />
                        <h1>{seller.user.first_name} {seller.user.last_name} <button onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button></h1>
                        <h2>PickingHub Seller <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> {seller.company_name}</h2>
                        <div className="about">
                            <p>Since {new Date(seller.start_date).toDateString()}</p>
                            <p>{seller.about}</p>
                        </div>
                        <div className="status">
                            {
                                seller.confirmed
                                ?<p className='true'><i className="fa fa-check" aria-hidden="true"></i> Account Verified</p>
                                :<p className='false'><i className="fa fa-times-circle-o" aria-hidden="true"></i> Account Under Verification</p>
                            }
                        </div>
                        <NavLink to={`${match.path}/update-seller`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</NavLink>
                        <div className="contact">
                            <p><i className="fa fa-envelope" aria-hidden="true"></i> {seller.user.email}</p>
                            <p><i className="fa fa-phone-square" aria-hidden="true"></i> {seller.contact_number}</p>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> {seller.address}</p>
                        </div>
                        
                    </div>
                }
            </Route>
            <Route exact path={`${match.path}/update-seller`}>
                <UpdateSeller/>
            </Route>
            
        </animated.div >
    )
}

const mapState = state => ({
    seller : selectActiveSeller(state),
});
const mapDispatch = dispatch =>({
    logout : ()=>dispatch(logout()),
})

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    
    )(SellerProfile)
);
