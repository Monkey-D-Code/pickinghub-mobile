import React,{useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

// selectors
import {
    selectAllDepartments,
    selectAllDepartmentsError,
    selectLoadingDepartments,
} from '../../redux/department/Department.selectors';


// actions
import {
    getDepartments,
} from '../../redux/department/Department.actions';

const CateloguePromo = ({departments,error,loading,getDepartments}) => {

    const spring = useSpring({
        opacity  :1,
        from : { opacity : 0}
    })
    useEffect(()=>{
        getDepartments();
    },[])
    return (
        <animated.div style={spring} className='catelogue-promo'>
            <h2>
                Our Catalogue
                <button 
                    className='refresh' 
                    onClick={()=>getDepartments()}
                    disabled={loading}
                >
                    {
                        loading
                        ?   <Loader 
                                type = "Oval"
                                color = "#ffff"
                                height  = {15}
                                width = {15}
                                timeout = {20000}
                                className="loader"
                        />
                        : <><i className="fa fa-refresh" aria-hidden="true"></i></>
                    }
                </button>
            </h2>
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
                <div className="department-list">
                    {
                        departments.map((dept,i)=>(
                            <div className="one-dept" key={i}>
                                <img src={dept.cover_image} alt=""/>
                                <h4>
                                    <NavLink to={`/department/${dept.id}/details`}>{dept.name}</NavLink>
                                </h4>
                            </div>
                        ))
                    }
                </div>
            }
        </animated.div>
    )
}
const mapState = state =>({
    departments : selectAllDepartments(state),
    error : selectAllDepartmentsError(state),
    loading : selectLoadingDepartments(state),
});
const mapDispatch = dispatch =>({
    getDepartments : ()=>dispatch(getDepartments()),
});

export default connect(
    mapState,
    mapDispatch,
)(CateloguePromo);
