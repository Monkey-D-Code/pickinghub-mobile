import React,{Component} from 'react';
import {Route,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Spring} from 'react-spring/renderprops';


// importing sub pages
import AllDepartments from '../elements/department/all_departments';
import DepartmentDetails from '../elements/department/department_details';


import {
    toggleMenu,
} from '../redux/website/website.actions';

import {
    selectNavigationSwitch,
} from '../redux/website/Website.selectors';


class Department extends Component{
    componentDidMount = ()=>{
        if(this.props.switch) this.props.toggle();
    }
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
        const {match} = this.props;
        return (
            <Spring from={from} to={to}>
                {
                    spring =>(
                        <div className="department-page" style={spring}>
                            <Route exact path={`${match.path}`}>
                                <AllDepartments />
                            </Route>
                            <Route path={`${match.path}/:id/details`}>
                                <DepartmentDetails />
                            </Route>
                        </div>
                    )
                }
            </Spring>
        );
    }
}
const mapState = state =>({
    switch : selectNavigationSwitch(state),
})

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu())
})

export default withRouter(
    connect(
        mapState,
        mapDispatch,
    
    )(Department)
);