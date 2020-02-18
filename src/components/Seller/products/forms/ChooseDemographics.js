import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {useSpring,animated} from 'react-spring';
import {NavLink} from 'react-router-dom';

// importing selectors
import {
    selectDemographics,
    selectDemographicsError,
    selectLoadingDemographics,
    selectChoosenDemographic,

    selectChoosenDepartment,

} from '../../../../redux/seller-products/SellerProducts.selectors';


// importing actions
import {
    getdemographicsOfDept,
    chooseDemographic,

} from '../../../../redux/seller-products/SellerProducts.actions';

const DemographicCard = ({demographic,i,choosen,choose})=>{
    const spring = useSpring({
        opacity : 1,
        from : {
            opacity : 0,
        },
        delay  : 50 + (i*200),
    });
    return(
        <animated.div 
            style={spring} 
            className={choosen && choosen.id === demographic.id ? 'demographic-card active' : 'demographic-card'}
            onClick={()=>choose(demographic)}
        >
            <img 
                src={demographic.cover_image}  
                alt=""
            />
            <h3>{demographic.name}</h3>
        </animated.div>
    )
}

const ChooseDemographics = ({demographics,error,loading,choosen,department, getDemographics,choose,path}) => {
    const spring = useSpring({
        scale : 1,
        from : {
            scale : 0.1,
        }
    });
    useEffect(()=>{
        if(department) getDemographics(department.id);
    },[])
    if(loading){
        return(
          <div className="loading-pickinghub" >
                <h1>Things in {department ? department.name : 'Pickinghub'}</h1>
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
        <animated.div style={spring} className='choose-demographic'>
            <h2>
                {
                    choosen 
                    ? <>{choosen.name} <NavLink to={`${path}/choose-category`} className='next-btn'>Next &rarr;</NavLink></> 
                    : 'Select A Demographic'
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
                    demographics
                    &&
                    demographics.map((demo,i)=>(
                        <DemographicCard 
                            demographic={demo}
                            key={i}
                            i={i}
                            choosen={choosen}
                            choose={choose}
                        />
                    ))
                }
            </div>
        </animated.div>
    )
}

const mapState = state =>({
    demographics : selectDemographics(state),
    error : selectDemographicsError(state),
    loading : selectLoadingDemographics(state),
    choosen : selectChoosenDemographic(state),
    department : selectChoosenDepartment(state),
});
const mapDispatch = dispatch =>({
    getDemographics : dept_id =>dispatch(getdemographicsOfDept(dept_id)),
    choose : category =>dispatch(chooseDemographic(category)),
})

export default connect(mapState,mapDispatch)(ChooseDemographics);
