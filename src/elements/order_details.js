import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';

// importing actions
import {
    getOrderDetails,

} from '../redux/order/Order.actions';

// importing selectors
import {
    selectOrderDetails,
    selectDetailsError,
    selectLoadingDetails,

} from '../redux/order/Order.selectors';

class OrderDetails extends Component{
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(100vw)'

        },
        to : {
            opacity : 1,
            transform : 'translateX(0)'
        }
    }
    componentDidMount = ()=>{
        const {getOrder , match : {params : {id,}}} = this.props;
        getOrder(id);
    }
    render=()=>{
        const {from,to} = this.style;
        const {
            order,
            error,
            loading,
            match : {params : {id,}},

            getOrder,


        } = this.props;
        if(loading){
            return(
              
                <div className="loading-pickinghub" >
                    <h1>Your support makes us possible</h1>
                    <Loader 
                        type = "Oval"
                        color = "#119822"
                        height  = {150}
                        width = {150}
                        timeout = {20000}
                        />
                </div>
                
                
            )
        }
        return(
            <Spring from = {from} to = {to}>
                {
                    spring =>(
                        <div className="order-details" style={spring}>
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
                                order
                                &&
                                <div className="order-info">
                                    <div className="orders">
                                        {
                                            order.orders.map((o,i)=>(
                                                <Spring 
                                                    key={i} 
                                                    from ={{opacity :0}} 
                                                    to={{opacity:1}} 
                                                    config={{delay : (200 + i*500)}}
                                                >
                                                    {
                                                        spring =>(
                                                            <div className="single-order" style={spring}>
                                                                <img 
                                                                    src={o.sublet.productimages[0].image_url} 
                                                                    alt=""
                                                                />
                                                                <div className="info">
                                                                    
                                                                    <h4>
                                                                        <NavLink to={`/product/${o.sublet.product.id}`}>{o.sublet.product.name}</NavLink>
                                                                    </h4>
                                                                    <p>{o.sublet.value} &times;{o.quantity}</p>
                                                                    
                                                                </div>
                                                                <h4 className='total'><i className="fa fa-inr" aria-hidden="true"></i> {o.total.split('.')[0]}</h4>
                                                            </div>
                                                        )
                                                    }
                                                </Spring>
                                            ))
                                        }
                                    </div>
                                    <h1><i className="fa fa-inr" aria-hidden="true"></i> {order.sum.split('.')[0]} <button className='refresh' onClick={()=>getOrder(id)}><i className="fa fa-refresh" aria-hidden="true"></i></button></h1>
                                    <div className="placed-on">
                                        <p>Placed on</p>
                                        <p><i className="fa fa-calendar" aria-hidden="true"></i> {new Date(order.date).toDateString()}</p>
                                        <p><i className="fa fa-clock-o" aria-hidden="true"></i> {order.time.split('.')[0]}</p>
                                    </div>
                                    <div className="status">
                                        {
                                            order.confirmed
                                            ? <p className="true"><i className="fa fa-check-circle" aria-hidden="true"></i> Confirmed</p>
                                            : <p className="false"><i className="fa fa-times-circle" aria-hidden="true"></i> Not Confirmed</p>
                                        }
                                        {
                                            order.dispatched
                                            ? <p className="true"><i className="fa fa-check-circle" aria-hidden="true"></i> Dispatched</p>
                                            : <p className="false"><i className="fa fa-times-circle" aria-hidden="true"></i> Not Dispatched</p>
                                        }
                                        {
                                            order.delivered
                                            ? <p className="true"><i className="fa fa-check-circle" aria-hidden="true"></i> Delivered</p>
                                            : <p className="false"><i className="fa fa-times-circle" aria-hidden="true"></i> Not Delivered</p>
                                        }
                                    </div>
                                    {
                                        order.estimated_date && order.estimated_time
                                        ? <div className="estimation">
                                            <p>At your door by</p>
                                            <p><i className="fa fa-calendar" aria-hidden="true"></i> {new Date(order.estimated_date).toDateString()}</p>
                                            <p><i className="fa fa-clock-o" aria-hidden="true"></i> {order.estimated_time.split('.')[0]}</p>
                                        </div>
                                        : <h4 className="not-estimated">
                                            Delivery date & time will be set when order is confirmed
                                        </h4>

                                    }
                                    
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        )
    }
}

const mapState = state =>({
    order  :selectOrderDetails(state),
    error : selectDetailsError(state),
    loading : selectLoadingDetails(state),
});
const mapDispatch = dispatch =>({
    getOrder : order_id => dispatch(getOrderDetails(order_id)),
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(OrderDetails));