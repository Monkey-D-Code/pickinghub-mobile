import React,{useState} from 'react';
import {connect} from 'react-redux';
import {useSpring,animated} from 'react-spring';
import { NavLink,Route ,withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectLatestAddress,
    selectAddingAddress,
    selectAddressError,
    selectActiveUser,

} from '../../redux/user/User.selectors';

// importing actions
import {    
    addAddress,

} from '../../redux/user/User.actions';


const AddAddress = ({latest,error,loading,user,add})=>{
    const spring = useSpring({
        opacity : 1,
        transform : 'translateX(0)',
        from  : {
            opacity : 0,
            transform : 'translateX(100vw)',
        }
    });
    const [info,setInfo] = useState({
        country : '',
        state : '',
        district : '',
        town_or_city : '',
        locality : '',
        nearest_landmark : '',
        pin_code : '',
        house_no_or_name : '',
        active : false,
    })
    return (
        <animated.div style={spring} className='add-address'>
            <h1>New Address <NavLink to='/profile'>&times;</NavLink></h1>
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
                <h4>Fill it up</h4>
                <input 
                    type="text"
                    placeholder = 'Country'
                    value={info.country}
                    onChange={
                        e => setInfo({
                            ...info,
                            country : e.target.value,
                        })
                    }
                />
                <input 
                    type="text"
                    placeholder = 'State'
                    value={info.state}
                    onChange={
                        e => setInfo({
                            ...info,
                            state : e.target.value,
                        })
                    }
                />
                <input 
                    type="text"
                    placeholder = 'District'
                    value={info.district}
                    onChange={
                        e => setInfo({
                            ...info,
                            district : e.target.value,
                        })
                    }
                />
                <input 
                    type="text"
                    placeholder = 'Town or City'
                    value={info.town_or_city}
                    onChange={
                        e => setInfo({
                            ...info,
                            town_or_city : e.target.value,
                        })
                    }
                />
                <input 
                    type="text"
                    placeholder = 'Locality'
                    value={info.locality}
                    onChange={
                        e => setInfo({
                            ...info,
                            locality : e.target.value,
                        })
                    }
                />
                <input 
                    type="text"
                    placeholder = 'Nearest landmark'
                    value={info.nearest_landmark}
                    onChange={
                        e => setInfo({
                            ...info,
                            nearest_landmark : e.target.value,
                        })
                    }
                />
                <input 
                    type="number"
                    placeholder = 'Pin Code'
                    value={info.pin_code}
                    onChange={
                        e => setInfo({
                            ...info,
                            pin_code : e.target.value,
                        })
                    }
                />
                
                <input 
                    type="text"
                    placeholder = 'House no or Name'
                    value={info.house_no_or_name}
                    onChange={
                        e => setInfo({
                            ...info,
                            house_no_or_name : e.target.value,
                        })
                    }
                />
                {
                    latest
                    &&
                    <div className="latest">
                        <h4>New Adress Added</h4>
                    </div>
                }
                <button type='button' onClick={()=>add(info,user)} disabled={loading}>
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
    latest : selectLatestAddress(state),
    error : selectAddressError(state),
    loading : selectAddingAddress(state),
    user : selectActiveUser(state),
});
const mapDispatch = dispatch =>({
    add : (address,user)=>dispatch(addAddress(address,user)),
});

export default withRouter(
    connect(
        mapState,
        mapDispatch,

    )(AddAddress)
);