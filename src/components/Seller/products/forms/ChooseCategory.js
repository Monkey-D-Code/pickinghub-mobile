import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {useSpring,animated} from 'react-spring';
import {NavLink} from 'react-router-dom';
// importing selectors
import {
    selectCategories,
    selectChoosenCategory,
    selectCategoriesError,
    selectLoadingCategories,
    selectChoosenDemographic,

} from '../../../../redux/seller-products/SellerProducts.selectors';


// importing actions
import {
    getCategoriesOfDept,
    chooseCategory,
} from '../../../../redux/seller-products/SellerProducts.actions';

const CategoryCard = ({category,i,choosen,choose})=>{
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
            className={choosen && choosen.id === category.id ? 'category-card active' : 'category-card'}
            onClick={()=>choose(category)}
        >
            <img 
                src={category.cover_image}  
                alt=""
            />
            <h3>{category.name}</h3>
        </animated.div>
    )
}

const ChooseCategory = ({categories,error,loading,choosen,demographic,getCategories,choose,path}) => {
    const spring = useSpring({
        scale : 1,
        from : {
            scale : 0.1,
        }
    });
    useEffect(()=>{
        if(demographic) getCategories(demographic.id);
    },[])
    if(loading){
        return(
          <div className="loading-pickinghub" >
                <h1>Things in {demographic ? demographic.name : 'Pickinghub'}</h1>
                <Loader 
                    type = "Oval"
                    color = "#7A306C"
                    height  = {150}
                    width = {150}
                    timeout = {20000}
                    />
            </div>   
        )
      }
    return (
        <animated.div style={spring} className='choose-category'>
            <h2>
                {
                    choosen 
                    ? <>{choosen.name} <NavLink to={`${path}/product-create`} className='next-btn'>Next &rarr;</NavLink></> 
                    : 'Select A Category'
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
                    categories
                    &&
                    categories.map((cat,i)=>(
                        <CategoryCard 
                            category={cat}
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
    categories : selectCategories(state),
    error : selectCategoriesError(state),
    loading : selectLoadingCategories(state),
    choosen : selectChoosenCategory(state),
    demographic : selectChoosenDemographic(state),
});
const mapDispatch = dispatch =>({
    getCategories : dept_id =>dispatch(getCategoriesOfDept(dept_id)),
    choose : category =>dispatch(chooseCategory(category)),
})

export default connect(mapState,mapDispatch)(ChooseCategory);
