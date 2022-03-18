import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import ListBlog from "./page/ListBlog";
import ListBlogCategory from "./page/ListBlogCategory";
import BlogDetail from "./BlogDetail";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();
  return (
      <Switch>
        <Route exact path={match.url} component={ListBlog} />
        <Route
          path={`${match.url}/category/:id`}
          component={ListBlogCategory}
        />
        <Route
          path={`${match.url}/:slug`}
          component={BlogDetail}
        />
        
      </Switch>
  );
}

export default Product;
