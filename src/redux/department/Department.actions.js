import departmentTypes from './Department.types';
import djangoAPI from '../../api/backend';

const departmentsStart = ()=>({
    type : departmentTypes.ALL_DEPARTMENTS_START,
});
const departmentsSuccess = departments =>({
    type : departmentTypes.ALL_DEPARTMENTS_SUCCESS,
    payload : departments,
});
const departmentsError = error =>({
    type : departmentTypes.ALL_DEPARTMENTS_ERROR,
    payload : error,
});
export const getDepartments = ()=>{
    return dispatch => {
        dispatch(departmentsStart());
        djangoAPI.get('shop/api/department/list/')
            .then(res=>dispatch(departmentsSuccess(res.data)))
            .catch(err => dispatch(departmentsError(err.response)));
    }
}

const activeDepartmentStart = ()=>({
    type : departmentTypes.ACTIVE_DEPARTMENT_START,
});
const activeDepartmentSuccess = department =>({
    type : departmentTypes.ACTIVE_DEPARTMENT_SUCCESS,
    payload : department,
})
const activeDepartmentError = err =>({
    type : departmentTypes.ACTIVE_DEPARTMENT_ERROR,
    payload : err,
})
export const getActiveDepartment = department_id =>{
    return dispatch=>{
        dispatch(activeDepartmentStart());
        djangoAPI.get(`shop/api/department/${department_id}/`)
            .then(res=>dispatch(activeDepartmentSuccess(res.data)))
            .catch(err=>dispatch(activeDepartmentError(err)));
    }
}