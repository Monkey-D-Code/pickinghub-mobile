import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Spring,config} from 'react-spring/renderprops';
import {NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectActiveUser,
    selectChangingPassword,
    selectChangePasswordSuccess,
    selectChangePasswordError,

} from '../../redux/user/User.selectors';

// importing actions
import {
    changePassword,
} from '../../redux/user/User.actions';


class EditProfileForm extends Component{
    style = {
        from : {
            opacity : 0,
            
        },
        to : {
            opacity : 1,
            
        }
    }
    state = {
        old_password            : '',
        new_password            : '',
        confirm_new_password    : '',
        errors      : [],
        click       :   0,
        
    }
    inputChange =  e =>{
        this.setState({
            errors : [],
            [e.target.name] : e.target.value,
        })
    }
    submit = () => {
        const {old_password,new_password,confirm_new_password,errors} = this.state;
        const {user,change} = this.props;
        this.setState({
            click : 1,
        })
        let temp_errors = [];

        if(old_password === "") temp_errors.push('Enter your old password');
        if(new_password === "") temp_errors.push("Enter new password"); 
        if(confirm_new_password === "") temp_errors.push("Confirm your password");
        
        if(confirm_new_password !== new_password) temp_errors.push("New Passwords don't match");

        

        if(temp_errors.length > 0){
            this.setState({
                errors : temp_errors,
            })
            
        }else{
            const data  =   {
                username        : user.user.username,
                old_password    : old_password,
                new_password    : new_password,
            }
            change(data);
        }

    }
    render=()=>{
        const {from,to} = this.style;
        const {old_password,new_password,confirm_new_password,errors,click} = this.state;

        const { success , loading , error}  = this.props;

        return(
            <Spring from={from} to={to} config={config.stiff} delay={500}>
                {
                    spring=>(
                        <div className="edit-profile-form" style={spring}>
                            <form>
                                <div className="form-group">
                                    {   
                                        click ===1
                                        &&
                                        error
                                        &&
                                        error.response
                                        &&
                                        <div className="error">
                                            <h4>{error.response.data.message || error.message}</h4>
                                        </div>
                                    }
                                    {
                                        click ===   1
                                        &&
                                        success
                                        &&
                                        <div className="success-msg">
                                            <h4>{success.message}</h4>
                                        </div>
                                    }
                                    <h3>New Password <NavLink to='/profile'>&times;</NavLink></h3>
                                    <input 
                                        type="password" 
                                        name="old_password" 
                                        placeholder="Old Password"
                                        value={old_password}
                                        onChange={this.inputChange}
                                    />
                                    <input 
                                        type="password" 
                                        name="new_password" 
                                        placeholder="New Password"
                                        value={new_password}
                                        onChange={this.inputChange}
                                    />
                                    <input 
                                        type="password" 
                                        name="confirm_new_password" 
                                        placeholder="Confirm New Password"
                                        value={confirm_new_password}
                                        onChange={this.inputChange}
                                    />
                                    {
                                        errors.length > 0
                                        &&
                                        <div className="error">
                                            {
                                                errors.map(
                                                    (err,i)=>
                                                        <div key={i}>
                                                            {err}
                                                        </div>
                                                )
                                            }
                                        </div>
                                    }
                                    <button 
                                        type="button"
                                        onClick={this.submit}    
                                    >
                                        {
                                            loading
                                            ? <Loader 
                                                type = "Oval"
                                                color = "#ffff"
                                                height  = {20}
                                                width = {20}
                                                timeout = {30000}
                                            />
                                            : <><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</>
                                        }
                                    </button>
                                </div>
                                
                            </form>
                        </div>  
                    )
                }
            </Spring>
        );
    }
}

const ConnectedEditProfileForm = connect(
    state =>({
        user        :   selectActiveUser(state),
        loading     :   selectChangingPassword(state),
        success     :   selectChangePasswordSuccess(state),
        error       :   selectChangePasswordError(state),
    }),
    dispatch => ({
        change : data => dispatch(changePassword(data)),
    })
)(EditProfileForm);

class EditProfile extends Component{
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(100vw)',
        },
        to : {
            opacity : 1,
            transform : 'translateX(0)',
        }
    }
    render=()=>{
        const {from,to} = this.style;
        const {
            user,
        } = this.props;
        return(
            <Spring from={from} to={to} config={config.stiff}>
                {
                    spring=>(
                        user
                        ? <div className="edit-profile" style={spring} >
                                <div className="user-infor">
                                    <h1>{user.user.first_name} {user.user.last_name}</h1>
                                    <h2>{user.user.username}</h2>
                                    <p>Change Password</p>
                                </div>
                                <ConnectedEditProfileForm />
                            </div>
                        : <div className="error" style={spring}>
                                <h4>User Not Found</h4>
                            </div>
                    )
                }
            </Spring>
        );
    }
}

const mapState = state =>({
    user : selectActiveUser(state),

});
const mapDispatch = dispatch =>({

});
export default connect(
    mapState,
    mapDispatch,
)(EditProfile);