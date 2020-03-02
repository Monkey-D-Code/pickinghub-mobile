import types from './SpecialDeals.types';
import djangoAPI from '../../api/backend';


const dealsStart = ()=>({
    type : types.DEALS_START,
});
const dealsSucess = deals =>({
    type : types.DEALS_SUCCESS,
    payload : deals,
})
const dealsError = error =>({
    type : types.DEALS_ERROR,
    payload : error,
});
export const getSpecialDeals = ()=>{
    return dispatch => {
        dispatch(dealsStart());
        djangoAPI.get('shop/api/special-deals/')
            .then(res=>dispatch(dealsSucess(res.data)))
            .catch(err=>dispatch(dealsError(err)));
    }
}