import React, { useState, useEffect, useRef } from "react";
import BreadCrumb from "components/BreadCrumb";
import Aside from "components/Aside";
import { Link } from "react-router-dom";
import { getAllProduct } from "api/productApi";
import qs from "qs";
import { formatCurrency } from "app/format";
import Pagination from "react-js-pagination";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { addToCard } from "features/Cart/cartSlice";
import {useDispatch} from "react-redux"
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Slider from "react-slick";
import { getSettingById } from "api/settingApi";

///===================== doan code cua Modal
function ImageInSlider({ picture, handleChangeImage }) {
  return (
    <div class="owl-item" style={{ width: "108px" }}>
      <div class="image-additional">
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleChangeImage(picture);
          }}
        >
          <img
            src={`${picture.source}`}
            alt={picture.id}
            width="80"
            height="80"
          />
        </a>
      </div>
    </div>
  );
}
//===================


function ListCategoryProduct() {
  const slideRef = useRef();
  const [productList, setProductList] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageSize: 12,
    ProductCategory: id,
  });
  const [total, setTotal] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const onPageChange = (page) => {
    setFilter({ ...filter, pageNo: page });
  };

  const handleSelect = (e) => {
    setFilter({ ...filter, sort: e.target.value });
  };

  const onCategoryChange = (value) => {
    setFilter({ ProductCategory: value, pageNo: 1, pageSize: 3 });
  };

  const onFilterPrice = (value) => {
    console.log(value);
    if (value.length == 3 || value.length == 0) {
      setFilter({
        ...filter,
        filter: {
          price: {
            $gte: 0,
          },
        },
        pageNo: 1,
      });
    } else if (value.length == 2) {
      let filterPrice = {
        $or: [],
      };
      if (value.indexOf(1) > -1) {
        filterPrice["$or"].push({
          price: {
            $gte: 0,
            $lte: 100000,
          },
        });
      }
      if (value.indexOf(2) > -1) {
        filterPrice["$or"].push({
          price: {
            $gte: 100000,
            $lte: 200000,
          },
        });
      }
      if (value.indexOf(3) > -1) {
        filterPrice["$or"].push({
          price: {
            $gte: 200000,
          },
        });
      }
      setFilter({
        ...filter,
        filter: filterPrice,
        pageNo: 1,
      });
      console.log(filterPrice, "2");
    } else if (value.length == 1) {
      let filterPrice = {};
      if (value.indexOf(1) > -1) {
        filterPrice = {
          price: {
            $gte: 0,
            $lte: 100000,
          },
        };
      }
      if (value.indexOf(2) > -1) {
        filterPrice = {
          price: {
            $gte: 100000,
            $lte: 200000,
          },
        };
      }
      if (value.indexOf(3) > -1) {
        filterPrice = {
          price: {
            $gte: 200000,
          },
        };
      }
      setFilter({
        ...filter,
        filter: filterPrice,
        pageNo: 1,
      });
      console.log(filterPrice, "1");
    }
  };
  useEffect(() => {
    setFilter({
      ...filter,
      ...qs.parse(window.location.search.substring(1), {
        decoder(str, decoder, charset) {
          const strWithoutPlus = str.replace(/\+/g, " ");
          if (charset === "iso-8859-1") {
            // unescape never throws, no try...catch needed:
            return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
          }

          if (/^(\d+|\d*\.\d+)$/.test(str)) {
            return parseFloat(str);
          }

          const keywords = {
            true: true,
            false: false,
            null: null,
            undefined,
          };
          if (str in keywords) {
            return keywords[str];
          }

          // utf-8
          try {
            return decodeURIComponent(strWithoutPlus);
          } catch (e) {
            return strWithoutPlus;
          }
        },
      }),
    });
  }, []);

  //------------------modal
  const [pictures, setPictures] = useState([]);
  const [currentPic, setCurrentPic] = useState({});
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  //--------------------
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await getAllProduct({ ...filter });
        setProductList(response.data);
        setTotal(response.totalPage);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    let searchStr = "";
    let dmsp = filter.ProductCategory;
    searchStr = qs.stringify({ ...filter, ProductCategory: undefined });
    history.push({
      pathname: `/products/category/${dmsp}`,
      search: searchStr,
    });
    const urlDecode = qs.parse(window.location.search.substring(1), {
      decoder(str, decoder, charset) {
        const strWithoutPlus = str.replace(/\+/g, " ");
        if (charset === "iso-8859-1") {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }

        if (/^(\d+|\d*\.\d+)$/.test(str)) {
          return parseFloat(str);
        }

        const keywords = {
          true: true,
          false: false,
          null: null,
          undefined,
        };
        if (str in keywords) {
          return keywords[str];
        }

        // utf-8
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      },
    });
    fetchProductList();
  }, [filter]);

  //=========add to cart
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if(product.quantity>0){
      dispatch(addToCard({ ...product, quantityAdd: amount }));
      history.push("/cart");
    }
    
  };
  //=============code cho modal
  const handleModal = (value) => {
    setCurrentProduct(value);
    setPictures(value.images);
    setCurrentPic(value.images[0]);
    setOpen(true);
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [amount, setAmount] = useState(1);

  const handleAmount = (number) => {
    if (number > 0 && amount < currentProduct.quantity) {
      setAmount((prev) => prev + number);
    }
    if (number < 0 && amount > 1) {
      setAmount((prev) => prev + number);
    }
  };

  const handleChangeImage = (picture) => {
    setCurrentPic(picture);
  };

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSetting = async () => {
      const data = await getSettingById('setting-banner-product');
      if(data && data.data && data.data.value)
        setSettings(data.data.value);
    };
    fetchSetting();
  },[]);

  return (
    <div className="list-foods-main">
      {/* Thanh định hướng breadcrumb */}

      <div className="container">
        <BreadCrumb currentPage="Food" />
      </div>

      {/* thanh aside bên trái và list foods */}
      <div className="container">
        <div className="row">
          <aside id="column-left" className="col-sm-3">
            <Aside
              filter={true}
              isCategory={true}
              handleChange={onCategoryChange}
              onFilterPrice={onFilterPrice}
            />
          </aside>
          <div id="content" className="col-sm-9">
            {/* big banner */}
            <div className="row">
              <div className="col-sm-12">
                <img
                  src={settings}
                  alt="Shop"
                  title="Shop"
                  className="img-thumbnail cat-banner"
                />
              </div>
            </div>

            {/* thanh sort */}
            <div className="row ">
              <div class="col-sm-12 mb-6">
                <div className="cat-info">
                  <div class="cat-sort justify-end">
                    <label class="control-label text_sort" for="input-sort">
                      Sort By:
                    </label>
                    <div class="clearfix" style={{ marginLeft: "10px" }}>
                      <div class="select-filter-sort">
                        <select
                          id="input-sort"
                          class="form-control sort-order"
                          value={filter.sort ? filter.sort : "default"}
                          onChange={handleSelect}
                        >
                          <option value="id">Default</option>
                          <option value="name">Name (A - Z)</option>
                          <option value="-name">Name (Z - A)</option>
                          <option value="price">Price (Low &gt; High)</option>
                          <option value="-price">Price (High &gt; Low)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* list sản phẩm */}
            <div className="row category-row">
              {productList.map(function (product) {
                return (
                  <div
                    className="product-layout product-grid col-lg-4 col-md-4 col-sm-4 col-xs-6"
                    key={product?.id}
                  >
                    <div className="product-thumb transition clearfix">
                      <div className="image">
                        <Link to={`/products/${product.code}`}>
                          <img
                            src={`${product?.images[0]?.source}`}
                            alt={product?.name}
                            title={product?.name}
                            className="img-responsive"
                          />
                        </Link>

                        <div className="cart_main">
                          <button
                            type="button"
                            className="bg-yellow-400 hover:bg-red-600 w-10 h-10 flex items-center justify-center rounded-full"
                            data-toggle="tooltip"
                            title="Add to cart"
                            onClick={() => handleAddToCart(product)}
                            data-original-title="Add to Cart"
                          >
                            <i
                              className="fa fa-shopping-cart"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                        <div className="button-group grid-btn justify-center flex">
                          <button
                            type="button"
                            className="w-10 h-10 flex items-center justify-center rounded-full"
                            data-toggle="tooltip"
                            title="Quick review"
                            onclick="quickView.ajaxView('?route=product/quickview&amp;product_id=45');"
                            data-original-title="Quickview"
                            onClick={() => handleModal(product)}
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </button>
                        </div>
                        {product.quantity<1&&(<div className="absolute top-6 left-1 "><span className="text-red-500">Out stock</span></div>)}
                      </div>
                      <div className="thumb-description clearfix">
                        <div className="caption">
                          <div className="desc-inner">
                            <h4 className="product-title">
                              <Link to={`/products/${product?.code}`}>
                                {product?.name}
                              </Link>
                            </h4>
                          </div>
                          <p className="price">
                            <span className="price-new">
                              {formatCurrency(product?.price)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Modal open={open} onClose={onCloseModal} center>
              <div
                id="product-page"
                className="container "
                style={{ width: "auto" }}
              >
                <div className="row">
                  <div id="content" className="col-sm-12">
                    <div class="pro-deatil clearfix row">
                      <div class="col-sm-6 product-img">
                        <div class="thumbnails">
                          <div class="product-additional">
                            <div class="pro-image">
                              <span class="thumbnail">
                                <img
                                  src={`${currentPic?.source}`}
                                  title={currentPic.id}
                                  id="zoom"
                                  alt={currentPic.id}
                                />
                              </span>
                            </div>

                            <div
                              id="additional-carousel"
                              class="owl-carousel owl-theme clearfix owl-loaded"
                            >
                              <div
                                class="owl-stage-outer"
                                style={{ marginBottom: "10px" }}
                              >
                                <div
                                  class="owl-stage"
                                  style={{ transition: "all 0.25s ease 0s" }}
                                >
                                  {pictures.length > 3 ? (
                                    <Slider ref={slideRef} >
                                      {pictures.map((picture, index) => {
                                        return (
                                          <ImageInSlider
                                            picture={picture}
                                            handleChangeImage={
                                              handleChangeImage
                                            }
                                            key={index}
                                          />
                                        );
                                      })}
                                    </Slider>
                                  ) : (
                                    <>
                                      {pictures.map((picture, index) => {
                                        return (
                                          <div
                                            class="owl-item"
                                            style={{ width: "108px" }}
                                            key={index}
                                          >
                                            <div class="image-additional">
                                              <a
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  handleChangeImage(picture);
                                                }}
                                              >
                                                <img
                                                  src={`${picture.source}`}
                                                  alt={picture.id}
                                                  width="80"
                                                  height="80"
                                                />
                                              </a>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </>
                                  )}
                                </div>
                              </div>

                              <div class="owl-nav">
                                <div
                                  class="owl-prev"
                                  onClick={() => slideRef?.current?.slickPrev()}
                                >
                                  <i class="fa fa-angle-left"></i>
                                </div>
                                <div
                                  class="owl-next"
                                  onClick={() => slideRef?.current?.slickNext()}
                                >
                                  <i class="fa fa-angle-right"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="right_info">
                          <h1 class="">{currentProduct?.name}</h1>

                          <hr />

                          <ul class="list-unstyled">
                            <li>
                              <span class="disc">Product Code:</span>
                              <span class="disc1"> {currentProduct?.code}</span>
                            </li>
                            <li>
                              <span class="disc">Availability:</span>
                              <span class="disc1">
                                {" "}
                                {currentProduct?.quantity > 0
                                  ? `In stock (${currentProduct?.quantity})`
                                  : "Out stock"}
                              </span>
                            </li>
                          </ul>

                          <hr />
                          <ul class="list-unstyled">
                            <li>
                              <span class="pro_price">
                                {formatCurrency(currentProduct?.price)}
                              </span>
                            </li>
                          </ul>

                          <hr />

                          <div id="product" class="product-options">
                            <div class="form-group">
                              <label
                                class="control-label qty"
                                for="input-quantity"
                              >
                                Qty
                              </label>
                              <div class="product-btn-quantity">
                                <div class="pro-quantity">
                                  <div class="minus-plus">
                                    <button
                                      class="w-10 h-10 flex items-center justify-center rounded-full border-dashed"
                                      onClick={() => {
                                        handleAmount(-1);
                                      }}
                                    >
                                      <i class="fa fa-minus"></i>
                                    </button>
                                    <input
                                      type="text"
                                      name="quantityAdd"
                                      value={amount}
                                      size="2"
                                      id="input-quantity"
                                      class="form-control"
                                    />
                                    <button
                                      class="w-10 h-10 flex items-center justify-center rounded-full border-dashed"
                                      onClick={() => {
                                        handleAmount(1);
                                      }}
                                    >
                                      <i class="fa fa-plus"></i>
                                    </button>
                                  </div>
                                </div>
                                <input
                                  type="hidden"
                                  name="product_id"
                                  value="35"
                                />
                                <button
                                  type="button"
                                  id="button-cart"
                                  onClick={() =>
                                    handleAddToCart(currentProduct)
                                  }
                                  data-loading-text="Loading..."
                                  class="btn btn-primary btn-lg btn-block"
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12" style={{ marginBottom: "50px" }}>
                      <div className="row pro-tab">
                        <ul class="nav nav-tabs">
                          <li>
                            <a>Description</a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: currentProduct?.description,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            {/* thanh pagination */}
            <div className="pro_pagination clearfix">
              <div className="col-sm-6 text-left">
                Showing 1 to {productList.length} of {totalCount} ({total}{" "}
                Pages)
              </div>
              <div className="col-sm-6 text-right">
                <Pagination
                  activePage={Number.parseInt(filter.pageNo)}
                  itemsCountPerPage={3}
                  totalItemsCount={totalCount}
                  pageRangeDisplayed={total > 5 ? 5 : total}
                  onChange={onPageChange}
                  activeLinkClass="bg-yellow-400 text-white"
                />
                {/* <ul className="pagination">
                                    <li className="active"><span>1</span></li>
                                    <li><a href="https://opencart.mahardhi.com/MT04/vegelite/index.php?route=product/category&amp;path=18&amp;page=2">2</a></li>
                                    <li><a href="https://opencart.mahardhi.com/MT04/vegelite/index.php?route=product/category&amp;path=18&amp;page=3">3</a></li>
                                    <li><a href="https://opencart.mahardhi.com/MT04/vegelite/index.php?route=product/category&amp;path=18&amp;page=2">&gt;</a></li>
                                    <li><a href="https://opencart.mahardhi.com/MT04/vegelite/index.php?route=product/category&amp;path=18&amp;page=3">&gt;|</a></li>
                                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCategoryProduct;
