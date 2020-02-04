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
})