import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { formatCurrency } from "app/format";
import { getTotals } from "../../features/Cart/cartSlice";
import "../../assets/styles/HeaderCart.css";
import { logout } from "features/User/Login/loginSlice";
import { getAllProduct } from "api/productApi";
import "../../assets/styles/SearchResult.css";
import { AllSetting, getSettingFilter } from "api/settingApi";
Header.propTypes = {};

function TopHeader() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.me.token);
  const user = useSelector((state) => state.me.user);
  function handleClick(currentRoute) {
    history.push("/" + currentRoute);
  }

  const openDropDownList = () => {
    var dropdownMenuAccount = document.querySelector(".account-link-toggle");
    if (dropdownMenuAccount.classList.contains("display-block")) {
      dropdownMenuAccount.classList.remove("display-block");
    } else {
      dropdownMenuAccount.classList.add("display-block");
    }
  };

  const useClickOutside = (handler) => {
    const domNode = useRef();

    useEffect(() => {
      const maybeHandler = (event) => {
        if (domNode.current && !domNode.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", maybeHandler);

      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    }, []);

    return domNode;
  };

  const [sideAccount, setsideAccount] = useState(false);

  const domNode = useClickOutside(() => {
    setsideAccount(false);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    const action = logout();
    dispatch(action);
    history.push("/");
  };

  return (
    <div className="top">
      <div className="container">
        <div className="top-main">
          <div className="top-left">
            <div className="open_time hidden-xs">
              <i className="fa fa-clock-o"></i>
              <span className="open-time"> Opening Hours: </span>
              <span>8:00 AM - 8:00 PM</span>
            </div>
          </div>
          <div className="top-right">
            <div id="header_ac" className="dropdown " ref={domNode}>
              <div
                title="My Account"
                className="dropdown-toggle cursor-pointer mt-5 "
                data-toggle="dropdown"
                onClick={() => setsideAccount((sideAccount) => !sideAccount)}
              >
                <i className="fa fa-user-o hidden-xs"></i>
                <span style={{ margin: "0 5px" }}>
                  {user && user.TenKhachHang ? user.TenKhachHang : "My Account"}
                </span>
                <i className="fa fa-angle-down"></i>
              </div>
              <nav
                className={sideAccount ? "acount-cart active" : "acount-cart"}
              >
                {token != "" ? (
                  <ul
                    className="acount-cart-items "
                    onClick={() =>
                      setsideAccount((sideAccount) => !sideAccount)
                    }
                  >
                    <li>
                      <Link to="/account">Account information</Link>
                    </li>
                    <li>
                      <a
                        className="cursor-pointer"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul
                    className="acount-cart-items "
                    onClick={() =>
                      setsideAccount((sideAccount) => !sideAccount)
                    }
                  >
                    <li>
                      <Link to="/account/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/account/login">Login</Link>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiddleHeader() {
  const history = useHistory();

  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cartTotalQuantity, cartTotalAmount]);

  function handleClick(currentRoute) {
    history.push("/" + currentRoute);
  }

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };
  const handleSearch = () => {
    history.push({
      pathname: "/products",
      search: `?keywords=${wordEntered}&pageNo=1&pageSize=3`,
    });
    setWordEntered("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      history.push({
        pathname: "/products",
        search: `?keywords=${wordEntered}&pageNo=1&pageSize=3`,
      });
      setWordEntered("");
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const useClickOutside = (handler) => {
    const domNode = useRef();

    useEffect(() => {
      const maybeHandler = (event) => {
        if (domNode.current && !domNode.current.contains(event.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", maybeHandler);

      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    }, []);

    return domNode;
  };

  const [sidebar, setSidebar] = useState(false);

  const domNode = useClickOutside(() => {
    setSidebar(false);
  });
  //-----------------------------

  return (
    <div className="middle">
      <div className="container">
        <div className="middle-main">
          <div id="logo">
            <div className="cursor-pointer">
              <img
                src="https://opencart.mahardhi.com/MT04/vegelite/image/catalog/logo.png"
                title="Your Store"
                alt="Your Store"
                className="img-responsive"
                onClick={() => {
                  handleClick("");
                }}
              />
            </div>
          </div>

          <div className="input-search relative" ref={domNode}>
            <input
              type="text"
              placeholder="Search..."
              value={wordEntered}
              onChange={handleFilter}
              onKeyDown={handleEnter}
            />
            <div>
              <button
                type="button"
                className="btn btn-default btn-lg"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
            {filteredData.length != 0 && (
              <div className="SearchResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <div className="dataItem">
                      <Link to={`/products/${value.code}`}>
                        {value.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div ref={domNode} className="header_cart_desktop">
            <button
              type="button"
              data-toggle="dropdown"
              data-loading-text="Loading..."
              className="cart-button"
              onClick={() => setSidebar((sidebar) => !sidebar)}
            >
              <div className="cart-icon">
                <i className="fa fa-shopping-cart"></i>
              </div>
              <div className="cart-total">
                <div>My Cart</div>
                <div className="cart-total-info space-x-1">
                  <div>{cartTotalQuantity} items</div>
                  <p>-</p>
                  <div>{formatCurrency(cartTotalAmount)}</div>
                </div>
              </div>
            </button>
            <nav className={sidebar ? "nav-cart active" : "nav-cart"}>
              <ul
                className="nav-cart-items"
                onClick={() => setSidebar((sidebar) => !sidebar)}
              >
                <li>
                  {cartTotalAmount === 0 ? (
                    <div className=" text-center">
                      <p>Your cart is currently empty !</p>
                    </div>
                  ) : (
                    <div className="text-center product-cart-empty w-auto">
                      <table className="items-center bg-transparent  border-collapse ">
                        <thead>
                          <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Image
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Name product
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Price
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Quantity
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {cart.cartItems &&
                            cart.cartItems.length &&
                            cart.cartItems?.map((cartItem, id) => (
                              <tr key={id} className="mx-auto">
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                  <img
                                    src={cartItem?.images[0]?.source}
                                    style={{ width: "100px" }}
                                  />
                                </th>
                                <td className="capitalize-first border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                  <div className="">
                                    {cartItem?.name.length > 20
                                      ? cartItem?.name.substring(0, 18) +
                                        "..."
                                      : cartItem?.name}
                                  </div>
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {formatCurrency(cartItem?.price)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <span className="mx-2">
                                    {cartItem?.cartQuantity}
                                  </span>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {formatCurrency(
                                    cartItem?.price * cartItem?.cartQuantity
                                  )}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <div className="text-right uppercase font-bold mr-14 mb-4">
                        <div className="py-3">
                          Total: {formatCurrency(cartTotalAmount)}
                        </div>
                        <div className="space-x-6">
                          <button
                            className="btn-yellow"
                            onClick={() => {
                              handleClick("cart");
                            }}
                          >
                            Cart
                          </button>
                          <button
                            className="btn-yellow"
                            onClick={() => {
                              handleClick("checkout");
                            }}
                          >
                            Check Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomHeader() {
  const history = useHistory();
  const [phone, setphone] = useState({});
  useEffect(() => {
    const fetchSetting = async () => {
      const data = await getSettingFilter({
        name: "setting-phone",
        type: "string",
      });
      console.log(
        "🚀 ~ file: index.jsx ~ line 401 ~ fetchSetting ~ data",
        data
      );
      if (data && data.data) setphone(data.data[0]);
    };
    fetchSetting();
  }, []);
  function handleClick(currentRoute) {
    history.push("/" + currentRoute);
  }
  return (
    <div className="bottom">
      <div className="container">
        <div className="bottom-nav">
          <ul className="nav-list">
            <li>
              <a
                className="cursor-pointer"
                onClick={() => {
                  handleClick("");
                }}
              >
                home
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer"
                onClick={() => {
                  handleClick("products");
                }}
              >
                food
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer"
                onClick={() => {
                  handleClick("blogs");
                }}
              >
                blogs
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer"
                onClick={() => {
                  handleClick("contacts");
                }}
              >
                information
              </a>
            </li>
          </ul>

          <div className="contact-text">
            <div className="phone-icon">
              <i className="fa fa-phone"></i>
            </div>
            Call us:
            <a href="tel:+123-456-7890" style={{ color: "#fff" }}>
              {phone && <p> + {phone.value}</p>}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header(props) {
  return (
    <>
      <TopHeader />
      <MiddleHeader />
      <BottomHeader />
    </>
  );
}

export default Header;
