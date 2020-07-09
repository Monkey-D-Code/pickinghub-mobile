import React from 'react';
import Loader from 'react-loader-spinner';
import Logo from "../logo.png";

const PickingHubLoader = ({text}) => {
    return (
        <div className='pickinghub-spinner'>
            <div className="content">
                <h1>{text}</h1>
                <img 
                    src={Logo}
                    alt="PH"
                />
                <Loader 
                    type = "Oval"
                    color = "#7A306C"
                    height  = {150}
                    width = {150}
                    timeout = {40000}
                 />
            </div>
        </div>
    )
}

export default PickingHubLoader;
