import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
// importing actions
import {
    getcategory,
} from '../redux/category/Category.actions';

// importing selectors
import {
    selectActiveCategory,
    selectCategoryError,
    selectLoadingCategory,

} from '../redux/category/Category.selectors';

// importing elements
import Products from '../elements/category/products';

class Category extends Component{
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
    componentDidMount = ()=>{
        const {match : {params : {id,}},getcategory} = this.props;
        getcategory(id);
    }
    componentDidUpdate = oldProps =>{
        const old_id = oldProps.match.params.id;
        const new_id = this.props.match.params.id;
        if(old_id !== new_id) this.props.getcategory(new_id);
    }
    render = ()=>{
        
        const {from,to} = this.style;
        const {category,error,loading} = this.props;
        if(loading){
            return(
              
                <div className="loading-pickinghub" >
                    <h1>Make your deals come true</h1>
                    <Loader 
                        type = "Oval"
                        color = "#101935"
                        height  = {150}
                        width = {150}
                        timeout = {30000}
                        />
                </div>
                
                
            )
          }
        return(
            <Spring from={from} to={to} >
                {
                    spring =>(
                        <div className="category-details" style={spring}>
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
                                category
                                &&
                                <div className="information">
                                    <img 
                                        src={category.cover_image} 
                                        alt={`${category.name}`}
                                    />
                                    <h3>
                                        {category.name}
                                    </h3>
                                    <p>
                                        {category.desc}
                                    </p>
                                    <Products products={category.all_products}/>
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        );
    }
}

const mapState  = state =>({
    category : selectActiveCategory(state),
    error : selectCategoryError(state),
    loading : selectLoadingCategory(state),
});
const mapDispatch = dispatch=>({
    getcategory : category_id =>dispatch(getcategory(category_id)),
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(Category));