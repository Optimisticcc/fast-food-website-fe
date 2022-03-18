import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import BlogItem from "./BlogItem";
import Blogs from "./Blogs";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { getAllBlog } from "api/blogApi";
import { Link } from "react-router-dom";
import moment from "moment";
BlogSlide.propTypes = {
  listBanner: PropTypes.func,
};
BlogSlide.defaultProps = {
  listBanner: [],
};
function BlogSlide(props) {
  const slideRef = useRef();
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        const response = await getAllBlog();

        setBlogList(response.data);
      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    };

    fetchBlogList();
  }, []);
  const handleClickBlog = (blog) => {
    <Link
      to={`/blogs/${blog.slug}`}
      class="blog-read btn"
      title="Read More"
    ></Link>;
  };
  return (
    <div className="relative">
      <div className="h-12 py-5 relative">
        <div className="absolute top-0 right-0 space-x-3 mx-4">
          <button
            className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
            onClick={() => slideRef?.current?.slickPrev()}
          >
            <i className="fa fa-angle-left"></i>
          </button>
          <button
            className="border-dashed border border-black items-center justify-center rounded-full h-8 w-8 hover:bg-yellow-400 "
            onClick={() => slideRef?.current?.slickNext()}
          >
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
      <Slider ref={slideRef} {...settings} className="space">
        {blogList.map((blog) => (
          <div key={blog._id} className="px-4">
            <div className="bg-white relative">
              <div className=" overflow-hidden">
                <img
                  className="transform hover:scale-105 transition-transform duration-1000 w-full object-cover"
                  style={{ height: "250px" }}
                  src={blog.image.source}
                  alt="#"
                />
                <div className="absolute top-0 left-0 flex items-center text-base justify-center text-white bg-yellow-400 w-36 h-12 rounded-tr-full rounded-br-full ">
                  {moment(blog.createdAt).format("ll")}
                </div>
              </div>
              <div className="py-5 px-5 border-dashed border border-gray-300">
                <div className="py-3 hover:text-yellow-400 text-xl">
                  <Link to={`/blogs/${blog.slug}`} className="limit-text-1line">
                    {blog.title}
                  </Link>
                </div>
                <div className="py-1 mb-6 w-full">
                  {blog.summary.length > 40
                    ? blog.summary.substring(0, 40) + "..."
                    : blog.summary}
                </div>
                <div className="blog-group clearfix">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="blog-read btn"
                    title="Read More"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BlogSlide;
