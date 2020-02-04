import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {withRouter, NavLink} from 'react-router-dom';


class Categories extends Component{
    style = {
        from : {
            opacity : 0,
            

        },
        to : {
            opacity : 1,
            
            
        }
    }
    render=()=>{
        const {from,to} = this.style;
        const {categories} = this.props;
        
        return(
            <Spring from={from} to={to}>
                {
                    spring=>(
                        <div className="categories" style={spring}>
                            {
                                categories
                                &&
                                categories.map((category,i)=>(
                                    <div className="single-category" key={i}>
                                        <img 
                                            src={category.cover_image} 
                                            alt={`${category.name}`}
                                        />
                                        <div className="info">
                                            <h4>
                                                <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
                                            </h4>
                                        </div>
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


export default withRouter(Categories);