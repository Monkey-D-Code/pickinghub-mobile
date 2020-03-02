import types from './SpecialDeals.types';

const INITIAL_STATE = {
    deals : null,
    deals_error : null,
    loading_deals : false,
}



const specialDealsReducer = (state=INITIAL_STATE,action)=>{

    switch(action.type){
        case types.DEALS_START:
            return {
                ...state,
                loading_deals : true,
                deals_error : null,
                deals : null,
            }
        case types.DEALS_SUCCESS:
            return {
                ...state,
                deals  :action.payload,
                loading_deals : false,
            }
        case types.DEALS_ERROR:
            return {
                ...state,
                deals_error : action.payload,
                loading_deals : false,
            }
        default:
            return state;
    }
}

export default specialDealsReducer;