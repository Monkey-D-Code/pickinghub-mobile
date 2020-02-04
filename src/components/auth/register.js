import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';

// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';
import {
    customerRegister,
} from '../../redux/user/User.actions';

// importing selectors
import {
    selectLoadingUser,
    selectTokenError,
    selectUserError,

} from '../../redux/user/User.selectors';

class Register extends Component{
    state = {
        first_name : '',
        last_name : '',
        email : '',
        phone : '',

        username : '',
        password : '',
        confirm_password : '',

        form_err : '',
    }
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
    inputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    componentDidMount = ()=>{
        this.props.toggle();
    }
    submit = ()=>{
        const {
            first_name,
            last_name,
            phone,
            email,

            username,
            password,
            confirm_password,

        } = this.state;
        const {
            register,

        } = this.props;
        const customerData = {
            user : {
                first_name,
                last_name,
                username,
                email,
                password,
            },
            middle_name : '',
        }
        this.setState({
            form_err : '',
        })
        if(password.length < 8 || password !== confirm_password) {
            this.setState({
                form_err : 'Password too short or not matched'
            })
        }else{
            register(customerData);
        }

    }
    render = ()=>{
        const {from ,to} = this.style;
        const {
            first_name,
            last_name,
            
            email,

            username,
            password,
            confirm_password,

            form_err,

        } = this.state;
        const {
            token_error,
            user_error,
            loading_user,

        } = this.props;
        return(
            <Spring from={from} to={to}>
                {
                    spring =>(
                        <div className="register-page" style={spring}>
                            
                            <form className="form">
                                <h1>Register Page</h1>
                                {
                                    token_error
                                    &&
                                    <div className="error">
                                        <h4>
                                            {JSON.stringify(token_error)}
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
                                {
                                    form_err
                                    &&
                                    <div className="error">
                                        <h4>
                                            {JSON.stringify(form_err)}
                                        </h4>
                                    </div>
                                }
                                <div className="form-group">
                                    <h3>Personal Information</h3>
                                    <input 
                                        type="text" 
                                        className="input"
                                        placeholder='First name'
                                        value={first_name}
                                        onChange={this.inputChange}
                                        name="first_name"
                                        disabled={loading_user}
                                    />
                                    <input 
                                        type="text" 
                                        className="input"
                                        placeholder='Last name'
                                        value={last_name}
                                        onChange={this.inputChange}
                                        name="last_name"
                                        disabled={loading_user}
                                    />
                                    <input 
                                        type="email" 
                                        className="input"
                                        placeholder='Your email address'
                                        value={email}
                                        onChange={this.inputChange}
                                        name="email"
                                        disabled={loading_user}

                                    />
                                    
                                </div>
                                <div className="form-group">
                                    <h3>Authentication</h3>
                                    <input 
                                        type="text" 
                                        className="input"
                                        placeholder='Choose a username'
                                        value={username}
                                        onChange={this.inputChange}
                                        name="username"
                                        disabled={loading_user}
                                    />
                                    <input 
                                        type="password" 
                                        className="input"
                                        placeholder='Choose a password'
                                        value={password}
                                        onChange={this.inputChange}
                                        name="password"
                                        disabled={loading_user}
                                    />
                                    <input 
                                        type="password" 
                                        className="input"
                                        placeholder='Confirm the password'
                                        value={confirm_password}
                                        onChange={this.inputChange}
                                        name="confirm_password"
                                        disabled={loading_user}
                                    />
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
                                            : 'Register'
                                        }
                                    </button>
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
})

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    register : customerData => dispatch(customerRegister(customerData)),
});

export default connect(
    mapState,
    mapDispatch,
)(Register);