import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';
// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';
import {
    customerLogin,
} from '../../redux/user/User.actions';

// importing selectors
import {
    selectLoadingUser,
    selectTokenError,
    selectUserError,

} from '../../redux/user/User.selectors';
import {
    selectNavigationSwitch,
} from '../../redux/website/Website.selectors';

class Login extends Component{
    state = {
        show_password : false,
        username : '',
        password : '',
    }
    styles = {
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
        if(this.props.switch) this.props.toggle();
    }
    passwordToggle = e =>{
        this.setState({
            [e.target.name] : e.target.checked,
        })
    }
    changeInput = e =>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    submit = ()=>{
        const {username,password} = this.state;
        const {login} = this.props;
        login({username,password});
    }
    render = ()=>{
        const {
            show_password,
            username,
            password,

        } = this.state;

        const {
            from,
            to,
        } = this.styles;
        const {
            token_error,
            user_error,
            loading_user,

        } = this.props;
        return(
            <Spring from = {from} to = {to}>
                {
                    spring =>(
                        <div className="login-page" style={spring}>
                
                            <form className="form">
                                <h1>Login Here</h1>
                                {
                                    token_error
                                    &&
                                    <div className="error">
                                        <h4>
                                            {JSON.stringify(token_error.message)}
                                        </h4>
                                    </div>
                                }
                                {
                                    user_error
                                    &&
                                    <div className="error">
                                        <h4>
                                            {user_error.message}
                                        </h4>
                                    </div>
                                }
                                {   
                                    user_error
                                    &&
                                    user_error.response
                                    &&
                                    <div className="error">
                                        <h4>
                                            {JSON.stringify(user_error.response.data)}
                                        </h4>
                                    </div>
                                }
                                <div className="form-group">
                                    <h3>Provide Authentication</h3>
                                    {/* <div className="sub-nav">
                                        <h4>Forgot Password ?</h4>
                                        <NavLink to='/forgot-password'>Reset here</NavLink>
                                    </div> */}
                                    <input 
                                        type="text" 
                                        className="input"
                                        placeholder='Your Username'
                                        name='username'
                                        value={username}
                                        onChange={this.changeInput}

                                    />
                                    <input 
                                        type={show_password ? "text" : "password"} 
                                        className="input"
                                        placeholder='Your Password'
                                        name='password'
                                        value={password}
                                        onChange={this.changeInput}
                                    />
                                    <div className="settings">
                                        <label htmlFor="show-password">Show Password</label>
                                        <input 
                                            type="checkbox" 
                                            name="show_password" 
                                            id=""
                                            value={show_password}
                                            
                                            onClick={this.passwordToggle}
                                        />
                                    </div>
                                    <button type='button' className="form-btn" onClick={this.submit} disabled={loading_user}>
                                        {
                                            loading_user
                                            ? <Loader 
                                                type = "Oval"
                                                color = "#ffff"
                                                height  = {20}
                                                width = {20}
                                                timeout = {20000}
                                            />
                                            : 'Login'
                                        }
                                    </button>
                                    <div className="sub-nav">
                                        <h4>New To Pickinghub ?</h4>
                                        <NavLink to='/register'>Register here</NavLink>
                                    </div>
                                    
                                </div>
                                
                            </form>
                        </div>
                    )
                }
            </Spring>
        )
    }
}
const mapState = state =>({
    token_error : selectTokenError(state),
    user_error : selectUserError(state),
    loading_user : selectLoadingUser(state),
    switch : selectNavigationSwitch(state),
})

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    login : data => dispatch(customerLogin(data)),
})

export default connect(
    mapState,
    mapDispatch,
)(Login);