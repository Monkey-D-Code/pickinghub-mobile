import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';
import {withRouter,NavLink,Route} from 'react-router-dom';
// importing selectors
import {
    selectActiveProduct,
    selectProductError,
    selectLoadingProduct,
    selectSelectedSublet,
    selectSelectedImage,

} from '../redux/product/Product.selectors';
import {
    selectIsAuth,
    selectActiveUser,
    selectActiveSeller,

} from '../redux/user/User.selectors';
import {
    selectSubletquantity,

} from '../redux/cart/Cart.selectors';

// importing actions
import {
    getProduct,
    chooseSublet,
    chooseImage,

} from '../redux/product/Product.actions';

import {
    addSublet,
    updateSublet,
    removeSublet,

} from '../redux/cart/Cart.actions';


// importing components
import SuggestedProducts from '../components/SuggestedProducts';
import CustomerReview from '../components/CustomerReview';
import AddCustomerReview from '../elements/AddCustomerReview';
import DiscountOffers from '../elements/DiscountOffers';

class ProductDetails extends Component {
    style = {
        from : {
            opacity : 0,
            transform : 'translateY(100vh)',

        },
        to : {
            opacity : 1,
            transform : 'translateY(0)',
        }
    }
    componentDidMount = ()=>{
        const {match : {params : {id,}},getProduct,chooseImage,chooseSublet,product} = this.props;
        getProduct(id);
        
    }
    componentDidUpdate = oldProps =>{
        const old_id = oldProps.match.params.id;
        const new_id = this.props.match.params.id;
        
        if(old_id !== new_id) {
            this.props.getProduct(new_id);
            
        }
    }

    plus = ()=>{
        const {activeSublet,addSublet,updateSublet,quantity,product} = this.props;
        if(quantity){
            updateSublet({
                sublet : activeSublet,
                quantity : quantity + 1,
                product : product,
            })
        }else{
            addSublet({
                sublet : activeSublet,
                quantity : 1,
                product : product,
            });
        }
        
    }
    minus = ()=>{
        const {activeSublet , updateSublet ,quantity,removeSublet , product} = this.props;
        if(quantity > 1){
            updateSublet({
                sublet : activeSublet,
                quantity : quantity - 1,
                product : product,
            })
        }else{
            removeSublet({
                sublet : activeSublet,
                quantity : 0,
            })
        }
    }   
    
    render = ()=>{
        const {from,to} = this.style;
        const {
            product,
            loading,
            error,
            activeSublet,
            activeImage,

            chooseSublet,
            chooseImage,

            isAuth,
            user,
            seller,

            quantity,

            match : {params : {id,},},
            getProduct,

           
            

        } = this.props;
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
        return(
            <Spring from={from} to={to}>
                {
                    spring =>(
                        <div className="product-details" style={spring}>
                            {
                                error
                                &&
                                <div className="error">
                                    <h4>
                                        {JSON.stringify(error)}
                                    </h4>
                                    <button className='refresh' onClick={()=>getProduct(id)}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                                    
                                </div>
                            }
                            {
                                product
                                &&
                                <div className="product">
                                    {
                                        activeSublet
                                        &&
                                        <div className="image-box">
                                            {
                                                activeImage
                                                &&
                                                <div className="big-image">
                                                    <img 
                                                        src={activeImage.image_url} 
                                                        alt=""
                                                        className={
                                                            activeSublet.out_of_stock
                                                            ? "blur"
                                                            : ""
                                                        }
                                                    />
                                                    {
                                                        activeSublet.out_of_stock
                                                        &&
                                                        <div className="out-of-stock-img">
                                                            <h4>Out Of Stock</h4>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                            {
                                                activeSublet.productimages.length > 0
                                                &&
                                                <div className="image-set">

                                                    {
                                                        activeSublet.productimages.map((image, i )=>(
                                                            <div className="image" key={i} onClick={()=>chooseImage(image)}>
                                                                <img 
                                                                    src={image.image_url} 
                                                                    alt=""
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="info">
                                        <h1>
                                            {product.name} <button className='refresh' onClick={()=>getProduct(id)}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                                        </h1>
                                        {
                                            user
                                            &&
                                            <NavLink className="add-review-link" to={`/product/${product.id}/add-review`}><i className="fa fa-commenting" aria-hidden="true"></i></NavLink>
                                        }
                                        <p>
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="variants">
                                        {
                                            product.variants.length > 0
                                            ?
                                            product.variants.map((variant , i)=>(
                                                <div className="variant" key={i}>
                                                    <h4>Choose by : {variant.label}</h4>
                                                    <div className="sublets">
                                                        {
                                                            variant.sublets.map((sublet,j)=>(
                                                                <div 
                                                                    key={j} 
                                                                    onClick={()=>chooseSublet(sublet)}
                                                                    className={
                                                                        sublet.out_of_stock
                                                                        ? "single-sublet no-stock"
                                                                        : "single-sublet"
                                                                    }    
                                                                >
                                                                    {
                                                                        sublet.color_hex
                                                                        &&
                                                                        <div className="color" style={{backgroundColor : `#${sublet.color_hex}`}}></div>
                                                                    }
                                                                    <h5 >
                                                                        {sublet.value}
                                                                    </h5>
                                                                    
                                                                    <div className="price">
                                                                        <p className="market_price"><i className="fa fa-inr" aria-hidden="true"></i> {sublet.max_retail_price.split('.')[0]}</p>
                                                                        <p className="selling_price"><i className="fa fa-inr" aria-hidden="true"></i> {sublet.selling_price.split('.')[0]}</p>
                                                                    </div>
                                                                    {   
                                                                        
                                                                        activeSublet
                                                                        &&
                                                                        activeSublet.id === sublet.id
                                                                        && 
                                                                        
                                                                        <div className="choosen">
                                                                            {
                                                                                quantity > 0
                                                                                ? quantity
                                                                                : <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                                                            }
                                                                        </div>
                                                                        
                                                                    }
                                                                    
                                                                </div>
                                                            ))
                                                        }
                                                        
                                                    </div>
                                                </div>
                                            ))
                                            : <div className="warning">
                                                    <h4>No variants found</h4>
                                                </div>
                                        }
                                    </div>
                                    {
                                        activeSublet
                                        &&
                                        activeSublet.out_of_stock
                                        ?
                                        <h4 className="out-of-stock">
                                            Out Of Stock
                                        </h4>
                                        : 
                                        activeSublet
                                        &&
                                        activeImage
                                        &&
                                        user
                                        &&
                                        <div className="cart-controls">
                                            <button className="plus" onClick={this.plus}>{quantity ? <i className="fa fa-plus" aria-hidden="true"></i> : 'Add To Cart'}</button>
                                            <p>
                                                {quantity > 0 && quantity}
                                            </p>
                                            {
                                                quantity > 0
                                                &&
                                                <button className="minus" onClick={this.minus}><i className="fa fa-minus" aria-hidden="true"></i></button>
                                            }
                                            
                                        </div>
                                        
                                    }
                                    {
                                        user
                                        &&
                                        quantity > 0
                                        &&
                                        <div className="go-to-cart">
                                            <NavLink to='/cart'>Buy Now &rarr;</NavLink>
                                        </div>
                                    }
                                    {
                                        !isAuth
                                        &&
                                        
                                        <div className="not-loggedin-msg">
                                            <p>You are not logged in ! Login or Join to place an order.</p>
                                            <NavLink to='/login'>Login</NavLink>
                                            <NavLink to='/register'>Register</NavLink>
                                        </div>
                                        
                                        
                                    }
                                    {
                                        activeSublet
                                        &&
                                        activeImage
                                        &&
                                        user
                                        &&
                                        quantity > 0
                                        &&
                                        <div className="total">
                                            <h4><i className="fa fa-inr" aria-hidden="true"></i> {quantity * activeSublet.selling_price}</h4>
                                        </div>
                                    }
                                    <div className="informations">
                                        {
                                            product.informations.length > 0
                                            ?
                                            product.informations.map((inf, i)=>(
                                                <div className="information" key={i}>
                                                    <h4>
                                                        {inf.label}
                                                    </h4>
                                                    <p>
                                                        {inf.details}
                                                    </p>
                                                </div>
                                            ))
                                            : <div className="warning">
                                                <h4>No Information Added</h4>
                                            </div>
                                        }
                                    </div>
                                    
                                    <SuggestedProducts CategoryId = {product.category.id} />
                                    <CustomerReview />
                                    {
                                        user
                                        &&
                                        <>
                                            
                                            <Route path={`/product/${product.id}/add-review`}>
                                                <AddCustomerReview product_id={product.id} />
                                            </Route>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        );
    }
}

const mapState = state =>({
    product : selectActiveProduct(state),
    loading : selectLoadingProduct(state),
    error : selectProductError(state),
    activeSublet : selectSelectedSublet(state),
    activeImage : selectSelectedImage(state),
    isAuth : selectIsAuth(state),
    user : selectActiveUser(state),
    seller : selectActiveSeller(state),
    quantity : selectSubletquantity(state),
    
})

const mapDispatch = dispatch =>({
    getProduct  : product_id => dispatch(getProduct(product_id)),
    chooseSublet : sublet => dispatch(chooseSublet(sublet)),
    chooseImage : image => dispatch(chooseImage(image)),
    addSublet : cart_sublet =>dispatch(addSublet(cart_sublet)),
    updateSublet : cart_sublet =>dispatch(updateSublet(cart_sublet)),
    removeSublet : cart_sublet =>dispatch(removeSublet(cart_sublet)),
})

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    
    )(ProductDetails)
);