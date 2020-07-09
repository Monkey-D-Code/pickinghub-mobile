import React,{useState} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';



// selectors
import {
    selectHeroImages,
} from '../redux/website/Website.selectors';

const HeroImageSlider = ({images}) => {
    
    return (
        <div >
            {
                images.length > 0
                &&
                <Slider
                    slideIndex={0}
                    duration={2000}
                    infinite={true}
                    autoplay={1000}
                    
                >
                    {
                        images.map((image,i)=>(
                            <div 
                                className="single-slide" 
                                key={i}
                                style={{ 
                                    background: `url('${image.image_url}')`,
                                    backgroundSize : 'cover',
                                    backgroundPosition : 'center'
                                }}
                            >
                                
                               
                                <div className="text">
                                    <h4>{image.title}</h4>
                                    <p>{image.caption}</p>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            }
        </div>
    )
}



export default connect(
    state =>({
        images : selectHeroImages(state),
    }),
)(HeroImageSlider);
