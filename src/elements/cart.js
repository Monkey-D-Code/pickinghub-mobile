import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {connect} from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing actions
import {
    toggleMenu,
} from '../redux/website/website.actions';
import {
    removeSublet,
    makeNewOrder,

} from '../redux/cart/Cart.actions';


// importing selectors
import {
    selectProductCart,
    selectCartTotal,
    selectLatestOrder,
    selectOrderError,
    selectMakingOrder,

} from '../redux/cart/Cart.selectors';
import {
    selectActiveUser,
} from '../redux/user/User.selectors';


class Cart extends Component {
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
        this.props.toggle();
    }
    buyNow = ()=>{
        const {cart,user,newOrder} = this.props;
        const cartObj = [];
        cart.forEach((cart_sub)=>{
            const cartSubObj = {
                id : cart_sub.sublet.id,
                quantity : cart_sub.quantity,
            }
            cartObj.push(cartSubObj);
        })
        newOrder(user.id , cartObj);
    }
    render = ()=>{
        const {from,to} = this.style;
        const {cart,remove,total,error,loading} = this.props;
        return(
            <Spring from={from} to={to} >
                {
                    spring =>(
                        <div className="cart" style={spring}>
                            <h1>Cart</h1>
                            {
                                total > 0
                                &&
                                <h2 className="cart-total"><i className="fa fa-inr" aria-hidden="true"></i> {total}</h2>
                            }
                            {
                                total > 0
                                &&
                                <button className="buy-now" onClick={this.buyNow}>
                                    {
                                        loading
                                        ? <Loader 
                                            type = "Oval"
                                            color = "#ffff"
                                            height  = {20}
                                            width = {20}
                                            timeout = {20000}
                                            />
                                        :<>
                                            <i className="fa fa-credit-card-alt" aria-hidden="true"></i> Buy Now
                                         </>
                                    }
                                    
                                </button>
                            }
                            <div className="sublets">
                            {
                                cart
                                &&
                                cart.map((cart_sublet , i)=>(
                                    <div className="cart_sublet" key={i}>
                                        <img 
                                            src={cart_sublet.sublet.productimages[0].image_url}
                                            alt=""
                                        />
                                        <h3>
                                            <NavLink to={`/product/${cart_sublet.product.id}`}>{cart_sublet.product.name} </NavLink>
                                            <button onClick={()=>remove({sublet : cart_sublet.sublet})}>&times;</button>
                                        </h3>
                                        <div className="info">
                                            <p>{cart_sublet.sublet.value}</p>
                                            <p>x {cart_sublet.quantity}</p>
                                        </div>
                                        <p className="total"><i className="fa fa-inr" aria-hidden="true"></i> {cart_sublet.quantity * cart_sublet.sublet.selling_price}</p>
                                    </div>
                                ))
                            }
                            </div>
                            
                        </div>
                    )
                }
            </Spring>
        );
    }
}

const mapState = state =>({
    cart : selectProductCart(state),
    total : selectCartTotal(state),
    order : selectLatestOrder(state),
    error : selectOrderError(state),
    loading : selectMakingOrder(state),
    user : selectActiveUser(state),
})

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    remove : cart_sublet => dispatch(removeSublet(cart_sublet)),
    newOrder : (customer_id , cart)=>dispatch(makeNewOrder(customer_id,cart)),
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(Cart));