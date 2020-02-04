import orderTypes from './Order.types';

const INITIAL_STATE = {
    all_orders : null,
    orders_error : null,
    loading_orders : false,

    order_details : null,
    details_error : null,
    loading_details : false,
}

const orderReducer = (state = INITIAL_STATE , action)=>{
    switch(action.type){
        case orderTypes.ORDER_DETAILS_START:
            return {
                ...state,
                order_details : null,
                details_error : null,
                loading_details : true,
            }
        case orderTypes.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                order_details : action.payload,
                loading_details : false,
            }
        case orderTypes.ORDER_DETAILS_ERROR:
            return {
                ...state,
                details_error: action.payload,
                loading_details : false,
            }
        case orderTypes.ALL_ORDERS_START:
            return {
                ...state,
                all_orders : null,
                orders_error : null,
                loading_orders : true,
            }
        case orderTypes.ALL_ORDERS_SUCCESS:
            return {
                ...state,
                all_orders : action.payload,
                loading_orders : false,
            }
        case orderTypes.ALL_ORDERS_ERROR:
            return {
                ...state,
                orders_error : action.payload,
                loading_orders : false,
            }

        default:
            return state;
    }
}

export default orderReducer;