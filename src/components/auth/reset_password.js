import React,{useState} from 'react';
import {useSpring,animated} from 'react-spring';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';


// importing selectors
import {
    selectResettingPassword,
    selectResetPasswordSuccess,
    selectResetPasswordError,

} from '../../redux/user/User.selectors';

// importing actions
import {
    resetPassword,

} from '../../redux/user/User.actions';


const ResetPassword = ({ success , loading , error , reset})=>{
    const [email,setEmail] = useState("");
    const [click,setClick]  =   useState(0);
    const spring = useSpring({
        transform : 'translateY(0)',
        from : {transform : 'translateY(100vh)'}
    })
    return(
        <animated.div className="reset-password" style={spring}>
            <form className="form">
                <h1>Forgot Password</h1>
                {   
                    error
                    &&
                    error.response
                    &&
                    <div className="error">
                        <h4>{error.response.data.message || error.message}</h4>
                    </div>
                }
                
                <div className="form-group">
                    {   
                        click == 1
                        &&
                        success
                        &&
                        <div className="password-reset-success">
                            <h4>Password reset successful. Check your email & <NavLink to='/login'>Login</NavLink></h4>
                        </div>
                    }
                    <input 
                        type="email" 
                        className="input"
                        placeholder='Enter registered Email'
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                    />
                    <button 
                        type="button" 
                        className="form-btn"
                        disabled={loading}
                        onClick={()=>{
                            reset(email);
                            setClick(1);
                        }}
                    >
                        {
                            loading
                            ? <Loader 
                                type = "Oval"
                                color = "#ffff"
                                height  = {20}
                                width = {20}
                                timeout = {20000}
                            />
                            : 'Reset Password'
                        }
                    </button>
                    <div className="sub-nav">
                        <h4>New To Pickinghub ?</h4>
                        <NavLink to='/register'>Register here</NavLink>
                    </div>
                </div>
               
            </form>
        </animated.div>
    )
}

export default withRouter(
    connect(
        state => ({
            success : selectResetPasswordSuccess(state),
            error   : selectResetPasswordError(state),
            loading : selectResettingPassword(state),
        }),
        dispatch =>({
            reset : email => dispatch(resetPassword(email)),
        })
    )(ResetPassword)
);