import cartTypes from './Cart.types';
import { act } from 'react-dom/test-utils';
import cart from '../../elements/cart';

const INITIAL_STATE = {
    product_cart : [],

    latest_order : null,
    order_error : null,
    making_order : false,
}


const cartReducer = (state = INITIAL_STATE , action)=>{
    
    switch(action.type){
        case cartTypes.ORDER_START:
            return {
                ...state,
                latest_order : null,
                order_error : null,
                making_order : true,
            }
        case cartTypes.ORDER_SUCCESS:
            return {
                ...state,
                latest_order : action.payload,
                making_order : false,
                product_cart : [],
                
            }
        case cartTypes.ORDER_ERROR:
            return {
                ...state,
                order_error : action.payload,
                making_order : false,
            }
        case cartTypes.ADD_SUBLET_TO_CART:
            return {
                ...state,
                product_cart : [...state.product_cart , action.payload],
                latest_order : null,
                order_error : null,
                
            }
        case cartTypes.UPDATE_SUBLET_IN_CART:
            const oldCart = state.product_cart;
            const cart_sublet_index = oldCart.findIndex(i=>i.sublet.id === action.payload.sublet.id);
            oldCart.splice(cart_sublet_index , 1);
            return {
                ...state,
                product_cart : [...state.product_cart , action.payload]
            }
        case cartTypes.REMOVE_SUBLET_FROM_CART:
            const oldCart_1 = state.product_cart;
            const cart_sublet_index_1 = oldCart_1.findIndex(i=>i.sublet.id === action.payload.sublet.id);
            oldCart_1.splice(cart_sublet_index_1 , 1);
            return {
                ...state,
                product_cart : [...state.product_cart]
            }
        default:
            return state;
    }
}

export default cartReducer;