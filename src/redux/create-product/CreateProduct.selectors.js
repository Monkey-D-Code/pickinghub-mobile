import {createSelector} from 'reselect';

const selectCreateProduct = state => state.create_product;

export const selectLatestProduct = createSelector(
    [selectCreateProduct],
    create_product => create_product.latest_product,
);
export const selectCreatingProduct = createSelector(
    [selectCreateProduct],
    create_product => create_product.creating_product,
);
export const selectProductError = createSelector(
    [selectCreateProduct],
    create_product => create_product.product_error,
);
