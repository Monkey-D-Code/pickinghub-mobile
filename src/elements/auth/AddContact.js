import React,{useState} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {useSpring,animated} from 'react-spring';

// importing selectors
import {
    selectLatestContact,
    selectContactError,
    selectAddingContact,

    selectActiveUser,

} from '../../redux/user/User.selectors';

// importing actions
import {
    addContact,

} from '../../redux/user/User.actions';

const AddContact = ({latest,error,loading,user,add}) => {
    const spring = useSpring({
        opacity : 1,
        transform : 'translateX(0)',
        from : {opacity : 0,transform : 'translateX(100vw)',},
    });
    const [contact,setContact] = useState({
        label : '',
        number : '',
        active : false,
    })
    return (
        <animated.div style={spring} className='add-contact'>
            <div className="form-group">
                <h3>New Contact</h3>
                {
                    error
                    &&
                    error.response
                    &&
                    
                    <div className="error">
                        <h4>
                            {JSON.stringify(error.response.data)}
                        </h4>
                    </div>
                    
                }
                <input 
                    type="text"
                    value={contact.label}
                    placeholder = 'Enter a label'
                    onChange={
                        e => setContact({
                            ...contact,
                            label : e.target.value,
                        })
                    }    
                />
                <input 
                    type="number"
                    value={contact.number}
                    min={0}
                    placeholder = 'Your Phone Number'
                    onChange={
                        e => setContact({
                            ...contact,
                            number : e.target.value,
                        })
                    }    
                />
                {
                    latest
                    &&
                    <div className="latest">
                        <h4>{latest.number} Added</h4>
                    </div>
                }
                <button type='button' onClick={()=>add(contact,user)} disabled={loading}>
                    {
                        loading
                        ? <Loader 
                                type = "Oval"
                                color = "#ffff"
                                height  = {20}
                                width = {20}
                                timeout = {20000}
                            />
                        : <><i className="fa fa-user-plus" aria-hidden="true"></i> Add</>
                    }
                    
                </button>
            </div>
            
        </animated.div>
    )
}

const mapState = state =>({
    latest : selectLatestContact(state),
    error : selectContactError(state),
    loading : selectAddingContact(state),
    user : selectActiveUser(state),
});
const mapDispatch = dispatch =>({
    add : (contact,user)=>dispatch(addContact(contact,user)),
})

export default connect(
    mapState,
    mapDispatch,
)(AddContact);
