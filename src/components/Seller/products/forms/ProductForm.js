import React,{useState,useEffect} from 'react';
import {useSpring,animated} from 'react-spring';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectCreatingProduct,
    selectLatestProduct,
    
    selectProductError,
} from '../../../../redux/create-product/CreateProduct.selectors';
import {
    selectChoosenCategory,
} from '../../../../redux/seller-products/SellerProducts.selectors';

import {
    selectActiveSeller,
} from '../../../../redux/user/User.selectors';

// importing actions
import {
    createProduct,
} from '../../../../redux/create-product/CreateProduct.actions';
import { NavLink } from 'react-router-dom';

const ProductForm = ({path,seller,creating,error,newProduct,create,category,edit}) => {
    const [product,setProduct] = useState({
        name : '',
        description : '',
        warranty : '',
        support : '',

    });
    const spring = useSpring({
        opacity : 1,
        from : {
            opacity : 0,
        }
    });
    useEffect(()=>{
        if(edit){
            setProduct({
                name : edit.name,
                description : edit.description,
                warranty : edit.warranty,
                support : edit.support,
            })
        }
        
    },[])
    return (
        <animated.div  style={spring} className='product-form'>
            <div className="form-group">
                <h3>Product Info</h3>
                {
                    error
                    &&
                    error.response
                    &&
                    error.response.data
                    ?
                    <div className="error">
                        <h4>
                            {JSON.stringify(error.response.data)}
                        </h4>
                    </div>
                    :error !== null && <div className="error">
                            <h4>
                                {JSON.stringify(error)}
                            </h4>
                        </div>
                }
                <input 
                    type="text"
                    value={product.name}
                    placeholder='Name of your product'
                    onChange={
                        e => setProduct({...product, name : e.target.value})
                    }    
                />
                <textarea 
                    value={product.description}
                    placeholder='Describe Your product'
                    onChange={
                        e => setProduct({...product, description : e.target.value})
                    }
                     
                    rows="4"></textarea>
            </div>
            <div className="form-group">
                <h3>Service Info</h3>
                <textarea 
                    value={product.warranty}
                    placeholder='Describe Product warranty'
                    onChange={
                        e => setProduct({...product, warranty : e.target.value})
                    }
                     
                    rows="4"></textarea>
                <textarea 
                    value={product.support}
                    placeholder='Describe Your product support'
                    onChange={
                        e => setProduct({...product, support : e.target.value})
                    }
                    
                rows="4"></textarea>
                {
                    newProduct
                    &&
                    <div className="new-product">
                        <h4>"{newProduct.name}" Successfully created !</h4>
                        <NavLink to={`/products/${newProduct.id}/edit`}>Add Details &rarr;</NavLink>
                    </div>
                }
                {
                    !newProduct
                    &&
                    category
                    &&
                    <button className='save-btn' onClick={()=>create(product,seller,category)} disabled={creating}>
                    
                        {
                            creating
                            ? <Loader 
                                    type = "Oval"
                                    color = "#ffff"
                                    height  = {20}
                                    width = {20}
                                    timeout = {20000}
                                />
                            : <><i className="fa fa-plus" aria-hidden="true"></i> Add product</>
                        }
                    </button>
                }
                {
                    edit
                    &&
                    <button className='save-btn' onClick={()=>create(product,seller,category)} disabled={creating}>
                    
                        {
                            creating
                            ? <Loader 
                                    type = "Oval"
                                    color = "#ffff"
                                    height  = {20}
                                    width = {20}
                                    timeout = {20000}
                                />
                            : <><i className="fa fa-edit" aria-hidden="true"></i> Update</>
                        }
                    </button>
                }

            </div>
        </animated.div>
    )
}
const mapState = state =>({
    seller : selectActiveSeller(state),
    creating : selectCreatingProduct(state),
    error : selectProductError(state),
    newProduct : selectLatestProduct(state),
    category : selectChoosenCategory(state),

});
const mapDispatch = dispatch =>({
    create : (product,seller,category) =>dispatch(createProduct(product,seller,category)),
})

export default connect(mapState,mapDispatch)(ProductForm);
