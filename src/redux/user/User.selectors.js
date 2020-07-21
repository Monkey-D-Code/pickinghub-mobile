import {createSelector} from 'reselect';

const selectUser = state => state.user;


export const selectActiveUser = createSelector(
    [selectUser],
    user => user.active_user,
);
export const selectAllowedToShop = createSelector(
    [selectUser],
    user => {
        if(user.active_user.all_address && user.active_user.contacts){
            if(user.active_user.all_address.length > 0 && user.active_user.contacts.length > 0){
                return true;
            }
        }
        return false;
    }
)
export const selectIsAuth = createSelector(
    [selectUser],
    user => user.active_user || user.active_seller ? true : false,
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
);

export const selectActiveSeller = createSelector(
    [selectUser],
    user => user.active_seller,
)
export const selectSellerError = createSelector(
    [selectUser],
    user => user.seller_error,
)
export const selectLoadingSeller = createSelector(
    [selectUser],
    user => user.loading_seller,
)
export const selectSellerUpdateError = createSelector(
    [selectUser],
    user => user.seller_update_error,
)
export const selectConfirmedSeller = createSelector(
    [selectUser],
    user => user.active_seller.confirmed || null,
)


// address
export const selectAllAddress = createSelector(
    [selectUser],
    user => user.all_address || false,
)

export const selectLatestAddress = createSelector(
    [selectUser],
    user => user.latest_address,
)
export const selectAddressError = createSelector(
    [selectUser],
    user => user.address_error,
)
export const selectAddingAddress = createSelector(
    [selectUser],
    user => user.adding_address,
)

// contact
export const selectLatestContact = createSelector(
    [selectUser],
    user => user.latest_contact,
)
export const selectContactError = createSelector(
    [selectUser],
    user => user.contact_error,
)
export const selectAddingContact = createSelector(
    [selectUser],
    user => user.adding_contact,
)


// reset password
export const selectResetPasswordSuccess = createSelector(
    [selectUser],
    user => user.reset_password_success,
)
export const selectResettingPassword = createSelector(
    [selectUser],
    user => user.resetting_password,
)
export const selectResetPasswordError = createSelector(
    [selectUser],
    user => user.reset_password_error,
)

// change password
export const selectChangingPassword = createSelector(
    [selectUser],
    user => user.changing_password,
)
export const selectChangePasswordSuccess = createSelector(
    [selectUser],
    user => user.change_password_success,
)
export const selectChangePasswordError = createSelector(
    [selectUser],
    user => user.change_password_error,
)

