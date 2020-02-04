import categoryTypes from './Category.types';

const INITIAL_STATE = {
    active_category : null,
    category_error : null,
    loading_category  :false,
}


const categoryReducer = (state = INITIAL_STATE , action)=>{
    switch(action.type){
        case categoryTypes.ACTIVE_CATEGORY_START:
            return {
                ...state,
                loading_category : true,
                active_category  :null,
                category_error : null,
            }
        case categoryTypes.ACTIVE_CATEGORY_SUCCESS:
            return {
                ...state,
                active_category : action.payload,
                loading_category  : false,
            }
        case categoryTypes.ACTIVE_CATEGORY_ERROR:
            return {
                ...state,
                category_error : action.payload,
                loading_category  : false,
            }
        default:
            return state;
    }
}

export default categoryReducer;