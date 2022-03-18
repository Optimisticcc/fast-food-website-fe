import React, { useState, useEffect } from "react";
import { getAllCatProduct } from "api/categoryProductAPI";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "api/productApi";
import { Link } from "react-router-dom";
import { formatCurrency } from "app/format";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import qs from "qs";
Aside.propTypes = {
  filter: PropTypes.bool,
  handleChange: PropTypes.func,
  isCategory: PropTypes.bool,
  onFilterPrice: PropTypes.func,
};

Aside.defaultProps = {
  filter: false,
  handleChange: null,
  isCategory: false,
  onFilterPrice: null,
};

function Aside(props) {
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const { filter, handleChange, isCategory, onFilterPrice } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const handleCheck1 = () => {
    setCheck1(!check1);
  };

  const handleCheck2 = () => {
    setCheck2(!check2);
  };
  const handleCheck3 = () => {
    setCheck3(!check3);
  };

  const handleFilterPrice = () => {
    const arrFilter = [];
    if (check1) {
      arrFilter.push(1);
    }
    if (check2) arrFilter.push(2);
    if (check3) arrFilter.push(3);
    if (onFilterPrice) onFilterPrice(arrFilter);
  };

  const handleChangeCategory = (value) => {
    console.log(filter);
    if (handleChange && isCategory) {
      handleChange(value);
    } else {
      history.push({
        pathname: `/products/category/${value}`,
        search: "",
      });
    }
  };
  useEffect(() => {
    console.log("RUn to")
    const decodeUrl = qs.parse(location.search.substring(1));
    const filter = decodeUrl["filter"];
    console.log(filter)
    if (filter) {
      if (filter["price"]) {
        if (filter["price"]["$gte"] == 0 && filter["price"]["$lte"] == 100000)
          setCheck1(true);
        if (
          filter["price"]["$gte"] == 100000 &&
          filter["price"]["$lte"] == 200000
        )
          setCheck2(true);
        if (filter["price"]["$gte"] == 200000) setCheck3(true);
        if (filter["price"]["$gte"] == 0) {
          setCheck3(true);
          setCheck2(true);
          setCheck1(true);
        }
      }
      if (filter["$or"]) {
        if (Number.parseInt(filter["$or"][0]["price"]["$gte"]) != 0) {
          console.log("Hello")
          setCheck3(true);
          setCheck2(true);
        } else {
          if (Number.parseInt(filter["$or"][1]["price"]["$gte"]) != 100000) {
            setCheck3(true);
            setCheck1(true);
          } else {
            setCheck2(true);
            setCheck1(true);
          }
        }
      }
    }
    const fetchCategoryList = async () => {
      try {
        const params = {};
        const response = await getAllCatProduct(params);
        setCategoryList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    const fetchProductList = async () => {
      try {
        const params = {
          pageNo: 1,
          pageSize: 3,
        };
        const response = await getAllProduct(params);
        setProductList(response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchCategoryList();

    fetchProductList();
  }, []);

  return (
    <>
      <div className="category-list">
        <div className="box-category">
          <h3 className="toggled relative">Categories</h3>
          <ul className="list-unstyled parent" id="selectMe-desk">
            {categoryList.map((category) => {
              return (
                <li className="" key={category.id}>
                  <span
                    className="list-group-item cursor-pointer"
                    onClick={() => handleChangeCategory(category.id)}
                  >
                    <span>{category.name}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {filter !== undefined ? (
        <div class="panel panel-default filter">
          <div class="box-content">
            <div id="filter">
              <h3 class="panel-heading toggled">Refine Search</h3>
              <div class="filter_box" style={{ display: "block" }}>
                <div class="list-group list-group-filter">
                  <div class="list-group-items">
                    <a class="list-group-item">price</a>
                    <div class="list-group-item">
                      <div id="filter-group2">
                        <div class="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="filter[]"
                              value="1"
                              checked={check1}
                              onChange={handleCheck1}
                            />
                            {formatCurrency(0) + " - " + formatCurrency(100000)}
                          </label>
                        </div>
                        <div class="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="filter[]"
                              value="2"
                              checked={check2}
                              onChange={handleCheck2}
                            />
                            {formatCurrency(100000) +
                              " - " +
                              formatCurrency(200000)}
                          </label>
                        </div>
                        <div class="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="filter[]"
                              value="3"
                              checked={check3}
                              onChange={handleCheck3}
                            />
                            {formatCurrency(200000) + " -"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="panel-footer text-left">
                  <button
                    type="button"
                    id="button-filter"
                    class="btn btn-primary"
                    onClick={handleFilterPrice}
                  >
                    Refine Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="box-content special">
        <div className="page-title toggled">
          <h3>Specials</h3>
        </div>
        <div
          className="block_box row"
          style={{ display: "block", padding: "20px" }}
        >
          <div
            id="special-carousel"
            className="box-product  product-carousel  clearfix"
          >
            <div className="product-layout  col-xs-12">
              {productList.map((product, index) => {
                return (
                  <div className="product-thumb transition" key={index}>
                    <div className="image">
                      <Link to={`/products/${product.code}`}>
                        <a className="cursor-pointer">
                          <img
                            src={`${product.images[0].source}`}
                            alt={product.name}
                            title={product.name}
                            className="img-responsive"
                            style={{maxHeight: "78px"}}
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="thumb-description clearfix">
                      <div className="caption">
                        <div className="desc-inner">
                          <h4 className="product-title">
                            <Link to={`/products/${product.code}`}>
                              <a className="cursor-pointer">
                                {product.name}
                              </a>
                            </Link>
                          </h4>
                        </div>
                        <p className="price">
                          <span className="price-new">
                            {formatCurrency(product.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aside;
