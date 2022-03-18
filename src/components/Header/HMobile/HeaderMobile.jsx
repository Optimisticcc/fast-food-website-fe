import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "assets/styles/Headermobile.css";
import SidebarData from "./SidebarData";
import { useHistory } from "react-router-dom";
import { getTotals } from "../../../features/Cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "app/format";
import { getAllProduct } from "api/productApi";
import { logout } from "features/User/Login/loginSlice";
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
          <div className="top-left ">
            <div className="open_time hidden-xs hidden md:block">
              <i className="fa fa-clock-o"></i>
              <span className="open-time"> Opening Hours: </span>
              <span>8:00 AM - 8:00 PM</span>
            </div>
          </div>
          <div className="top-right">
            <div id="header_ac" className="dropdown mt-5" ref={domNode}>
              <div
                title="My Account"
                className="dropdown-toggle cursor-pointer"
                data-toggle="dropdown"
                onClick={() => setsideAccount((sideAccount) => !sideAccount)}
              >
                <i className="fa fa-user-o hidden-xs"></i>
                  <span style={{ margin: "0 5px" }}>{user && user.TenKhachHang ? user.TenKhachHang : 'My Account'}</span>
                <i className="fa fa-angle-down"></i>
              </div>
              <nav
                className={sideAccount ? "acount-cart active" : "acount-cart"}
              >
                {token != "" ? (
                  <ul className="acount-cart-items" onClick={() => setsideAccount((sideAccount) => !sideAccount)}>
                    <li>
                      <Link to="/account">Account information</Link>
                    </li>
                    <li>
                      <a className="cursor-pointer" onClick={()=> {handleLogout()}}>Logout</a>
                    </li>
                  </ul>
                ) : (
                  <ul className="acount-cart-items" onClick={() => setsideAccount((sideAccount) => !sideAccount)}>
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
  const [cartProduct, setCartProduct] = useState();
  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setCartProduct(JSON.parse(localStorage.getItem("cartItems")));
    }
  }, []);
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

          <div className=" items-center justify-center">
            <button
              type="button"
              data-toggle="dropdown"
              data-loading-text="Loading..."
              className="cart-button"
              onClick={() => {
                handleClick("cart");
              }}
            >
              <div className="cart-icon">
                <i className="fa fa-shopping-cart"></i>
              </div>
              <div className="text-left">
                <div>My Cart</div>
                <div className="flex flex-col-2 space-x-1">
                  <div>{cartTotalQuantity} items</div>
                  <p className="hidden sm:block">-</p>
                  <div className="hidden sm:block">{formatCurrency(cartTotalAmount)}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
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

function HaederMobile() {
  const [sidebar, setSidebar] = useState(false);

  const domNode = useClickOutside(() => {
    setSidebar(false);
  });

  //-------thanh search---
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const history=useHistory();
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord)
  };
  const handleSearch = () => {
    history.push({
      pathname: '/products',
      search: `?keywords=${wordEntered}&pageNo=1&pageSize=3`
    });
    setWordEntered("");
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      history.push({
        pathname: '/products',
        search: `?keywords=${wordEntered}&pageNo=1&pageSize=3`
      });
      setWordEntered("");
    }
  }

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
      <TopHeader />
      <MiddleHeader />
      <div
        ref={domNode}
        className="flex flex-col-2 h-16 items-center bg-yellow-500"
      >
        <div className="w-1/5">
          <div>
            <IconContext.Provider value={{ color: "#fff", size: "20px" }}>
              <div className="navbar">
                <Link to="#" className="menu-bars">
                  <FaIcons.FaBars
                    onClick={() => setSidebar((sidebar) => !sidebar)}
                  />
                </Link>
              </div>
              <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul
                  className="nav-menu-items"
                  onClick={() => setSidebar((sidebar) => !sidebar)}
                >
                  <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                      <div className="flex flex-col-2 space-x-28">
                        <p className="text-white hover:text-white text-xl">
                          MENU
                        </p>
                        <div className="left-20 ">
                          <AiIcons.AiOutlineClose />
                        </div>
                      </div>
                    </Link>
                  </li>

                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          <span className="hover:text-yellow-500">
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </IconContext.Provider>
          </div>
        </div>

        <div className=" w-3/4 justify-between mx-auto relative">
          <div className="input-search w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={wordEntered}
              onChange={handleFilter}
              onKeyDown={handleEnter}
            />
            <div>
              
                <button type="button" className="btn btn-default btn-lg" onClick={handleSearch}>
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
        </div>
      </div>
    </div>
  );
}

export default HaederMobile;
