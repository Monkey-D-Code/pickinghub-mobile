import userTypes from './User.types';

const INITIAL_STATE = {
    active_user : null,
    user_error : null,
    loading_user : false,

    auth_token : null,
    token_error : null,

    active_seller : null,
    seller_error : null,
    loading_seller : false,
    seller_update_error : null,

    latest_address : null,
    adding_address : false,
    address_error : null,

    latest_contact : null,
    adding_contact : false,
    contact_error : null,
    
}

const userReducer = (state = INITIAL_STATE , action)=>{

    switch(action.type){
        case userTypes.ADD_ADDRESS_START:
            return {
                ...state,
                latest_address : null,
                adding_address : true,
                address_error : null,
            }
        case userTypes.ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                latest_address : action.payload,
                adding_address : false,
                active_user : {
                    ...state.active_user,
                    all_address : [...state.active_user.all_address , action.payload]
                }
                
            }
        case userTypes.ADD_ADDRESS_ERROR:
            return {
                ...state,
                
                adding_address : false,
                address_error : action.payload,
            }
        case userTypes.ADD_CONTACT_START:
            return {
                ...state,
                latest_contact : null,
                adding_contact : true,
                contact_error : null,
            }
        case userTypes.ADD_CONTACT_SUCCESS:
            return {
                ...state,
                latest_contact : action.payload,
                adding_contact : false,
                active_user : {
                    ...state.active_user,
                    contacts : [...state.active_user.contacts , action.payload]
                }
                
            }
        case userTypes.ADD_CONTACT_ERROR:
            return {
                ...state,
                
                adding_contact : false,
                contact_error : action.payload,
            }
        case userTypes.SELLER_UPDATE_START:
            return {
                ...state,
                loading_seller : true,
                seller_update_error : null,
            }
        case userTypes.SELLER_UPDATE_SUCCESS:
            return {
                ...state,
                loading_seller : false,
                active_seller : action.payload,
            }
        case userTypes.SELLER_UPDATE_ERROR:
            return {
                ...state,
                loading_seller : false,
                seller_update_error : action.payload,
            }
        case userTypes.SELLER_START:
            return {
                ...state,
                loading_seller : true,
                active_seller : null,
                seller_error : null,
            }
        case userTypes.SELLER_SUCCESS:
            return {
                ...state,
                active_seller  :action.payload,
                loading_seller : false,
            }
        case userTypes.SELLER_ERROR:
            return {
                ...state,
                seller_error : action.payload,
                loading_seller : false,
            }
        case userTypes.LOGOUT:
            return {
                ...state,
                active_user : null,
                user_error : null,
                auth_token : null,
                token_error : null,
                active_seller: null,
                seller_error : null,
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