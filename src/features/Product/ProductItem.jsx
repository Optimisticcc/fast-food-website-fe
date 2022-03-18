import { addToCard } from "features/Cart/cartSlice";
import React from "react";
import {useDispatch} from "react-redux"
import { useHistory } from "react-router";
import { formatCurrency } from "app/format";
function ProductItem({ product }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart=(product)=>{
    dispatch(addToCard(product));
    history.push("/cart");
  };


  return (
    <div>
      <div className="bg-white relative">
        <div className=" aspect-w-1 aspect-h-1 group ">
          <img className="" src={product.image} alt={product.title} />
          <div className=" absolute  opacity-0 group-hover:opacity-100 flex transition-all duration-500 flex-wrap items-center justify-center ">
            <div className="text-center">
              <button className="bg-red-500 hover:bg-yellow-300 w-10 h-10 flex items-center justify-center rounded-full">
                <i className="fas fa-eye" />
              </button>
            </div>
          </div>

         
        </div>
        <button className="bg-yellow-300 hover:bg-red-500 w-10 h-10 flex items-center justify-center rounded-full absolute right-4 top-4"
          onClick={()=>handleAddToCart(product)}>
            <i className="fas fa-cart-plus" />
          </button>
        <div className="py-5 px-5">
          <div className="hover:text-yellow-400 text-xl text-center capitalize-first">
            {product.title}
          </div>
          <div className=" text-center">{formatCurrency(product.price)}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
