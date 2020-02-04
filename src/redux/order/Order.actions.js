import orderTypes from './Order.types';
import djangoAPI from '../../api/backend';

const ordersStart = ()=>({
    type : orderTypes.ALL_ORDERS_START,
});
const ordersSuccess = all_orders =>({
    type : orderTypes.ALL_ORDERS_SUCCESS,
    payload : all_orders,
});
const ordersError = error =>({
    type : orderTypes.ALL_ORDERS_ERROR,
    payload : error,
});
export const getAllOrders = customer_id =>{
    return dispatch =>{
        dispatch(ordersStart());
        djangoAPI.get(`shop/api/order/${customer_id}/list/`)
            .then(res=>dispatch(ordersSuccess(res.data)))
            .catch(err=>dispatch(ordersError(err)));
    }
}

const orderDetailsStart = ()=>({
    type : orderTypes.ORDER_DETAILS_START,
});
const orderDetailsSuccess = order =>({
    type : orderTypes.ORDER_DETAILS_SUCCESS,
    payload : order,
});
const orderDetailsError = error =>({
    type : orderTypes.ORDER_DETAILS_ERROR,
    payload : error,
});
export const getOrderDetails = order_id =>{
    return dispatch =>{
        dispatch(orderDetailsStart());
        djangoAPI.get(`shop/api/order/${order_id}/details/`)
            .then(res=>dispatch(orderDetailsSuccess(res.data)))
            .catch(err=>dispatch(orderDetailsError(err)));
    }
}