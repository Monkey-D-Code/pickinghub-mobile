import types from './CreateProduct.types';
import djangoAPI from '../../api/backend';


const productCreateStart = ()=>({
    type : types.PRODUCT_CREATE_START,
});
const productCreateSuccess = newProduct =>({
    type : types.PRODUCT_CREATE_SUCCESS,
    payload : newProduct,
});
const productCreateError = error =>({
    type : types.PRODUCT_CREATE_ERROR,
    payload : error,
});
export const createProduct = (product,seller,category) =>{
    return dispatch =>{
        dispatch(productCreateStart());
        const productMod = {
            seller : seller.id,
            category : category.id,
            ...product,
        }
        djangoAPI.post(`shop/api/product/create/`, productMod)
            .then(res=>dispatch(productCreateSuccess(res.data)))
            .catch(err=>dispatch(productCreateError(err)));
    }
}