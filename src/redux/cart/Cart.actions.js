import cartTypes from './Cart.types';
import djangoAPI from '../../api/backend';
import cart from '../../elements/cart';


export const addSublet = cart_sublet =>({
    type : cartTypes.ADD_SUBLET_TO_CART,
    payload : cart_sublet,
});
export const updateSublet = cart_sublet =>({
    type : cartTypes.UPDATE_SUBLET_IN_CART,
    payload : cart_sublet,
})

export const removeSublet = cart_sublet =>({
    type : cartTypes.REMOVE_SUBLET_FROM_CART,
    payload : cart_sublet,
})

const orderStart = ()=>({
    type : cartTypes.ORDER_START,
})
const orderSuccess = newOrder =>({
    type : cartTypes.ORDER_SUCCESS,
    payload : newOrder,
})
const orderError = error =>({
    type : cartTypes.ORDER_ERROR,
    payload : error,
});
export const makeNewOrder = (customer_id , cart) =>{
    return dispatch=>{
        dispatch(orderStart());
        djangoAPI.post(`/shop/api/order/${customer_id}/new/`, cart)
            .then(res=>dispatch(orderSuccess(res.data)))
            .catch(err=>dispatch(orderError(err)));
    }
}