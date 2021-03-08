import React from 'react';
import { Slide } from 'react-slideshow-image';
const slideImages = [
  './images/nature1.PNG',
  './images/nature2.PNG',
  './images/nature3.PNG',
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false
}
 
const Slideshow = () => {
    return (
      <Slide {...properties}>
        <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]}`, height:430, borderRadius: 7}}>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`,height:430, borderRadius: 7}}>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`, height:430, borderRadius: 7}}>
          </div>
        </div>
      </Slide>
    )
}

export default Slideshow;