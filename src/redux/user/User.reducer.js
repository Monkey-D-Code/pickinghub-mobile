import userTypes from './User.types';

const INITIAL_STATE = {
    active_user : null,
    user_error : null,
    loading_user : false,

    auth_token : null,
    token_error : null,
}

const userReducer = (state = INITIAL_STATE , action)=>{

    switch(action.type){
        case userTypes.LOGOUT:
            return {
                ...state,
                active_user : null,
                user_error : null,
                auth_token : null,
                token_error : null,
            }
        case userTypes.AUTH_TOKEN_START : 
            return {
                ...state,
                loading_user : true,
                auth_token : null,
                token_error : null,
                active_user : null,
                user_error : null,
            }
        case userTypes.AUTH_TOKEN_SUCCESS : 
            return {
                ...state,
                auth_token : action.payload,
                loading_user : false,
            } 
        case userTypes.AUTH_TOKEN_ERROR:
            return {
                ...state,
                token_error : action.payload,
                loading_user : false,
            }
        case userTypes.CUSTOMER_START:
            return {
                ...state,
                loading_user : true,
            }
        case userTypes.CUSTOMER_SUCCESS:
            return {
                ...state,
                active_user : action.payload,
                loading_user : false,
            }
        case userTypes.CUSTOMER_ERROR:
            return {
                ...state,
                user_error : action.payload,
                loading_user : false,
            }
        default:
            return state;
    }
}

export default userReducer;