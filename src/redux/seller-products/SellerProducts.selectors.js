import {createSelector} from 'reselect';

const selectSellerProducts = state => state.seller_products;

export const selectProducts = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.seller_products,
);
export const selectLoadingProducts = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.loading_products,
);
export const selectProductsError = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.products_error,
);
export const selectChoosenDepartment = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.choosen_department,
);

export const selectCategories = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.categories,
);
export const selectLoadingCategories = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.loading_categories,
);
export const selectCategoriesError = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.categories_error,
);
export const selectChoosenCategory = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.choosen_category,
);


export const selectDemographics = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.demographics,
);
export const selectLoadingDemographics = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.loading_demographics,
);
export const selectDemographicsError = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.demographics_error,
);
export const selectChoosenDemographic = createSelector(
    [selectSellerProducts],
    seller_products => seller_products.choosen_demographic,
);
