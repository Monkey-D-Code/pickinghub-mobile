import React,{useState,useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import { NavLink,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing actions
import {
    sellerRegister,

} from '../../redux/user/User.actions';
// importing selectors
import {
    selectActiveSeller,
    selectSellerError,
    selectLoadingSeller,

} from '../../redux/user/User.selectors';



const SellerRegister = ({match,loading,error,seller,register}) => {
    const spring = useSpring({
        opacity : 1,
        
        from :{
            opacity : 0,
            
        }
        
    });
    const [newSeller,setSeller] = useState({
       first_name : '',
       last_name : '',
       username : '',
       email : '',
       contact_number : '',
       address : '',
       cover_image : '',
       password : '',
       confirm_password : '',

       company_name : '',
       start_date : 'Choose Starting Date',
       about : '',

    });
    useEffect(()=>{},[newSeller]);
    const submit = ()=>{
        register(newSeller);
    }
    return (
        <animated.div style={spring} className='register'>
            <h1>Seller Register</h1>
            {
                error
                &&
                error.response
                &&
                error.response.data
                ?
                <div className="error">
                    <h4>
                        {JSON.stringify(error.response.data)}
                    </h4>
                </div>
                :error !== null && <div className="error">
                        <h4>
                            {JSON.stringify(error)}
                        </h4>
                    </div>
            }
            <div className="form-group">
                <h3>Personal Information</h3>
                <input 
                    type="text" 
                    placeholder="Your First Name"
                    
                    value={newSeller.first_name}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                first_name : e.target.value
                        })
                    }
                />
                <input 
                    type="text" 
                    placeholder="Your Last Name" 
                    value={newSeller.last_name}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                last_name : e.target.value
                        })
                    }
                />
                <input 
                    type="email" 
                    placeholder="Email Adderss" 
                    value={newSeller.email}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                email : e.target.value
                        })
                    }
                />
                <input 
                    type="number" 
                    placeholder="Your Contact Number"
                    min={0} 
                    value={newSeller.contact_number}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                contact_number : e.target.value
                        })
                    }
                />
                <input 
                    type="url" 
                    placeholder="Paste Image Link" 
                    value={newSeller.cover_image}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                cover_image : e.target.value
                        })
                    }
                />
                <textarea 
                    value={newSeller.address}
                    placeholder="Your Address" 
                    onChange={
                        e => setSeller({
                            ...newSeller,
                            address  :e.target.value,
                        })
                    }
                    rows="3"
                ></textarea>
            </div>
            <div className="form-group">
                <h3>Authentication Info</h3>
                <p>8 characters minimum</p>
                <input 
                    type="text" 
                    placeholder="Choose a Username" 
                    value={newSeller.username}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                username : e.target.value
                        })
                    }
                />
                <input 
                    type="password" 
                    placeholder="Choose a password" 
                    value={newSeller.password}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                password : e.target.value
                        })
                    }
                />
                <input 
                    type="password" 
                    placeholder="Repeat Password" 
                    value={newSeller.confirm_password}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                confirm_password : e.target.value
                        })
                    }
                />
                
            </div>
            <div className="form-group">
                <h3>Seller Information</h3>
                <input 
                    type="text" 
                    placeholder="Name of your Company/Store" 
                    value={newSeller.company_name}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                company_name : e.target.value
                        })
                    }
                />
                <p>Your Company/Store Starting Date</p>
                <input 
                    type="date" 
                    placeholder="Starting Date" 
                    value={newSeller.start_date}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                start_date : e.target.value
                        })
                    }
                />
                <textarea 
                    value={newSeller.about}
                    placeholder="Describe Your Company/Store" 
                    onChange={
                        e => setSeller({
                            ...newSeller,
                            about  :e.target.value,
                        })
                    }
                    rows="3"
                ></textarea>
                <button type='button' onClick={submit} disabled={loading}>
                    {
                        loading
                        ? <Loader 
                                type = "Oval"
                                color = "#ffff"
                                height  = {20}
                                width = {20}
                                timeout = {20000}
                            />
                        : <><i className="fa fa-user-plus" aria-hidden="true"></i> Join Us</>
                    }
                    
                </button>
            </div>
            <div className="message">
                <h4>Already A Seller ? </h4>
                <NavLink to={`${match.path}/login`}>Login Here</NavLink>
            </div>
        </animated.div>
    )
}

const mapState = state =>({
    seller : selectActiveSeller(state),
    error : selectSellerError(state),
    loading : selectLoadingSeller(state),
});
const mapDispatch = dispatch =>({
    register : sellerData => dispatch(sellerRegister(sellerData)),
});

export default withRouter(connect(
    mapState,
    mapDispatch,

)(SellerRegister));
