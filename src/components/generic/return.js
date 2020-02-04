import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops';

// importing selectors
import {
    selectBrand,

} from '../../redux/website/Website.selectors';

// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions'

class Return extends Component{
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
        this.props.toggle();
    }

    render=()=>{
        const {from,to} = this.style;
        const {brand } = this.props;
        return(
            <Spring from={from} to={to}>
                {
                    spring=>(
                        <div className="return-policy" style={spring}>
                            <h1>Return Policy</h1>
                            {
                                brand
                                &&
                                <div className="policy-list">
                                    {
                                        brand.return_policy.map((policy,i)=>(
                                            <Spring from={{opacity:0}} to={{opacity:1}} config={{delay:(200+i*300)}} key={i}>
                                                {
                                                    spring_2=>(
                                                        <div className="single-policy" style={spring_2}>
                                                            <h4>{policy.label}</h4>
                                                            <p>{policy.desc}</p>
                                                        </div>
                                                    )
                                                }
                                            </Spring>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    )
                }
            </Spring>
        )
    }
}

const mapState = state =>({
    brand  : selectBrand(state),
    
})
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
})
export default withRouter(connect(
    mapState,
    mapDispatch,
)(Return));