import React,{useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {withRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux';

// importing nested components
import SellerLogin from './SellerLogin';
import SellerRegister from './SellerRegister';

// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';

// importing selectors
import {
     
    selectNavigationSwitch,
} from '../../redux/website/Website.selectors';

const Seller = ({match,toggle,navSwitch}) => {
    const spring = useSpring({
        opacity : 1,
        transform  : 'translateY(0)',
        from :{
            opacity : 0,
            transform  : 'translateY(100vh)',
        }
        
    });
    useEffect(()=>{
        if(navSwitch) toggle();
    },[])
    return (
        <animated.div style={spring} className='seller'>
            <Route exact path={`${match.path}`}>
                <SellerRegister />
            </Route>
            <Route exact path={`${match.path}/login`}>
                <SellerLogin parentMatch={match} />
            </Route>
        </animated.div>
    )
}

const mapState = state =>({
    navSwitch : selectNavigationSwitch(state),
})
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    
})

export default withRouter(connect(
    mapState,
    mapDispatch,
)(Seller));
