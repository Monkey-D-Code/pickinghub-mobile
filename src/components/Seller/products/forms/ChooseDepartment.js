import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {useSpring,animated} from 'react-spring';
import {NavLink,withRouter} from 'react-router-dom';

// importing selectors
import {
    selectAllDepartments,
    selectAllDepartmentsError,
    selectLoadingDepartments,
} from '../../../../redux/department/Department.selectors';
import {
    selectChoosenDepartment,

} from '../../../../redux/seller-products/SellerProducts.selectors';

// importing actions
import {
    getDepartments,
} from '../../../../redux/department/Department.actions';
import {
    chooseDepartment,
} from '../../../../redux/seller-products/SellerProducts.actions';


const DepartmentCard = ({department,i,choosen,choose})=>{
    const spring = useSpring({
        opacity : 1,
        from : {
            opacity : 0,
        },
        delay  : 100 + (i*200),
    });
    return(
        <animated.div 
            style={spring} 
            className={choosen && choosen.id === department.id ? 'department-card active' : 'department-card'}
            onClick={()=>choose(department)}
        >
            <img 
                src={department.cover_image}  
                alt=""
            />
            <h3>{department.name}</h3>
        </animated.div>
    )
}

const ChooseDepartment = ({departments,error,loading,getDepts,choose,choosen,match}) => {
    const spring = useSpring({
        scale : 1,
        from : {
            scale : 0.1,
        }
    });
    useEffect(()=>{
        getDepts();
    },[]);
    if(loading){
        return(
          <div className="loading-pickinghub" >
                <h1>Pick your thing</h1>
                <Loader 
                    type = "Puff"
                    color = "#7A306C"
                    height  = {150}
                    width = {150}
                    timeout = {20000}
                    />
            </div>   
        )
      }
    return (
        <animated.div style={spring} className='choose-department'>
            <h2>
                {
                    choosen 
                    ? <>{choosen.name} <NavLink to={`${match.path}/choose-demographic`} className='next-btn'>Next &rarr;</NavLink></> 
                    : 'Select A Department'
                } 
                
            </h2>
            {
                error
                &&
                error.response
                &&
                <div className="error">
                    <h4>
                        {JSON.stringify(error.response.data)}
                    </h4>
                </div>

            }
            <div className="list">
                {
                    departments
                    &&
                    departments.map((dept,i)=>(
                        <DepartmentCard 
                            department={dept} 
                            key={i} 
                            i={i} 
                            choose={choose}
                            choosen={choosen}
                        />
                    ))
                }
                
                
            </div>
            
        </animated.div>
    )
}

const mapState = state =>({
    departments : selectAllDepartments(state),
    error : selectAllDepartmentsError(state),
    loading : selectLoadingDepartments(state),
    choosen : selectChoosenDepartment(state),

});
const mapDispatch = dispatch =>({
    getDepts : ()=>dispatch(getDepartments()),
    choose  :dept =>dispatch(chooseDepartment(dept)),
})

export default withRouter(
    connect(mapState,mapDispatch)(ChooseDepartment)
);
