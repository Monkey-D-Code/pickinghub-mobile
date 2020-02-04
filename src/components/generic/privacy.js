import React,{Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import {connect} from 'react-redux';

// importing selectors
import {
    selectBrand,
} from '../../redux/website/Website.selectors';
// importing actions
import {
    toggleMenu,
} from '../../redux/website/website.actions';

class Privacy extends Component{
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
    render = ()=>{
        const {from,to} = this.style;
        const {brand} = this.props;
        return (
            <Spring from={from} to={to}>
                {
                    style =>(
                        <div className="privacy" style={style}>
                            <h1>Privacy Policy</h1>
                            {
                                brand
                                &&
                                <div className="policy-list">
                                    {
                                        brand.privacy_policy.map((policy,i)=>(
                                            <div className="single-policy" key={i}>
                                                <h4>{policy.label}</h4>
                                                <p>{policy.desc}</p>
                                            </div>
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
    brand : selectBrand(state),
});
const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
})

export default connect(
    mapState,
    mapDispatch
)(Privacy);