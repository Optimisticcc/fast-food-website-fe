import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCard,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "./cartSlice";
import { formatCurrency } from "app/format";
function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCard({ ...cartItem, quantityAdd: 1 }));
  };

  return (
    <div className="w-full">
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
          {cart.cartItems.length === 0 ? (
            <div className="h-80 text-center text-2xl flex-col flex items-center justify-center border bg-white border-dashed border-gray-300 mb-6">
              <p>Your cart is currently empty !</p>
              <Link className="btn-yellow text-sm mt-2" to="/products">
                Back to shop
              </Link>
            </div>
          ) : (
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      List product
                    </h3>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Image
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Name product
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Quantity
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Total
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.cartItems?.map((cartItem, id) => (
                      <tr key={id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          <img
                            src={cartItem.images[0].source}
                            style={{ width: "100px" }}
                          />
                        </th>
                        <td className="capitalize-first border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <div className="">{cartItem.name}</div>
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatCurrency(cartItem.price)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className=" w-4 h-4  bg-gray-200"
                            onClick={() => handleDecreaseCart(cartItem)}
                          >
                            -
                          </button>
                          <span className="mx-2">{cartItem.cartQuantity}</span>
                          <button
                            className=" w-4 h-4  bg-gray-200"
                            onClick={() => handleIncreaseCart(cartItem)}
                            disabled={
                              cartItem.cartQuantity > cartItem.quantity - 1
                            }
                          >
                            +
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatCurrency(
                            cartItem.price * cartItem.cartQuantity
                          )}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="btn-yellow"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-right uppercase font-bold mr-14 mb-4">
                <div className="py-3">
                  Total: {formatCurrency(cart.cartTotalAmount)}
                </div>
                <Link className="btn-yellow" to="/checkout">
                  Check Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;
