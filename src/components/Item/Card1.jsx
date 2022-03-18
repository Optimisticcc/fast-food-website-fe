import React from 'react'
import Image1 from '../../assets/images/1-50x50.png'
import Image2 from '../../assets/images/2-50x50.png'
import Image3 from '../../assets/images/3-50x50.png'
import Image4 from '../../assets/images/4-50x50.png'
import Image5 from '../../assets/images/5-50x50.png'

import '../../assets/styles/Cart1.css'
function Card1() {
    return (
        <div className="Cart1 text-white  ">
            <div className="md:flex lg:flex flex-row item-center justify-center sm:space-x-20 xl:space-x-40 mx-10">
                <div className=" grid grid-cols-1 item-center justify-center my-16">
                    <div className="mx-auto item-center justify-center">
                        <img className="h-12 item-center justify-center mb-3" src={Image1} alt=""/>
                    </div>
                    <p className="text-xl  text-center">Burger</p>
                    
                </div>
                <div className="grid grid-cols-1 item-center justify-center my-16">
                    <img className="h-12 m-auto mb-3"  src={Image2} alt=""/>
                    <p className="text-xl text-center">Pizza</p>
                    
                </div>
                <div className="grid grid-cols-1 item-center justify-center my-16">
                    <img className="h-12 m-auto mb-3" src={Image3} alt=""/>
                    <p className="text-xl text-center">Tacos</p>
                    
                </div>
                <div className="grid grid-cols-1  justify-center my-16">
                    <img className="h-12 m-auto mb-3" src={Image4} alt=""/>
                    <p className="text-xl text-center">Salad</p>
                    
                </div>
                <div className="grid grid-cols-1  justify-center my-16">
                    <img className="h-12 m-auto mb-3" src={Image5} alt=""/>
                    <p className="text-xl text-center">Drinks</p>
                    
                </div>
            </div>
        </div>   
    )
}

export default Card1
