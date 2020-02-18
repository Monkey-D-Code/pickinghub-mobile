import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Spring,config,Transition} from 'react-spring/renderprops';
import { NavLink,Route ,withRouter} from 'react-router-dom';




class Input extends Component{
   

    render = ()=>{
        const {
            value,
            name,
            onChange,

        } = this.props;
        
        return(
            <input
                className='input'
                type={name === 'active' ? 'checkbox' : 'text'}
                onClick={name === 'active' ? onChange : null}
                value={value}
                
                name={name}
                onChange={name === 'active' ? null : onChange}
                placeholder={name}
            />
        )
    }
}

class AddAddress extends Component{
    state = {
        country : '',
        state : '',
        district : '',
        town_or_city : '',
        locality : '',
        nearest_landmark : '',
        pin_code : '',
        house_no_or_name : '',
        active : false,
    }
    style = {
        from : {
            opacity : 0,
            transform : 'translateX(100vw)',
        },
        to : {
            opacity : 1,
            transform : 'translateX(0)',
        },
        
    }
    inputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value,
        });
    }
    
    render=()=>{
        const {from,to} = this.style;
        const {
            country,
            state,
            district,
            town_or_city,
            locality,
            nearest_landmark,
            pin_code,
            house_no_or_name,
            active,

        } = this.state;
        return(
            <Spring from={from} to={to} config={config.molasses}>
                {
                    spring=>(
                        <div className="add-address" style={spring}>
                            <h1>Add New Address</h1>
                            
                                <div className="form-group">
                                    <h4>Fill in The Information</h4>
                                    {
                                        Object.keys(this.state).map((key,i)=>(
                                            <Input  
                                                name={key}
                                                value={Object.values(this.state)[i]}
                                                onChange={this.inputChange}
                                                key={i}
                                            />
                                        ))
                                    }
                                    <button type='button'>Add Address</button>
                                </div>
                            
                        </div>
                    )
                }
            </Spring>
        );
    }
}
export default withRouter(AddAddress);