import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import CheckoutForm from "./page/CheckoutForm";
import Aside from "components/Aside";
import BreadCrumb from "components/BreadCrumb";
import Confirm from "./page/Confirm";

Checkout.propTypes = {};

function Checkout(props) {
  const match = useRouteMatch();
  return (
    <div className="list-foods-main">
      {/* Thanh định hướng breadcrumb */}

      <div className="container">
        <BreadCrumb currentPage="Checkout" />
      </div>

      {/* thanh aside bên trái và list foods */}
      <div className="container">
        <div className="row">
          <aside id="column-left" className="col-sm-3">
            <Aside filter="yes" />
          </aside>
          <div id="content" className="col-sm-9">
            <Switch>
              <Route exact path={match.url} component={CheckoutForm} />
              <Route path={`${match.url}/confirm`} component={Confirm} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
