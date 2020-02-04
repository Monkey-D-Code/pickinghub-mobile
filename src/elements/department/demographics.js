import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {withRouter, NavLink , Route} from 'react-router-dom';



// importing components
import Categories from './categories';
import DemographicDetails from './demographic_details';


class Demographics extends Component{
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
        const {demographics,match} = this.props;
        return (
            <Spring from={from} to={to} >
                {
                    spring =>(
                        <div className="demographics" style={spring}>
                            
                                {
                                    demographics
                                    &&
                                    demographics.map((demo , i)=>(
                                        
                                        <div className="single-demographic" key={i}>
                                            <div className="demo">
                                                <img 
                                                    src={demo.cover_image} 
                                                alt={`${demo.name}`}
                                                />
                                                <div className="info">
                                                    <h3>
                                                        {demo.name}
                                                    </h3>
                                                    <p>
                                                        {demo.desc}
                                                    </p>
                                                    
                                                </div>
                                            </div>
                                            
                                            <Categories categories={demo.categories} />
                                        </div>
                                            

                                    ))
                                }
                            
                        </div>
                    )
                }
            </Spring>
        );
    }
}

export default withRouter(Demographics);