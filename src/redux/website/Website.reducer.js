import websiteTypes from './Website.types';

const INITIAL_STATE = {
    navigation_switch : false,


    brand : null,
    brand_error : null,
    loading_brand : false,
}

const websiteReducer = (state = INITIAL_STATE ,action) =>{
    switch(action.type){
        case websiteTypes.BRAND_START:
            return {
                ...state,
                loading_brand : true,
                brand : null,
                brand_error : null,
            }
        case websiteTypes.BRAND_SUCCESS:
            return {
                ...state,
                brand : action.payload,
                loading_brand : false,
            }
        case websiteTypes.BRAND_ERROR:
            return {
                ...state,
                brand_error : action.payload,
                loading_brand : false,
            }
        case websiteTypes.SET_NAVIGATION:
            return {
                ...state,
                navigation_switch : !state.navigation_switch,
            }
        default:
            return state;
    }
}

export default websiteReducer;