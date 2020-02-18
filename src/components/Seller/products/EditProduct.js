import React,{useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {NavLink,Route,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectActiveProduct,
    selectLoadingProduct,
    selectProductError,

} from '../../../redux/product/Product.selectors';
// importing actions
import {
    getProduct,

} from '../../../redux/product/Product.actions';


// importing subcomponents
import ProductForm from './forms/ProductForm';

const EditProduct = ({getProduct,product,error,loading,match}) => {
    const spring = useSpring({
        opacity : 1,
        
        from :{
            opacity : 0,
            
        }
    });
    useEffect(()=>{
        getProduct(match.params.id);
    },[match.params.id,])
    if(loading){
        return(
          
            <div className="loading-pickinghub" >
                <h1>Exclusive Products with us</h1>
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
        <animated.div style={spring} className='edit-product'>
            {
                error
                &&
                <div className="error">
                    <h4>
                        {JSON.stringify(error)}
                    </h4>
                    <button className='refresh' onClick={()=>getProduct(match.params.id)}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                </div>
            }
            {
                product
                &&
                <>
                    <ProductForm edit = {product} />
                </>
            }
        </animated.div>
    )
}
const mapState = state =>({
    product : selectActiveProduct(state),
    error : selectProductError(state),
    loading : selectLoadingProduct(state),
});
const mapDispatch = dispatch=>({
    getProduct : product_id => dispatch(getProduct(product_id)),
});

export default withRouter(
    connect(mapState,mapDispatch)(EditProduct),
);
