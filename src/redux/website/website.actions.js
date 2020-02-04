import websiteTypes from './Website.types';
import djangoAPI from '../../api/backend';

export const toggleMenu = ()=>({
    type : websiteTypes.SET_NAVIGATION,
});

const brandStart = ()=>({
    type : websiteTypes.BRAND_START,
});
const brandSuccess = brand =>({
    type : websiteTypes.BRAND_SUCCESS,
    payload : brand,
});
const brandError = error =>({
    type : websiteTypes.BRAND_ERROR,
    payload : error,
});

export const getBrand = ()=>{
    return dispatch =>{
        dispatch(brandStart());
        djangoAPI.get('api/brand/1/details/')
            .then(res=>dispatch(brandSuccess(res.data)))
            .catch(err=>dispatch(brandError(err.response)));
    }
}
