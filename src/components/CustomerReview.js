import React from 'react';
import {connect} from 'react-redux';

// selectors
import {
    selectCustomerReviews,
} from '../redux/product/Product.selectors';


const CustomerReview = ({reviews}) => {
    return (
        <div className="customer-review">
            <h1>What Customers Say</h1>
            {
                reviews
                ? <div className="list">
                    {
                        reviews.map((review,i)=>(
                            <div className="single-review" key={i}>
                                <div className="customer">
                                    <img 
                                        src={`https://eu.ui-avatars.com/api/?name=${review.customer.user.first_name}+${review.customer.user.last_name}&size=400x400`}
                                        alt=""
                                    />
                                    <h4>{review.customer.user.first_name} {review.customer.user.last_name}</h4>
                                </div>
                                <div className="comment">
                                    <p>{review.comment}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                : <div className="no-review">
                    <h4>No Review Yet</h4>
                </div>
            }
        </div>
    )
}

export default connect(
    state =>({
        reviews : selectCustomerReviews(state),
    })
)(CustomerReview);
