import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Spring} from 'react-spring/renderprops';

// importing selectors
import {
    selectActiveUser,
    
} from '../../redux/user/User.selectors';

// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';
import {
    logout,
} from '../../redux/user/User.actions';
import { NavLink } from 'react-router-dom';

class Profile extends Component{
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
    render = ()=>{
        const {
            user,
            logout,

        } = this.props;
        const {from ,to} = this.style;
        return(
           <Spring from={from} to={to} >
               {
                   spring=>(
                    <div className="profile" style={spring}>
                       {
                           user
                           &&
                           <div className="user-info">
                               <img 
                                    src={`https://ui-avatars.com/api/?name=${user.user.first_name}+${user.user.last_name}&size=300&background=101935&color=E0CA3C`} 
                                    alt=""
                                />
                                <h1>{user.user.first_name} {user.user.last_name}</h1>
                                <p><i className="fa fa-envelope-o" aria-hidden="true"></i> {user.user.email}</p>
                                <p><i className="fa fa-user" aria-hidden="true"></i> {user.user.username}</p>
                                <button className='logout-btn' onClick={logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                           </div>
                       }
                       {
                           user.all_address.length > 0
                           ? <div className="address-list">
                                <h3>Address</h3>
                                <div className="list">
                                {
                                    user.all_address.map((address,i)=>(
                                        <div className="single-address" key={i}>
                                            
                                            <h4>{address.house_no_or_name}, near {address.nearest_landmark}, {address.locality}, {address.town_ir_city}, {address.district}, {address.state} - {address.pin_code}</h4>
                                            <div className="status">
                                                {
                                                    address.active
                                                    ? <p className='true'><i className="fa fa-check" aria-hidden="true"></i> Active</p>
                                                    : <p className='false'><i className="fa fa-times" aria-hidden="true"></i> Not Active</p>
                                                }
                                            </div>
                                        </div>  
                                    ))
                                }
                                </div>

                           </div>
                           : <div className="no address">
                               <h4>No address Found</h4>
                               <NavLink to='/'>Add</NavLink>
                           </div>
                       }
                       {
                           user.contacts.length > 0
                           ? <div className="contacts">
                               <h3>Contacts</h3>
                               <div className="list">
                                   {
                                       user.contacts.map((contact,i)=>(
                                            <div className="single-contact" key={i}>
                                                <h4><i className="fa fa-tag" aria-hidden="true"></i> {contact.label}</h4>
                                                <p><i className="fa fa-phone-square" aria-hidden="true"></i> {contact.number}</p>
                                                <div className="status">
                                                {
                                                    contact.active
                                                    ? <p className='true'><i className="fa fa-check" aria-hidden="true"></i></p>
                                                    : <p className='false'><i className="fa fa-times" aria-hidden="true"></i></p>
                                                }
                                                </div>
                                            </div>
                                       ))
                                   }
                               </div>
                           </div>
                           : <div className="no contacts">
                                <h4>No contacts Found</h4>
                                <NavLink to='/'>Add</NavLink>
                            </div>
                       }
                    </div>
                   )
               }
           </Spring>
        )
    }
}

const mapState = state => ({
    user : selectActiveUser(state),
});
const mapDispatch = dispatch=>({
    toggle : ()=>dispatch(toggleMenu()),
    logout : ()=>dispatch(logout()),
})
export default connect(
    mapState,
    mapDispatch,

)(Profile);