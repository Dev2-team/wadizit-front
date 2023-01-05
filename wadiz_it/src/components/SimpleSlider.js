import React from "react";
import Slider from "react-slick";
import "./SimpleSlider.scss";
import silde1 from "./slide1.jpg";
import silde2 from "./slide2.jpg";
import silde3 from "./slide3.jpg";
import silde4 from "./slide4.jpg";
import silde5 from "./slide5.jpg";


const SimpleSlider = ()=>{

    const settings = {
      // dots: true,
      infinite: true, 
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,  // 넘어가는 속도
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안 잘림
    };
    
    return (
    	<Slider {...settings}>
                <img className="slider-img" src={silde1} alt="silde1"/>
                <img className="slider-img" src={silde2} alt="silde2"/>
                <img className="slider-img" src={silde3} alt="silde3"/>
                <img className="slider-img" src={silde4} alt="silde4"/>
                <img className="slider-img" src={silde5} alt="silde5"/>
            </Slider>  
    );
}


export default SimpleSlider