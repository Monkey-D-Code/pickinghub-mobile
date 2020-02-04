import {createSelector} from 'reselect';

const selectCart = state => state.cart;
const selectProduct = state => state.product;


export const selectProductCart = createSelector(
    [selectCart],
    cart => cart.product_cart,
)
export const selectSubletquantity = createSelector(
    [selectCart,selectProduct],
    (cart,product)=>{
        const sublet = product.selected_sublet;
        if(sublet){
            const cart_sublet = cart.product_cart.find(i=>i.sublet.id === sublet.id);
            if(cart_sublet){
                return cart_sublet.quantity;
            }
            return 0;
        }
        return 0;
        
    }
)

export const selectCartTotal = createSelector(
    [selectCart],
    cart => {
        const pro_cart = cart.product_cart;
        let total = 0;
        pro_cart.forEach((sub)=>{
            total += sub.quantity * sub.sublet.selling_price;
        })
        return total;
    }
)

export const selectLatestOrder = createSelector(
    [selectCart],
    cart => cart.latest_order,
)
export const selectOrderError = createSelector(
    [selectCart],
    cart => cart.order_error,
)
export const selectMakingOrder = createSelector(
    [selectCart],
    cart => cart.making_order,
)