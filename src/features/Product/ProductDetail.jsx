import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "components/BreadCrumb";
import {
  getProductByCode,
  getAllProduct,
  getProductByCategory,
} from "api/productApi";
import Slider from "react-slick";
import { formatCurrency } from "app/format";
import { addToCard } from "features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

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

function ProductDetail() {
  const slideRef = useRef();
  const slideRef2 = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
  };
  const setting2 = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const setting3 = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const { code } = useParams();
  const [pictures, setPictures] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentPic, setCurrentPic] = useState({});
  const [amount, setAmount] = useState(1);
  const [relateProduct, setRelateProduct] = useState([]);
  const [currentDm, setcurrentDm] = useState();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = code;
        const response = await getProductByCode(params);
        setProductList(response.data);
        setPictures(response.data.images);
        setCurrentPic(response.data.images[0]);
        setcurrentDm(response.data.ProductCategory.id);
        const response2 = await getAllProduct({
          ProductCategory: response.data.ProductCategory.id,
        });
        console.log("🚀 ~ file: ProductDetail.jsx ~ line 144 ~ fetchProductList ~ response2", response2)

        setRelateProduct(
          response2.data.filter((p) => p.id != response.data.id)
        );
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  }, [code]);

  const handleChangeImage = (picture) => {
    setCurrentPic(picture);
  };

  const handleAmount = (number) => {
    console.log("🚀 ~ file: ProductDetail.jsx ~ line 162 ~ handleAmount ~ productList.quantity", productList.quantity)
    if (number > 0 && amount < productList.quantity) {
      
      setAmount((prev) => prev + number);
    }
    if (number < 0 && amount > 1) {
      setAmount((prev) => prev + number);
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = (product) => {
  
    if (product.quantity > 0) {
      dispatch(addToCard({ ...product, quantityAdd: amount }));
      history.push("/cart");
    }
  };

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const handleModal = (value) => {
    setCurrentProduct(value);
    setPictures(value.images);
    setCurrentPic(value.images[0]);
    setOpen(true);
    console.log(value.quantity);
  };
  const [amount1, setAmount1] = useState(1);
  const handleAmount1 = (number) => {
    if (number > 0 && amount1 < currentProduct.quantity) {
      setAmount1((prev) => prev + number);
    }
    if (number < 0 && amount1 > 1) {
      setAmount1((prev) => prev + number);
    }
  };
  const handleAddToCart1 = (product) => {
  
    if (product.quantity > 0) {
      dispatch(addToCard({ ...product, quantityAdd: amount1 }));
      history.push("/cart");
    }
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div className="product-detail-main">
      <div className="container">
        <BreadCrumb currentPage={productList.name} lastPage="food" />
      </div>

      <div id="product-page" className="container">
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
                          style={{ maxHeight: "544px" }}
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
                          {pictures.length > 5 ? (
                            <Slider ref={slideRef} {...settings}>
                              {pictures.map((picture, index) => {
                                return (
                                  <ImageInSlider
                                    picture={picture}
                                    handleChangeImage={handleChangeImage}
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
                          {/* list ảnh của product */}
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
                  <h1 class="">{productList.name}</h1>

                  <hr />

                  <ul class="list-unstyled">
                    <li>
                      <span class="disc">Product Code:</span>
                      <span class="disc1"> {productList.code}</span>
                    </li>
                    <li>
                      <span class="disc">Availability:</span>
                      <span class="disc1">
                        {" "}
                        {productList.quantity > 0
                          ? `In stock (${productList.quantity})`
                          : "Out stock"}
                      </span>
                    </li>
                  </ul>

                  <hr />
                  <ul class="list-unstyled">
                    <li>
                      <span class="pro_price">
                        {formatCurrency(productList.price)}
                      </span>
                    </li>
                  </ul>

                  <hr />

                  <div id="product" class="product-options">
                    <div class="form-group">
                      <label class="control-label qty" for="input-quantity">
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
                        <input type="hidden" name="product_id" value="35" />
                        <button
                          type="button"
                          id="button-cart"
                          onClick={() => handleAddToCart(productList)}
                          data-loading-text="Loading..."
                          class="btn btn-primary btn-lg btn-block"
                          disabled={productList.quantity > 0 ? false : true}
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
                        __html: productList.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-10 ">
              <p className=" xl:text-3xl">Relate product</p>
              <div>
                <div>
                  <div className="relative">
                    <div className="h-12 py-5 relative">
                      <div className="absolute top-0 right-0 space-x-3 mx-4">
                        <button
                          className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
                          onClick={() => slideRef2?.current?.slickPrev()}
                        >
                          <i className="fa fa-angle-left"></i>
                        </button>
                        <button
                          className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
                          onClick={() => slideRef2?.current?.slickNext()}
                        >
                          <i className="fa fa-angle-right"></i>
                        </button>
                      </div>
                    </div>
                    {relateProduct.length > 4 ? (
                      <Slider ref={slideRef2} {...setting2} className="space">
                        {relateProduct.map((product) => (
                          <div key={product.id} className="px-4">
                            <div className="bg-white relative">
                              <div className=" aspect-w-1 aspect-h-1 group ">
                                <img
                                  className=""
                                  src={product.images[0].source}
                                  alt={product.name}
                                />
                                {product.quantity < 1 && (
                                  <div className="absolute top-6 left-1 ">
                                    <span className="text-red-500">
                                      Out stock
                                    </span>
                                  </div>
                                )}
                                <div className=" absolute  opacity-0 group-hover:opacity-100 flex transition-all duration-500 flex-wrap items-center justify-center ">
                                  <div className="text-center">
                                    <button
                                      className="bg-red-500 hover:bg-yellow-300 w-10 h-10 flex items-center justify-center rounded-full"
                                      onClick={() => handleModal(product)}
                                    >
                                      <i className="fas fa-eye" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <button
                                className="bg-yellow-300 hover:bg-red-500 w-10 h-10 flex items-center justify-center rounded-full absolute right-4 top-4"
                                onClick={() => handleAddToCart(product)}
                              >
                                <i className="fas fa-cart-plus" />
                              </button>
                              <div className="py-5 px-5">
                                <div className="hover:text-yellow-400 text-lg text-center capitalize-first h-14">
                                  <Link to={`/products/${product.code}`}>
                                    {product.name}
                                  </Link>
                                </div>
                                <div className=" text-center">
                                  {formatCurrency(product.price)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <>
                        <Slider ref={slideRef2} {...setting3} className="space">
                          {relateProduct.map((product) => (
                            <div key={product.id} className="px-4 ">
                              <div className="bg-white relative">
                                <div className=" aspect-w-1 aspect-h-1 group ">
                                  <img
                                    className=""
                                    src={product.images[0].source}
                                    alt={product.name}
                                  />
                                  {product.quantity < 1 && (
                                    <div className="absolute top-6 left-1 ">
                                      <span className="text-red-500">
                                        Out stock
                                      </span>
                                    </div>
                                  )}
                                  <div className=" absolute  opacity-0 group-hover:opacity-100 flex transition-all duration-500 flex-wrap items-center justify-center ">
                                    <div className="text-center">
                                      <button
                                        className="bg-red-500 hover:bg-yellow-300 w-10 h-10 flex items-center justify-center rounded-full"
                                        onClick={() => handleModal(product)}
                                      >
                                        <i className="fas fa-eye" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="bg-yellow-300 hover:bg-red-500 w-10 h-10 flex items-center justify-center rounded-full absolute right-4 top-4"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <i className="fas fa-cart-plus" />
                                </button>
                                <div className="py-5 px-5">
                                  <div className="hover:text-yellow-400 text-xl text-center capitalize-first h-14">
                                    <Link to={`/products/${product.code}`}>
                                      {product.name}
                                    </Link>
                                  </div>
                                  <div className=" text-center">
                                    {formatCurrency(product.price)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </>
                    )}
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
                                          style={{
                                            transition: "all 0.25s ease 0s",
                                          }}
                                        >
                                          {pictures.length > 5 ? (
                                            <Slider
                                              ref={slideRef}
                                              {...settings}
                                            >
                                              {pictures.map(
                                                (picture, index) => {
                                                  return (
                                                    <ImageInSlider
                                                      picture={picture}
                                                      handleChangeImage={
                                                        handleChangeImage
                                                      }
                                                      key={index}
                                                    />
                                                  );
                                                }
                                              )}
                                            </Slider>
                                          ) : (
                                            <>
                                              {pictures.map(
                                                (picture, index) => {
                                                  return (
                                                    <div
                                                      class="owl-item"
                                                      style={{ width: "108px" }}
                                                      key={index}
                                                    >
                                                      <div class="image-additional">
                                                        <a
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() => {
                                                            handleChangeImage(
                                                              picture
                                                            );
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
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      <div class="owl-nav">
                                        <div
                                          class="owl-prev"
                                          onClick={() =>
                                            slideRef?.current?.slickPrev()
                                          }
                                        >
                                          <i class="fa fa-angle-left"></i>
                                        </div>
                                        <div
                                          class="owl-next"
                                          onClick={() =>
                                            slideRef?.current?.slickNext()
                                          }
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
                                      <span class="disc1">
                                        {" "}
                                        {currentProduct?.code}
                                      </span>
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
                                                handleAmount1(-1);
                                              }}
                                            >
                                              <i class="fa fa-minus"></i>
                                            </button>
                                            <input
                                              type="text"
                                              name="quantityAdd"
                                              value={amount1}
                                              size="2"
                                              id="input-quantity"
                                              class="form-control"
                                            />
                                            <button
                                              class="w-10 h-10 flex items-center justify-center rounded-full border-dashed"
                                              onClick={() => {
                                                handleAmount1(1);
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
                                            handleAddToCart1(currentProduct)
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

                            <div
                              className="col-sm-12"
                              style={{ marginBottom: "50px" }}
                            >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
