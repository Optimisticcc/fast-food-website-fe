import React from 'react'
import Image1 from 'assets/images/vanchuyen.png'
import Image2 from 'assets/images/money.png'
import Image3 from 'assets/images/gift.png'
import Image4 from 'assets/images/help.png'
import '../../assets/styles/Flipcard.css'

function CardService() {
    return (
        <div className="bg-white ">
            <div className="md:grid grid-cols-2 lg:flex flex-row item-center justify-center">
                <div className=" grid grid-cols-1 item-center justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image1} alt="#" className="rounded-full" />
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image1} alt="#"className="rounded-full"/>
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">Free Delivery</p>
                    <p className="text-gray-400 text-center">Shop For all order over $50</p>
                </div>


                <div className="grid grid-cols-1 item-center justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image2} alt="#" className="rounded-full" />
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image2} alt="#" className="rounded-full" />
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">Cash On Delivery</p>
                    <p className="text-gray-400 text-center">100% Money Back guarantee</p>
                </div>


                <div className="grid grid-cols-1 item-center justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image3} alt="#" className="rounded-full"/>
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image3} alt="#"className="rounded-full" />
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">Special Gift Card</p>
                    <p className="text-gray-400 text-center">Offer special bonuses with gift</p>
                </div>


                <div className="grid grid-cols-1  justify-center m-11">
                    <div className="mx-auto item-center justify-center my-3">
                              <div className="flip-card">
                              <div className="flip-card-inner">
                                  <div className="flip-card-front">
                                  <img src={Image4} alt="#"className="rounded-full" />
                                  </div>
                                  <div className="flip-card-back">
                                  <img src={Image4} alt="#" className="rounded-full" />
                                  </div>
                              </div>
                              </div>
                    </div>
                    <p className="text-xl hover:text-yellow-400 text-center">24/7 Support</p>
                    <p className="text-gray-400 text-center">Answer for question all time</p>
                </div>
            </div>
        </div>
    )
}

export default CardService

