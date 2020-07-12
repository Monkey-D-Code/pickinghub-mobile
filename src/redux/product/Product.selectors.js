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


// suggested products
export const selectSuggestedProducts = createSelector(
    [selectProduct],
    product => product.suggested_products,
);
export const selectProductsError = createSelector(
    [selectProduct],
    product => product.products_error,
);
export const selectLoadingProducts = createSelector(
    [selectProduct],
    product => product.loading_products,
);

// reviews
export const selectCustomerReviews = createSelector(
    [selectProduct],
    product => {
        if(product.active_product){
            if(product.active_product.reviews){
                return product.active_product.reviews;
            }
        }
        return false;
    }

)
export const selectReviewError = createSelector(
    [selectProduct],
    product => product.review_error,
);
export const selectAddingReview = createSelector(
    [selectProduct],
    product => product.adding_review,
)
export const selectLatestReview = createSelector(
    [selectProduct],
    product => product.latest_review,
)


// discount offers
export const selectDiscountOffers = createSelector(
    [selectProduct],
    product => {
        if(product.active_product) return product.active_product.discount_offers || null;
        return null;
    }
)
export const selectActiveOffer = createSelector(
    [selectProduct],
    product => product.active_offer,
)