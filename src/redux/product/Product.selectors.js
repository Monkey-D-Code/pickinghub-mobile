import {createSelector} from 'reselect';
import productTypes from './Product.types';

const selectProduct = state => state.product;

export const selectActiveProduct = createSelector(
    [selectProduct],
    product => product.active_product,
);

export const selectProductError = createSelector(
    [selectProduct],
    product => product.product_error,
);

export const selectLoadingProduct = createSelector(
    [selectProduct],
    product => product.loading_product,
)

export const selectSelectedSublet = createSelector(
    [selectProduct],
    product => product.selected_sublet,
)
export const selectSelectedImage = createSelector(
    [selectProduct],
    product => product.selected_image,
)



export const selectSearchText = createSelector(
    [selectProduct],
    product => product.search_text,
);
export const selectSerchResults = createSelector(
    [selectProduct],
    product => product.search_results,
);
export const selectLoadingResults = createSelector(
    [selectProduct],
    product => product.loading_results,
);
export const selectResultsError = createSelector(
    [selectProduct],
    product => product.results_error,
)