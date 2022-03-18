import { Suspense, useEffect } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import React from "react";
import Home from "features/Home";
import Footer from "components/Footer/Footer";
import Cart from "features/Cart";
import CheckOut from "features/CheckOut";
import UserInfo from "features/User/UserUpdateInfo/UserInfo";
import ScrollToTop from "ScrollToTop";
import HeaderDefault from "components/Header/Header";
import Blog from "features/Blog/BlogRoute";
import Product from "features/Product";
import User from "features/User/index";
import Login from "features/User/Login/index";
import Register from "features/User/UserRegister/UserRegister";
import { getMe } from "features/User/Login/loginSlice";
import { useDispatch } from "react-redux";
import Contact from "features/Contact";
import ReactNotification from "react-notifications-component";
import MessengerCustomerChat from "react-messenger-customer-chat";
import ToTop from "ToTop";
const Photo = React.lazy(() => import("./features/Photo"));
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getMe();
    dispatch(action);
  }, []);
  return (
    <div>
      <ReactNotification />
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          {/* <Header /> */}
          <HeaderDefault />
          <ToTop />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/photos" component={Photo} />
            <Route path="/cart" component={Cart} />
            <Route path="/contacts" component={Contact} />
            <Route path="/products" component={Product} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/blogs" component={Blog} />

            <Route path="/account" component={User} />

            <Route path="/checkout" component={CheckOut} />
          </Switch>
          <ScrollToTop />
          <Footer />
        </BrowserRouter>
      </Suspense>
      <MessengerCustomerChat pageId="111716291318071" appId="284282986930247" />
    </div>
  );
}

export default App;
