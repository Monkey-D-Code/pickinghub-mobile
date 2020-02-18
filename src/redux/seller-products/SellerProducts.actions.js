import types from './SellerProducts.types';
import djangoAPI from '../../api/backend';



const sellerproductsStart = ()=>({
    type : types.SELLER_PRODUCTS_START,
});
const sellerproductsSuccess = products =>({
    type : types.SELLER_PRODUCTS_SUCCESS,
    payload : products,
});
const sellerProductsError = error =>({
    type : types.SELLER_PRODUCTS_ERROR,
    payload : error,
});
export const getSellerproducts = seller_id =>{
    return dispatch =>{
        dispatch(sellerproductsStart());
        djangoAPI.get(`shop/api/seller/${seller_id}/products/`)
            .then(res=>dispatch(sellerproductsSuccess(res.data)))
            .catch(err=>dispatch(sellerProductsError(err)));
    }
}
export const chooseDepartment = department =>({
    type : types.CHOOSE_DEPARTMENT,
    payload : department,
})

// demographics
const demographicsStart = ()=>({
    type : types.DEMOGRAPHICS_START,
});
const demographicsSuccess = categories =>({
    type : types.DEMOGRAPHICS_SUCCESS,
    payload : categories,
});
const demographicsError = error =>({
    type : types.DEMOGRAPHICS_ERROR,
    payload : error,
});
export const getdemographicsOfDept = dept_id =>{
    return dispatch =>{
        dispatch(demographicsStart());
        djangoAPI.get(`shop/api/department/${dept_id}/demographics/`)
            .then(res=>dispatch(demographicsSuccess(res.data)))
            .catch(err=>dispatch(demographicsError(err)));
    }
}
export const chooseDemographic = demo =>({
    type : types.CHOOSE_DEMOGRAPHIC,
    payload : demo,
})


// categories
const categoriesStart = ()=>({
    type : types.CATEGORIES_START,
});
const categoriesSuccess = categories =>({
    type : types.CATEGORIES_SUCCESS,
    payload : categories,
});
const categoriesError = error =>({
    type : types.CATEGORIES_ERROR,
    payload : error,
});
export const getCategoriesOfDept = demo_id =>{
    return dispatch =>{
        dispatch(categoriesStart());
        djangoAPI.get(`shop/api/${demo_id}/categories/`)
            .then(res=>dispatch(categoriesSuccess(res.data)))
            .catch(err=>dispatch(categoriesError(err)));
    }
}
export const chooseCategory = category =>({
    type : types.CHOOSE_CATEGORY,
    payload : category,
})


// companies
