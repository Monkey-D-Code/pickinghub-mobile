import React from 'react';
import {connect} from 'react-redux';



// selectors
import {
    selectDiscountOffers,
    selectActiveOffer,

} from '../redux/product/Product.selectors';

// actions
import {
    setOffer,
} from '../redux/product/Product.actions';

const DiscountOffers = ({offers,active,activate}) => {
    return (
        <div className="discount-offers">
            <h3>Discount Offers</h3>
            {
                offers
                ?  <div className="offer-list">
                        {
                            offers.map((offer,i)=>(
                                <div 
                                    className={active && active.id === offer.id ? "single-offer active" : "single-offer"} 
                                    key={i}
                                    onClick={()=>activate(offer)}
                                >
                                    <h4><i className="fa fa-tag" aria-hidden="true"></i> {offer.label}</h4>
                                    <p>{offer.details}</p>
                                    <p className="discount">{offer.discount}</p>
                                </div>
                            ))
                        }
                   </div>
                : <div className="no-offers">
                    <h4>No Offer Available For this product</h4>
                  </div>
            }
        </div>
    )
}

export default connect(
    state =>({
        offers : selectDiscountOffers(state),
        active : selectActiveOffer(state),
    }),
    dispatch=>({
        activate : offer => dispatch(setOffer(offer)),
    })
)(DiscountOffers);
