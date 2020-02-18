import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Spring,config} from 'react-spring/renderprops';


// importing selectors
import {
    selectActiveUser,
} from '../../redux/user/User.selectors';


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
        first_name : '',
        last_name : '',
        middle_name: '',
        
    }
    inputChange =  e =>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    render=()=>{
        const {from,to} = this.style;
        const {first_name,last_name,middle_name} = this.state;
        return(
            <Spring from={from} to={to} config={config.stiff} delay={500}>
                {
                    spring=>(
                        <div className="edit-profile-form" style={spring}>
                            <form>
                                <div className="form-group">
                                    <h3>Personal Info</h3>
                                    <input 
                                        type="text" 
                                        name="first_name" 
                                        placeholder="Your first name"
                                        value={first_name}
                                        onChange={this.inputChange}
                                    />
                                    <input 
                                        type="text" 
                                        name="middle_name" 
                                        placeholder="Your middle name"
                                        value={middle_name}
                                        onChange={this.inputChange}
                                    />
                                    <input 
                                        type="text" 
                                        name="last_name" 
                                        placeholder="Your last name"
                                        value={last_name}
                                        onChange={this.inputChange}
                                    />
                                    <button type="button"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
                                </div>
                                
                            </form>
                        </div>  
                    )
                }
            </Spring>
        );
    }
}

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
                                    <p>Change Details</p>
                                </div>
                                <EditProfileForm />
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