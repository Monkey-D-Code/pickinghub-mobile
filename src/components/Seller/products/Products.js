import React,{useEffect} from 'react';
import {Route,withRouter} from 'react-router-dom';
import {useSpring,animated} from 'react-spring';
import {connect} from 'react-redux';

// importing actions
import {
    toggleMenu,
} from '../../../redux/website/website.actions';



// importing subpages
import SellerProducts from './SellerProducts';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';


const Products = ({toggle,match}) => {
    const spring = useSpring({
        opacity : 1,
        transform : 'translateY(0)',
        from : {
            opacity : 0,
            transform : 'translateY(100vh)',
        }
    });
    useEffect(()=>{
        toggle();
    },[])
    return (
        <animated.div style={spring} className='sell-products'>
            <Route exact path={`${match.path}`}>
                <SellerProducts />
            </Route>
            <Route path={`${match.path}/create`}>
                <CreateProduct />
            </Route>
            <Route path={`${match.path}/:id/edit`}>
                <EditProduct />
            </Route>
            
        </animated.div >
    )
}


const mapState = state =>({})
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
})

export default withRouter(connect(
    mapState,
    mapDispatch,
)(Products));
