import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';
import Loader from 'react-loader-spinner';


// importing selectors
import {
    selectSearchText,
    selectLoadingResults,
    selectSerchResults,
    selectResultsError,

} from '../../redux/product/Product.selectors';
// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';
import {
    searchTextChange,
    searchProducts,

} from '../../redux/product/Product.actions';


class Search extends Component{
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
        const {text , getResults} = this.props;
        
        if(!text) this.props.toggle();
    }

    render=()=>{
        const {from,to} = this.style;
        const {
            text,
            change,

            getResults,
            results,
            error,
            loading,

        } = this.props;
        if(loading){
            return(
              
                <div className="loading-pickinghub" >
                    <h1>Here is all on "{text}"</h1>
                    <Loader 
                        type = "Oval"
                        color = "#101935"
                        height  = {150}
                        width = {150}
                        timeout = {20000}
                        />
                </div>
                
                
            )
          }
        return(
            <Spring from={from} to={to}>
                {
                    spring=>(
                        <div className="search" style={spring}>
                            <div className="search-box">
                                <i className="fa fa-search" aria-hidden="true"></i>
                                <input 
                                    type="text"
                                    placeholder="Search for Product"
                                    value={text}
                                    onChange={e=>change(e.target.value)}
                                    
                                    
                                />
                                <button className="search-btn" onClick={()=>getResults(text)} disabled={text.length === 0}>
                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </button>
                            </div>
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
                                results
                                &&
                                <div className="result-list">
                                    <h4>{results.count} Product{results.count > 1 && 's'} found</h4>
                                    <Spring from={{opacity:0,transform:'translateX(100vw)'}} to={{opacity:1,transform:'translateX(0)'}} config={{delay:500}}>
                                        {
                                            spring_2=>(
                                                <div className="results">
                                                    {
                                                        results.results.map((product,i)=>(
                                                            
                                                                        <div className="single-result" style={spring_2} key={i}>
                                                                            <img 
                                                                                src={product.random_product_image} 
                                                                                alt=""
                                                                            />
                                                                            <div className="info">
                                                                                <h3>
                                                                                    <NavLink to={`/product/${product.id}`}>{product.name}</NavLink>
                                                                                </h3>
                                                                                <p>{product.description.replace(/^(.{50}[^\s]*).*/, "$1")} ...</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                
                                                        
                                                        )
                                                    }
                                                </div>
            
                                                )
                                        }
                                     </Spring>
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        )
    }
}

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    change : text =>dispatch(searchTextChange(text)),
    getResults : text=>dispatch(searchProducts(text)),
});
const mapState = state =>({
    text : selectSearchText(state),
    results : selectSerchResults(state),
    error : selectResultsError(state),
    loading : selectLoadingResults(state),
})
export default withRouter(connect(
    mapState,
    mapDispatch,
)(Search));