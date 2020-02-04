import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import { NavLink } from 'react-router-dom';



class Products extends Component {
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(-100vw)',

        },
        to : {
            opacity : 1,
            transform : 'translateX(0)',
        }
    }
    render = ()=>{
        const {from,to} = this.style;
        const {products} = this.props;
        return(
            <Spring from={from} to={to} >
                {
                    spring=>(
                        <div className="products" style={spring}>
                            {
                                products
                                &&
                                products.map((product , i)=>(
                                    <div className="single-product" key={i}>
                                        <img 
                                            src={product.random_product_image} 
                                            alt={`${product.name}`}
                                        />
                                        <h4>
                                            <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
                                        </h4>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
           </Spring>
        )
    }
}

export default Products;