import React ,{useState} from 'react';
import {connect} from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {useSpring,animated} from 'react-spring';
// selectors
import {
    selectReviewError,
    selectAddingReview,

} from '../redux/product/Product.selectors';
import {
    selectActiveUser,
} from '../redux/user/User.selectors';

// actions
import {
    addCustomerReview,

} from '../redux/product/Product.actions';

const AddCustomerReview = ({product_id ,error,loading,addReview,user}) => {
    const [reviewData,setData] = useState({
        product : product_id,
        customer : user.id,
        rating : 0,
        comment : "",
    });
    const spring = useSpring({
        transform : 'translateX(0)',
        from : {transform : 'translateX(-100vw)'}
    })
    return (
        <animated.div className='add-customer-review' style={spring}>
            {
                error
                &&
                <div className="error">
                    <h4>
                        {JSON.stringify(error)}
                    </h4>
                </div>
            }
            <form>
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
                       rows="5"
                    ></textarea>
                    <button 
                        type="button"
                        disabled={loading}
                        onClick={()=>addReview(reviewData)}
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
                </div>
            </form>
        </animated.div>
    )
}

export default withRouter(
    connect(
        state =>({
            error : selectReviewError(state),
            loading : selectAddingReview(state),
            user : selectActiveUser(state),
        }),
        dispatch =>({
            addReview : data => dispatch(addCustomerReview(data)),
        })
    )(AddCustomerReview)
);
