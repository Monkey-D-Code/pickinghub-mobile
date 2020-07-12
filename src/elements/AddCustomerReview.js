import React ,{useState} from 'react';
import {connect} from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {useSpring,animated} from 'react-spring';
// selectors
import {
    selectReviewError,
    selectAddingReview,
    selectLatestReview,

} from '../redux/product/Product.selectors';
import {
    selectActiveUser,
} from '../redux/user/User.selectors';

// actions
import {
    addCustomerReview,

} from '../redux/product/Product.actions';

const AddCustomerReview = ({product_id ,error,loading,addReview,user,latest}) => {
    const [reviewData,setData] = useState({
        product : product_id,
        customer : user.id,
        rating : "",
        comment : "",
    });
    const spring = useSpring({
        transform : 'opacity : 1',
        from : {transform : 'opacity : 0'}
    })
    return (
        <animated.div className='add-customer-review' style={spring}>

            {
                error
                &&
                <div className="error">
                    <h4>
                        Error adding review !
                    </h4>
                </div>
            }
            <div className="review-form">
                <div className="form-group">
                    <h3>Add a Review <NavLink to={`/product/${product_id}`}>&times;</NavLink></h3>
                    <input 
                        type="number"
                        min={0}
                        max={10} 
                        className="input"
                        value = {reviewData.rating}
                        onChange = {
                            e => setData({
                                ...reviewData,
                                rating : e.target.value,
                            })
                        }
                        placeholder="Rate from 1 to 10"
                    />
                    <textarea
                       className="input"
                       value={reviewData.comment}
                       onChange={
                           e => setData({
                               ...reviewData,
                               comment : e.target.value,
                           })
                       }
                       placeholder = "Write about this product"
                       rows="5"
                    ></textarea>
                    {
                        latest
                        &&
                        <h5 className="latest">
                            Review Added Successfully.
                        </h5>
                    }
                    {
                        reviewData.rating && reviewData.comment
                        &&
                        <button 
                            type="button"
                            disabled={loading}
                            onClick={(e)=>{
                                e.preventDefault();
                                addReview(reviewData);
                            }}
                        >
                            {
                                loading
                                ? <Loader 
                                    type = "Oval"
                                    color = "#ffff"
                                    height  = {20}
                                    width = {20}
                                    timeout = {20000}
                                />
                                : <><i className="fa fa-plus" aria-hidden="true"></i> Review</>
                            }
                            
                        </button>
                    }
                </div>
            </div>
        </animated.div>
    )
}

export default withRouter(
    connect(
        state =>({
            latest : selectLatestReview(state),
            error : selectReviewError(state),
            loading : selectAddingReview(state),
            user : selectActiveUser(state),
        }),
        dispatch =>({
            addReview : data => dispatch(addCustomerReview(data)),
        })
    )(AddCustomerReview)
);
