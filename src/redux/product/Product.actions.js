import productTypes from './Product.types';
import djangoAPI from '../../api/backend';



const productStart = ()=>({
    type : productTypes.PRODUCT_START,
});
const productSuccess = product =>({
    type : productTypes.PRODUCT_SUCCESS,
    payload : product,
});
const productError = error =>({
    type : productTypes.PRODUCT_ERROR,
    payload : error,
});


export const chooseSublet = sublet =>({
    type : productTypes.SELECT_SUBLET,
    payload : sublet,
});
export const chooseImage = image =>({
    type : productTypes.SELECT_IMAGE,
    payload : image,
});

export const getProduct = product_id =>{
    return dispatch =>{
        dispatch(productStart());
        djangoAPI.get(`shop/api/product/${product_id}/details`)
            .then(res=>{
                dispatch(productSuccess(res.data));
                if(res.data.variants[0]){
                    dispatch(chooseSublet(res.data.variants[0].sublets[0]));
                    if(res.data.variants[0].sublets[0].productimages) {
                        dispatch(chooseImage(res.data.variants[0].sublets[0].productimages[0]));
                    }
                    
                }
                
            })
            .catch(err=>dispatch(productError(err)));
    }
}


export const searchTextChange = text =>({
    type : productTypes.CHANGE_SEARCH_TEXT,
    payload : text,
});

const searchResultsStart = ()=>({
    type : productTypes.SEARCH_RESULTS_START,
});
const searchResultsSuccess = results =>({
    type : productTypes.SEARCH_RESULTS_SUCCESS,
    payload : results,
});
const searchResultsError = error =>({
    type : productTypes.SEARCH_RESULTS_ERROR,
    payload : error,
});
export const searchProducts = text =>{
    return dispatch =>{
        dispatch(searchResultsStart());
        djangoAPI.get(`shop/api/search-products/?search=${text}`)
            .then(res=>dispatch(searchResultsSuccess(res.data)))
            .catch(err=>dispatch(searchResultsError(err)));
    }
}