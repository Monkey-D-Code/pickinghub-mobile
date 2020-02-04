import categoryTypes from './Category.types';
import djangoAPI from '../../api/backend';


const categoryStart = ()=>({
    type : categoryTypes.ACTIVE_CATEGORY_START,
})
const categoryError = error =>({
    type : categoryTypes.ACTIVE_CATEGORY_ERROR,
    payload : error,
})
const categorySuccess = category =>({
    type : categoryTypes.ACTIVE_CATEGORY_SUCCESS,
    payload : category,
})
export const getcategory = category_id =>{
    return dispatch =>{
        dispatch(categoryStart());
        djangoAPI.get(`shop/api/category/${category_id}/`)
            .then(res=>dispatch(categorySuccess(res.data)))
            .catch(err=>dispatch(categoryError(err)));
    }
}