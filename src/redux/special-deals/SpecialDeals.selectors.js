import {createSelector} from 'reselect';


const selectSpecialDeals = state => state.special_deals;


export const selectDeals = createSelector(
    [selectSpecialDeals],
    special_deals => special_deals.deals,
)
export const selectDealsError = createSelector(
    [selectSpecialDeals],
    special_deals => special_deals.deals_error,
)
export const selectLoadingDeals = createSelector(
    [selectSpecialDeals],
    special_deals => special_deals.loading_deals,
)