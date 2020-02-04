import productTypes from './Product.types';


const INITIAL_STATE = {
    active_product : null,
    loading_product : false,
    product_error : null,

    selected_sublet : null,
    selected_image : null,

    search_text : '',
    search_results : null,
    results_error : null,
    loading_results : false,
}


const productReducer = (state = INITIAL_STATE , action)=>{
    switch(action.type){
        case productTypes.CHANGE_SEARCH_TEXT:
            return {
                ...state,
                search_text : action.payload,
            }
        case productTypes.SEARCH_RESULTS_START:
            return {
                ...state,
                loading_results : true,
                search_results : null,
                results_error : null,
            }
        case productTypes.SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                search_results : action.payload,
                loading_results : false,
            }
        case productTypes.SEARCH_RESULTS_ERROR:
            return {
                ...state,
                results_error : action.payload,
                loading_results : false,
            }
        case productTypes.SELECT_IMAGE:
            return {
                ...state,
                selected_image : action.payload,
            }
        case productTypes.SELECT_SUBLET:
            return {
                ...state,
                selected_sublet : action.payload,
                selected_image : action.payload.productimages[0],
            }
        case productTypes.PRODUCT_START:
            return {
                ...state,
                loading_product : true,
                active_product : null,
                product_error : null,
            }
        case productTypes.PRODUCT_SUCCESS:
            return {
                ...state,
                active_product : action.payload,
                loading_product : false,
            }
        case productTypes.PRODUCT_ERROR:
            return {
                ...state,
                product_error : action.payload,
                loading_product : false,
            }

        default:
            return state;
    }
}

export default productReducer;