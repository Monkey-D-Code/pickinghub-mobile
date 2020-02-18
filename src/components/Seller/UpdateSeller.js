import React,{useState,useEffect} from 'react';
import {useSpring ,animated} from 'react-spring';
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';
// importing actions
import {
    updateSeller,
} from '../../redux/user/User.actions';

// importing selectors
import {
    selectSellerUpdateError,
    selectLoadingSeller,
    selectActiveSeller,

} from '../../redux/user/User.selectors';



const UpdateSeller = ({seller,error,loading,update}) => {
    const spring = useSpring({
        opacity : 1,
        transform : 'translateX(0)',
        from : {
            opacity : 0,
            transform : 'translateX(100vw)',
        }
    });
    const [newSeller,setSeller] = useState({
       seller_id : '',
       user_id : '',
       first_name : '',
       last_name : '',
       
       email : '',
       contact_number : '',
       address : '',
       cover_image : '',
       

       company_name : '',
       start_date : 'Choose Starting Date',
       about : '',
    });
    useEffect(()=>{
        setSeller({
            seller_id : seller.id,
            user_id : seller.user.id,
            first_name : seller.user.first_name,
            last_name : seller.user.last_name,
            email : seller.user.email,
            contact_number : seller.contact_number,
            address : seller.address,
            cover_image : seller.cover_image,
            company_name : seller.company_name,
            start_date : seller.start_date,
            about : seller.about,
        })
    },[])
    const submit = ()=>{
        update(newSeller);
    }
    return (
        <animated.div style={spring} className = 'update-seller'>
            <h1>Update @{seller.user.username}</h1>
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
            <div className="form-group">
                <h3>Personal Information</h3>
                <input 
                    type="text" 
                    placeholder="Your First Name"
                    
                    value={newSeller.first_name || ''}
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
                    value={newSeller.last_name || ''}
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
                    value={newSeller.email || ''}
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
                    value={newSeller.contact_number || ''}
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
                    value={newSeller.cover_image || ''}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                cover_image : e.target.value
                        })
                    }
                />
                <textarea 
                    value={newSeller.address || ''}
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
                <h3>Seller Information</h3>
                <input 
                    type="text" 
                    placeholder="Name of your Company/Store" 
                    value={newSeller.company_name || ''}
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
                    value={newSeller.start_date || ''}
                    onChange={
                            e => setSeller({
                                ...newSeller, 
                                start_date : e.target.value
                        })
                    }
                />
                <textarea 
                    value={newSeller.about || ''}
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
                        : <><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</>
                    }
                    
                </button>
            </div>
        </animated.div>
    )
}

const mapState = state =>({
    seller : selectActiveSeller(state),
    error : selectSellerUpdateError(state),
    loading : selectLoadingSeller(state),
})
const mapDispatch = dispatch =>({
    update : sellerData => dispatch(updateSeller(sellerData)),
})

export default connect(
    mapState,
    mapDispatch,

)(UpdateSeller);
