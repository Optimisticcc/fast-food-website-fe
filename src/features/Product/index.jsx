import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import ListProduct from "./pages/ListProduct";
import ListCategoryProduct from "./pages/ListProductCategory";
import ProductDetail from "./ProductDetail";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();
  return (
      <Switch>
        <Route exact path={match.url} component={ListProduct} />
        <Route
          path={`${match.url}/category/:id`}
          component={ListCategoryProduct}
        />
        <Route
          path={`${match.url}/:code`}
          component={ProductDetail}
        />
        
      </Switch>
  );
}

export default Product;
