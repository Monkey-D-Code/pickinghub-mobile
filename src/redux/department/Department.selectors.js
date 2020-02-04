import {createSelector} from 'reselect';

const selectDepartment = state => state.department;

export const selectAllDepartments = createSelector(
    [selectDepartment],
    department => department.departments,
)
export const selectAllDepartmentsError = createSelector(
    [selectDepartment],
    department => department.departments_error,
)
export const selectLoadingDepartments = createSelector(
    [selectDepartment],
    department => department.loading_departments,
)


export const selectActiveDepartment = createSelector(
    [selectDepartment],
    department => department.active_department,
)
export const selectActiveDepartmentError = createSelector(
    [selectDepartment],
    department => department.active_department_error,
)
export const selectLoadingActiveDepartment = createSelector(
    [selectDepartment],
    department => department.loading_active_department,
)


export const selectActiveDemographic = demographic_id =>createSelector(
    [selectDepartment],
    department =>{
        if(department.active_department){
            console.log(department.active_department)
            return department.active_department.demographics.find(i=>i.id===demographic_id);
        }
        return null;
    }
)