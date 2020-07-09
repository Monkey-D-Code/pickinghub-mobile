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

    suggested_products : null,
    products_error : null,
    loading_products : false,

    latest_review : null,
    adding_review : false,
    review_error : null,

    active_offer : null,
}


const productReducer = (state = INITIAL_STATE , action)=>{
    switch(action.type){
        case productTypes.SET_ACTIVE_OFFER:
            return {
                active_offer : action.payload,
            }

        case productTypes.ADD_REVIEW_START:
            return {
                adding_review : true,
                latest_review : null,
                review_error : null,
            }
        case productTypes.ADD_REVIEW_SUCCESS:
            return {
                latest_review : action.payload,
                adding_review : false,
                
            }
        case productTypes.ADD_REVIEW_ERROR:
            return {
                review_error : action.payload,
                adding_review : false,
            }
        case productTypes.SUGGESTED_PRODUCTS_START:
            return {
                ...state,
                suggested_products : null,
                products_error : null,
                loading_products : true,
            }
        case productTypes.SUGGESTED_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading_products : false,
                suggested_products : action.payload,
            }
        case productTypes.SUGGESTED_PRODUCTS_ERROR:
            return {
                ...state,
                loading_products : false,
                products_error : action.payload,
            }
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