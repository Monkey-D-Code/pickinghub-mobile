import departmentTypes from './Department.types';

const INITIAL_STATE = {
    departments : null,
    departments_error : null,
    loading_departments : false,

    active_department : null,
    active_department_error : null,
    loading_active_department : false,
}


const departmentReducer = (state = INITIAL_STATE , action)=>{

    switch(action.type){
        case departmentTypes.ACTIVE_DEPARTMENT_START:
            return {
                ...state,
                loading_active_department : true,
                active_department_error : null,
                active_department : null,
            }
        case departmentTypes.ACTIVE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading_active_department : false,
                active_department : action.payload,

            }
        case departmentTypes.ACTIVE_DEPARTMENT_ERROR:
            return {
                ...state,
                loading_active_department : false,
                active_department_error : action.payload,
            }
        case departmentTypes.ALL_DEPARTMENTS_START:
            return {
                ...state,
                loading_departments : true,
                departments : null,
                departments_error : null,
            }
        case departmentTypes.ALL_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                loading_departments : false,
                departments : action.payload,

            }
        case departmentTypes.ALL_DEPARTMENTS_ERROR:
            return {
                ...state,
                loading_departments : false,
                departments_error : action.payload,
            }
        default:
            return state;
    }

}

export default departmentReducer;