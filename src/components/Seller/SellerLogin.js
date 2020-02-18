import React,{useState,useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing actions
import {
    sellerLogin, logout,
} from '../../redux/user/User.actions';
// importing selectors
import {
    selectSellerError,
    selectTokenError,
    selectLoadingSeller,
    selectLoadingUser,

} from '../../redux/user/User.selectors';


const SellerLogin = ({parentMatch,loading_seller,loading_user,seller_error,token_error,login}) => {
    const spring = useSpring({
        opacity:1,
        transform : 'translateX(0)',
        from :{
            opacity:0,
            transform : 'translateX(100vw)',
        }
    });
    const [auth,setAuth] = useState({
        username : '',
        password : '',
    })
    return (
        <animated.div style={spring} className='login'>
            <h1>Seller Login</h1>
            {
                token_error
                &&
                token_error.response
                &&
                <div className="error">
                    <h4>
                        {JSON.stringify(token_error.response.data)}
                    </h4>
                </div>
            }
            <div className="form-group">
                <h3>Authentication Info</h3>
                <input 
                    type="text"
                    placeholder = "Username"
                    value={auth.username}
                    onChange={
                        e => setAuth({
                            ...auth,
                            username : e.target.value,
                        })
                    }
                    
                />
                <input 
                    type="password"
                    placeholder = "Password"
                    value={auth.password}
                    onChange={
                        e => setAuth({
                            ...auth,
                            password : e.target.value,
                        })
                    }
                    
                />
                <button type='button' onClick={()=>login(auth)} disabled={loading_seller || loading_user}>
                    {
                        loading_user
                        ||
                        loading_seller
                        ? <Loader 
                            type = "Oval"
                            color = "#ffff"
                            height  = {20}
                            width = {20}
                            timeout = {20000}
                        />
                        : <><i className="fa fa-sign-in" aria-hidden="true"></i> Login</>
                    }
                </button>
            </div>
            <div className="message">
                <h4>Not A Seller ? </h4>
                <NavLink to={`${parentMatch.path}`}>Join Here</NavLink>
            </div>
        </animated.div>
    )
}

const mapState = state =>({
    token_error  : selectTokenError(state),
    loading_user : selectLoadingUser(state),
    loading_seller : selectLoadingSeller(state),
    seller_error : selectSellerError(state),
});
const mapDispatch = dispatch =>({
    login : authData =>dispatch(sellerLogin(authData)),
})

export default connect(
    mapState,
    mapDispatch,

)(SellerLogin);
