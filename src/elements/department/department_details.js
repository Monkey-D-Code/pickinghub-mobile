import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


// importing selctors
import {
    selectActiveDepartment,
    selectActiveDepartmentError,
    selectLoadingActiveDepartment,

} from '../../redux/department/Department.selectors';

// importing actions
import {
    getActiveDepartment,
} from '../../redux/department/Department.actions';


// importing elements
import Demographics from './demographics';

class DepartmentDetails extends Component{
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(100vw)',

        },
        to : {
            opacity : 1,
            
            transform : 'translateX(0)',
        }
    }
    componentDidMount = ()=>{
        const department_id = this.props.match.params.id;
        this.props.getDepartment(department_id);
    }
    componentDidUpdate = oldProps => {
        const old_id = oldProps.match.params.id;
        const new_id = this.props.match.params.id;
        if(new_id !== old_id) this.props.getDepartment(new_id); 
    }
    render = ()=>{
        const {from,to} = this.style;
        const {
            department,
            error,
            loading,

        } = this.props;
        if(loading){
            return(
              <div className="loading-pickinghub">
                <h1>Shop with benifits</h1>
                <Loader 
                  type = "Oval"
                  color = "#101935"
                  height  = {150}
                  width = {150}
                  timeout = {10000}
                />
              </div>
            )
          }
        return (
            <Spring from={from} to={to}>
                {
                    spring => (
                        <div className="department-details" style={spring}>
                            {
                                error
                                &&
                                <div className="error">
                                    <h4>
                                        {JSON.stringify(error)}
                                    </h4>
                                </div>
                            }
                            {
                                department
                                &&
                                <div className="info">
                                    <img 
                                        src={department.cover_image} 
                                        alt={`${department.name}`}
                                    />
                                    <h1>
                                        {department.name}
                                    </h1>
                                    <p>
                                        {department.desc}
                                    </p>
                                    <Demographics demographics={department.demographics} />
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        )
    }
}

const mapState = state => ({
    department : selectActiveDepartment(state),
    error : selectActiveDepartmentError(state),
    loading : selectLoadingActiveDepartment(state),
});
const mapDispatch = dispatch =>({
    getDepartment : department_id => dispatch(getActiveDepartment(department_id)),
})

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    
    )(DepartmentDetails)
);