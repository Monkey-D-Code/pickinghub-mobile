import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {Spring} from 'react-spring/renderprops';
// importing selectors
import {
    selectAllDepartments,
    selectAllDepartmentsError,
    selectLoadingDepartments,

} from '../../redux/department/Department.selectors';

// importing actions
import {
    getDepartments,
} from '../../redux/department/Department.actions';
import { NavLink } from 'react-router-dom';



class DepartmentCard extends Component {
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(-100vw)',

        },
        to : {
            opacity : 1,
            transform : 'translateX(0)',
            
        }
    }

    render =()=>{
        const {department} = this.props;
        const {from,to} = this.style;
        return (
            <Spring from={from} to={to} >
                {
                    spring =>(
                       department
                        &&
                        <div className="single-department" style={spring}>
                            <img 
                                src={department.cover_image} 
                                alt={`${department.name}`}
                            />
                            <h3>
                                <NavLink to={`/department/${department.id}/details`}>{department.name}</NavLink>
                            </h3>
                        </div>
                     )
                }
            </Spring>
        );
    }
}


class AllDepartments extends Component{
    componentDidMount = () => {
        this.props.getDepartments();
    }
    render = ()=>{
        const {
            departments,
            error,
            loading,
        } = this.props;

        if(loading){
            return(
              <div className="loading-pickinghub">
                <h1>We keep it all !</h1>
                <Loader 
                  type = "Oval"
                  color = "#101935"
                  height  = {150}
                  width = {150}
                  timeout = {20000}
                />
              </div>
            )
          }
        return (
            <div className="all-departments">
                <h1>Our Catelogue</h1>
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
                    departments
                    &&
                    <div className="depts">
                       {departments.map((dept,i)=>(
                            <DepartmentCard key={i} department={dept} />
                        ))}
                    </div>
                }
            </div>
        );
    }
}

const mapState = state =>({
    departments : selectAllDepartments(state),
    error  :selectAllDepartmentsError(state),
    loading : selectLoadingDepartments(state),
});
const mapDispatch = dispatch =>({
    
    getDepartments : ()=>dispatch(getDepartments()),
})

export default connect(
    mapState,
    mapDispatch,
)(AllDepartments);