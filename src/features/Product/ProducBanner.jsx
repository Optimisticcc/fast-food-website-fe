import React, { useRef } from "react";
import PropTypes from "prop-types";
ProductBanner.propTypes = {
  listBanner: PropTypes.func,
};
ProductBanner.defaultProps = {
  listBanner: [],
};


function ProductBanner(props) {
  const slideRef = useRef();
  
    
  
  
  const settings = {
    
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2 ,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
  
    ],
  };
  
  return (
    <div>
       
      <div className="relative">
        <div className="h-12 py-5 relative">
        <div className="absolute top-0 right-0 space-x-3 mx-4">
          <button className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 " onClick={() => slideRef?.current?.slickPrev()}>
            <i className="fa fa-angle-left"></i></button>
          <button className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 " onClick={() => slideRef?.current?.slickNext()}>
            <i className="fa fa-angle-right"></i></button>
        </div></div>
        {/* <Slider ref={slideRef}  {...settings} className="space">
          {products.map((product) => (
          <div key={product._id}  className="px-4">
              <ProductItem product={product}/>
          </div>
          ))}
        </Slider> */}
      </div>
    </div>
  );
}

export default ProductBanner;
