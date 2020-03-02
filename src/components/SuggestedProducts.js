import React,{useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectSuggestedProducts,
    selectProductsError,
    selectLoadingProducts,

} from '../redux/product/Product.selectors';

// importing action
import {
    getSuggestedProducts,
} from '../redux/product/Product.actions';

const SuggestedProducts = ({CategoryId,products,error,loading,getProducts}) => {
    const spring = useSpring({
        opacity : 1,
        from : {
            opacity : 0,
        }
    });
    useEffect(()=>{
        getProducts(CategoryId);
    },[CategoryId]);
    
    return (
        <animated.div style={spring} className='suggested-products'>
            <h2>
                People also buy 
                <button 
                    className='refresh' 
                    onClick={()=>getProducts(CategoryId)}
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
                products
                &&
                <div className="products-list">
                    {
                        products.map((product,i)=>(
                            <div className="one-product" key={i}>
                                <img 
                                    src={product.random_product_image}
                                    alt=""
                                />
                                <h3>
                                    <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
                                </h3>
                            </div>
                        ))
                    }
                </div>
            }
        </animated.div>
    )
}

const mapState = (state)=>({
    products : selectSuggestedProducts(state),
    error : selectProductsError(state),
    loading : selectLoadingProducts(state),
});
const mapDispatch = (dispatch)=>({
    getProducts : (CategoryId)=>dispatch(getSuggestedProducts(CategoryId)),
})

export default connect(
    mapState,
    mapDispatch,

)(SuggestedProducts);
