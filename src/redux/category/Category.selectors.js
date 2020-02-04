import {createSelector} from 'reselect';


const selectCategory = state => state.category;


export const selectActiveCategory = createSelector(
    [selectCategory],
    category => category.active_category,
);
export const selectCategoryError = createSelector(
    [selectCategory],
    category => category.category_error,
);
export const selectLoadingCategory = createSelector(
    [selectCategory],
    category => category.loading_category,
)