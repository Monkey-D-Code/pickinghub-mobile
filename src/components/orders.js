import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {Spring} from 'react-spring/renderprops';
import {withRouter} from 'react-router-dom';
import {NavLink,Route} from 'react-router-dom';

// importing actions
import {
    toggleMenu,
} from '../redux/website/website.actions';
import {
    getAllOrders,

} from '../redux/order/Order.actions';

// importing selectors
import {
    selectAllOrders,
    selectOrdersError,
    selectLoadingOrders,

} from '../redux/order/Order.selectors';
import {
    selectActiveUser,

} from '../redux/user/User.selectors';

// importing elements
import OrderDetails from '../elements/order_details';

class Orders extends Component {
    componentDidMount = ()=>{
        const {fetchOrders , user} = this.props;
        this.props.toggle();
        fetchOrders(user.id);
    }
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

    render = ()=>{
        const {from,to} = this.style;
        const {
            orders,
            error,
            loading,
            fetchOrders, 
            user,

            match,

        } = this.props;
        if(loading){
            return(
              
                <div className="loading-pickinghub" >
                    <h1>Pickinghub is it's Customers</h1>
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
        return (
            <Spring from={from} to={to} >
                {
                    spring=>(
                        <div className="orders" style={spring}>
                            <Route exact path={`${match.path}`}>  
                                <>
                                    <h1 className='title'>Orders <button className='refresh' onClick={()=>fetchOrders(user.id)}><i className="fa fa-refresh" aria-hidden="true"></i></button></h1>
                                    {
                                        error
                                        &&
                                        <div className="error">
                                            <h4>
                                                {JSON.stringify(error)}
                                            </h4>
                                        </div>
                                    }
                                    <div className="orders-list">
                                        {
                                            orders
                                            &&
                                            orders.map((order,i)=>(
                                                <Spring key={i} from={{opacity : 0}} to={{ opacity : 1}} config={{delay : (300 + i*200)}}>
                                                    {
                                                        spring =>(
                                                            <div className="single-order" style={spring}>
                                                                <h1 className="sum">
                                                                    <NavLink to={`${match.path}/${order.id}/details`}><i className="fa fa-inr" aria-hidden="true"></i> {order.sum.split('.')[0]}</NavLink>
                                                                </h1>
                                                                <div className="timestamp">
                                                                    <p>Placed On</p>
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
                                                        )
                                                    }
                                                </Spring>
                                            ))
                                        }
                                    </div>
                                </>
                            </Route>
                            <Route exact path={`${match.path}/:id/details`} >
                                <OrderDetails />
                            </Route>
                        </div>
                    )
                }
            </Spring>
        )
    }
}

const mapState = state =>({
    orders : selectAllOrders(state),
    user : selectActiveUser(state),
    error : selectOrdersError(state),
    loading : selectLoadingOrders(state),
})

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    fetchOrders : customer_id => dispatch(getAllOrders(customer_id)),
});

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    
    )(Orders)
);