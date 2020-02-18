import types from './CreateProduct.types';

const INITIAL_STATE = {
    latest_product : null,
    creating_product : false,
    product_error : null,
}

const createProductReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case types.PRODUCT_CREATE_START:
            return {
                ...state,
                creating_product : true,
                latest_product : null,
                product_error : null,
            }
        case types.PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                latest_product : action.payload,
                creating_product : false,
            }
        case types.PRODUCT_CREATE_ERROR:
            return {
                ...state,
                product_error : action.payload,
                creating_product : false,
            }
        default:
            return state;
    }
}

export default createProductReducer;