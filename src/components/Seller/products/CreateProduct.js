import React from 'react'
import {useSpring,animated} from 'react-spring';
import Loader from 'react-loader-spinner';
import {connect} from 'react-router-dom';
import {Route,withRouter} from 'react-router-dom';

// importing subcomponents
import ChooseDepartment from './forms/ChooseDepartment';
import ChooseDemographics from './forms/ChooseDemographics';
import ChooseCategory from './forms/ChooseCategory';
import  ProductForm from './forms/ProductForm';

const CreateProduct = ({match}) => {
    const spring = useSpring({
        opacity : 1,
        transform : 'translateX(0)',
        from :{
            opacity : 0,
            transform : 'translateX(100vw)',
        }
    })
    return (
        <animated.div style={spring} className='create-product'>
            <h1 className='title'>Add New Product</h1>
            <Route exact path={`${match.path}`}>
                <ChooseDepartment />
            </Route>
            <Route exact path={`${match.path}/choose-demographic`}>
                <ChooseDemographics path={match.path} />
            </Route>
            <Route exact path={`${match.path}/choose-category`}>
                <ChooseCategory path={match.path} />
            </Route>
            <Route exact path={`${match.path}/product-create`}>
                <ProductForm path={match.path} />
            </Route>
        </animated.div>
    )
}

export default withRouter(CreateProduct);
