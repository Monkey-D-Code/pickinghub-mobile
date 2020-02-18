import React,{useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {NavLink,withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';


// importing selectors
import {
    selectProducts,
    selectProductsError,
    selectLoadingProducts,

} from '../../../redux/seller-products/SellerProducts.selectors';
import {
    selectActiveSeller,

} from '../../../redux/user/User.selectors';
// importing actions
import {
    getSellerproducts,
} from '../../../redux/seller-products/SellerProducts.actions';


const ProductCard = ({product,i}) =>{
    const spring = useSpring({
        opacity : 1,
        from  : {opacity : 0},
        delay : 200+(i*200),
    });
    return(
        <animated.div style={spring} className='product-card'>
            <NavLink to={`/products/${product.id}/edit`}>
                <img 
                    src={product.random_product_image} 
                    alt=""
                />
            
            <h3>{product.name}</h3>
            </NavLink>
        </animated.div>
    )
}

const SellerProducts = ({products,error,loading,seller,getProducts,match}) => {
    const spring = useSpring({
        scale : 1,
        from : {
            scale : 0.1,
        }
    });
    useEffect(()=>{
        if(seller.id) getProducts(seller.id)
    },[]);
    if(loading){
        return(
          <div className="loading-pickinghub" >
                <h1>Here are your stuff</h1>
                <Loader 
                    type = "Audio"
                    color = "#7A306C"
                    height  = {150}
                    width = {150}
                    timeout = {20000}
                    />
            </div>   
        )
      }
    return (
        <animated.div style={spring} className='seller-products'>
            <h1>My Products <NavLink to={`${match.path}/create`}><i className="fa fa-plus" aria-hidden="true"></i></NavLink></h1>
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
                    products
                    &&
                    products.map((product,i)=>(
                        <ProductCard product={product} key={i} i={i}/>
                    ))
                }
            </div>
        </animated.div>
    )
}

const mapState = state =>({
    products : selectProducts(state),
    error : selectProductsError(state),
    loading : selectLoadingProducts(state),
    seller : selectActiveSeller(state),
});
const mapDispatch = dispatch =>({
    getProducts : seller_id => dispatch(getSellerproducts(seller_id))
})

export default withRouter(
    connect(mapState,mapDispatch)(SellerProducts)
);
