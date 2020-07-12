import React,{useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {NavLink} from 'react-router-dom';

// importing selectors
import {
    selectDeals,
    selectDealsError,
    selectLoadingDeals,

} from '../../redux/special-deals/SpecialDeals.selectors';  

// impoting actions
import {
    getSpecialDeals,
} from '../../redux/special-deals/SpecialDeals.actions';



const SpecialDeals = ({deals,error,loading,getDeals}) => {
    const spring = useSpring({
        opacity : 1,
        
        from : {opacity : 0}
        
    });
    useEffect(()=>{
        getDeals();
    },[])
    return (
        <animated.div style={spring} className='special-deals'>
            <h2>
                Our Offers
                <button 
                    className='refresh' 
                    onClick={()=>getDeals()}
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
                deals
                &&
                <div className="all-deals">

                    {
                        deals.map((deal,i)=>(
                            <div className="single-deal" key={i}>
                                <img 
                                    src={deal.cover_image} 
                                    alt=""
                                    className="deal-img"
                                />
                                <h4>
                                    {deal.title}
                                </h4>
                                <div className="desc">
                                    <p>
                                        {deal.desc}
                                    </p>
                                </div>
                                <div className="discount">
                                    <p>
                                        Upto {Math.ceil(deal.discount_percentage)} % OFF
                                    </p>
                                </div>
                                <div className="info">
                                    
                                    {
                                        deal.has_expired
                                        ? <p className="active-deal">
                                            <i className="fa fa-check" aria-hidden="true"></i> Active
                                         </p>
                                        : <p className="expired-deal">
                                            <i className="fa fa-times" aria-hidden="true"></i> Expired
                                         </p>
                                    }
                                    
                                </div>
                                <div className="deal-products">
                                    {
                                        deal.products
                                        ? deal.products.map((product,j)=>(
                                            <div className="single-deal-product" key={j}>
                                                <img 
                                                    src={product.random_product_image} 
                                                    alt=""
                                                    className="product-img"
                                                />
                                                <h5>
                                                    <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
                                                </h5>
                                            </div>
                                        ))
                                        : <div className="no-products">
                                                <h4>No Products in this deal.</h4>
                                          </div>
                                    }
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
            }
        </animated.div>
    )
}

const mapState = state =>({
    deals : selectDeals(state),
    error : selectDealsError(state),
    loading : selectLoadingDeals(state),
});
const mapDispatch = dispatch =>({
    getDeals : ()=>dispatch(getSpecialDeals()),
})

export default connect(
    mapState,
    mapDispatch,
)(SpecialDeals);
