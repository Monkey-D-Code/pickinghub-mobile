import {createSelector} from 'reselect';

const selectOrder = state => state.order;

export const selectAllOrders = createSelector(
    [selectOrder],
    order => order.all_orders,
);
export const selectOrdersError = createSelector(
    [selectOrder],
    order => order.orders_error,
);
export const selectLoadingOrders = createSelector(
    [selectOrder],
    order => order.loading_orders,
);

export const selectOrderDetails = createSelector(
    [selectOrder],
    order => order.order_details,
);
export const selectDetailsError = createSelector(
    [selectOrder],
    order => order.details_error,
);
export const selectLoadingDetails = createSelector(
    [selectOrder],
    order => order.loading_details,
);