import {createSelector} from 'reselect';

const selectUser = state => state.user;


export const selectActiveUser = createSelector(
    [selectUser],
    user => user.active_user,
)
export const selectIsAuth = createSelector(
    [selectUser],
    user => user.active_user ? true : false,
)
export const selectUserError = createSelector(
    [selectUser],
    user => user.user_error,
)

export const selectLoadingUser = createSelector(
    [selectUser],
    user => user.loading_user,
)

export const selectTokenError = createSelector(
    [selectUser],
    user => user.token_error,
)