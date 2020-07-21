import userTypes from './User.types';
import djangoAPI from '../../api/backend';

const authTokenStart = ()=>({
    type : userTypes.AUTH_TOKEN_START,
})
const authTokenSuccess = token =>({
    type : userTypes.AUTH_TOKEN_SUCCESS,
    payload : token,
})
const authTokenError = error =>({
    type : userTypes.AUTH_TOKEN_ERROR,
    payload : error,
})
const customerStart = ()=>({
    type : userTypes.CUSTOMER_START,
});
const customerSuccess = customer =>({
    type : userTypes.CUSTOMER_SUCCESS,
    payload : customer,
})
const customerError = error =>({
    type : userTypes.CUSTOMER_ERROR,
    payload : error,
});


export const customerLogin = authData =>{
    return dispatch =>{
        dispatch(authTokenStart());
        djangoAPI.post('accounts/api/auth-token/' , authData)
            .then(res=>{
                dispatch(authTokenSuccess(res.data.token));
                dispatch(customerStart());
                djangoAPI.post('accounts/api/customer-from-token/', {token : res.data.token})
                    .then(resp =>dispatch(customerSuccess(resp.data)))
                    .catch(err=>dispatch(customerError(err)));
            })
            .catch(err=>dispatch(authTokenError(err)));
    }
}

export const customerRegister = customerData =>{
    return dispatch =>{
        dispatch(customerStart());
        djangoAPI.post('accounts/api/customer-register/',customerData)
            .then(res=>dispatch(customerSuccess(res.data)))
            .catch(err=>dispatch(customerError(err)));
    }
}

export const logout = ()=>({
    type : userTypes.LOGOUT,
});


const sellerStart = ()=>({
    type : userTypes.SELLER_START,
});
const sellerSuccess = seller =>({
    type : userTypes.SELLER_SUCCESS,
    payload : seller,
});
const sellerError = error =>({
    type : userTypes.SELLER_ERROR,
    payload : error,
});

export const sellerRegister = sellerData =>{
    return dispatch =>{
        dispatch(sellerStart());
        const sellerDataMod = {
            user : {
                first_name : sellerData.first_name,
                last_name : sellerData.last_name,
                email  :sellerData.email,
                username : sellerData.username,
                password : sellerData.password,
            },
            cover_image : sellerData.cover_image,
            contact_number : sellerData.contact_number,
            address : sellerData.address,
            company_name : sellerData.company_name,
            start_date  :sellerData.start_date,
            about : sellerData.about,
        }
        djangoAPI.post('accounts/api/seller-register/',sellerDataMod)
            .then(res=>dispatch(sellerSuccess(res.data)))
            .catch(err=>dispatch(sellerError(err)));
    }
}

export const  sellerLogin = authData =>{
    return dispatch =>{
        dispatch(authTokenStart());
        djangoAPI.post('accounts/api/auth-token/' , authData)
            .then(res=>{
                dispatch(authTokenSuccess(res.data.token));
                dispatch(sellerStart());
                djangoAPI.post('accounts/api/seller-login/', {token : res.data.token})
                    .then(resp =>dispatch(sellerSuccess(resp.data)))
                    .catch(err=>dispatch(sellerError(err)));
            })
            .catch(err=>dispatch(authTokenError(err)));
    }
}
const sellerUpdateStart = ()=>({
    type : userTypes.SELLER_UPDATE_START,
});
const sellerUpdateSuccess = newSeller =>({
    type : userTypes.SELLER_UPDATE_SUCCESS,
    payload : newSeller,
})
const updateSellerError = err=>({
    type : userTypes.SELLER_UPDATE_ERROR,
    payload : err,
});
export const updateSeller = sellerData =>{
    return dispatch =>{
        dispatch(sellerUpdateStart());
        const sellerDataMod = {
            id : sellerData.seller_id,
            user : {
                id : sellerData.user_id,
                first_name : sellerData.first_name,
                last_name : sellerData.last_name,
                email  :sellerData.email,
                
            },
            cover_image : sellerData.cover_image,
            contact_number : sellerData.contact_number,
            address : sellerData.address,
            company_name : sellerData.company_name,
            start_date  :sellerData.start_date,
            about : sellerData.about,
        }
        djangoAPI.post(`accounts/api/seller-update/`,sellerDataMod)
            .then(res=>dispatch(sellerUpdateSuccess(res.data)))
            .catch(err=>dispatch(updateSellerError(err)));
    }
}


const addAddressStart = ()=>({
    type : userTypes.ADD_ADDRESS_START,
});
const addAddressSuccess = newSeller =>({
    type : userTypes.ADD_ADDRESS_SUCCESS,
    payload : newSeller,
})
const addAddressError = err=>({
    type : userTypes.ADD_ADDRESS_ERROR,
    payload : err,
});
export const addAddress = (address,customer) =>{
    return dispatch =>{
        dispatch(addAddressStart());
        const addressMod = {
            customer : customer.id,
            ...address,
        }
        djangoAPI.post(`accounts/api/customer/${customer.id}/address/`,addressMod)
            .then(res=>dispatch(addAddressSuccess(res.data)))
            .catch(err=>dispatch(addAddressError(err)));
    }
}

const addContactStart = ()=>({
    type : userTypes.ADD_CONTACT_START,
});
const addContactSuccess = newSeller =>({
    type : userTypes.ADD_CONTACT_SUCCESS,
    payload : newSeller,
})
const addContactError = err=>({
    type : userTypes.ADD_CONTACT_ERROR,
    payload : err,
});
export const addContact = (contact,customer) =>{
    return dispatch =>{
        dispatch(addContactStart());
        const contactMod = {
            customer : customer.id,
            ...contact,
        }
        djangoAPI.post(`accounts/api/customer/${customer.id}/contact/`,contactMod)
            .then(res=>dispatch(addContactSuccess(res.data)))
            .catch(err=>dispatch(addContactError(err)));
    }
}

// reset password
const resetPasswordStart = ()=>({
    type : userTypes.RESET_PASSWORD_START,
});
const resetPasswordSuccess = success => ({
    type : userTypes.RESET_PASSWORD_SUCCESS,
    payload : success,
});
const resetPasswordError = error =>({
    type    : userTypes.RESET_PASSWORD_ERROR,
    payload : error,
});

export const resetPassword = email =>{
    return dispatch =>{
        dispatch(resetPasswordStart());
        djangoAPI.post('accounts/api/customer/forgot-password/',{email : email})
            .then(res => dispatch(resetPasswordSuccess(res.data)))
            .catch((err) => {
                dispatch(resetPasswordError(err))
                console.log(err.response)
            });

    }
}


// change password
const changePasswordStart = ()=>({
    type : userTypes.CHANGE_PASSWORD_START,
});
const changePasswordSuccess = success =>({
    type : userTypes.CHANGE_PASSWORD_SUCCESS,
    payload : success,
});
const changePasswordError   =   error =>({
    type : userTypes.CHANGE_PASSWORD_ERROR,
    payload : error,
})
export const changePassword = data =>{
    return dispatch => {
        dispatch(changePasswordStart());
        djangoAPI.post('accounts/api/customer/change-password/',data)
            .then(res => dispatch(changePasswordSuccess(res.data)))
            .catch(err => dispatch(changePasswordError(err)));
    }
}