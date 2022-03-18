import React, { useState, useEffect } from 'react'
import BreadCrumb from "components/BreadCrumb";
import Aside from "components/Aside/AsideBlogs";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { getAllBlog } from "api/blogApi";
import qs from "qs";
import moment from 'moment';
function ListBlogByCategory() {
    const [blogList, setBlogList] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const [filter, setFilter] = useState({
      pageNo: 1,
      pageSize: 10,
      BlogCategory: id,
    });
    const [total, setTotal] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const onPageChange = (page) => {
      setFilter({ ...filter, pageNo: page });
    };
  
    const onCategoryChange = (value) => {
      setFilter({ ...filter, BlogCategory: value });
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
  
    useEffect(() => {
      const fetchBlogList = async () => {
        try {
          const response = await getAllBlog({ ...filter });
          setBlogList(response.data);
          setTotal(response.totalPage);
          setTotalCount(response.totalCount);
        } catch (error) {
          console.log("Failed to fetch blog list: ", error);
        }
      };
      let searchStr = "";
      let dmbl = filter.BlogCategory
      searchStr = qs.stringify({ ...filter, BlogCategory: undefined });
      history.push({
        pathname: `/blogs/category/${dmbl}`,
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
      fetchBlogList();
    }, [filter]);
  
    return(
        <div className="list-blog-main">
            <div className="container">
                <BreadCrumb currentPage="blog"/>
            </div>

            <div className="container">
                <div className="row">
                    <div id="content" className="col-sm-9">
                        <div class="row category-row">
                            {blogList.map((blog)=>{
                                return (
                                  <div class="col-sm-6 blog-layout product-list blog-category" key={blog.id}>
                                    <div class="blog-block clearfix">
                                        <div class="blog-info">
                                            <div class="image image-blog">
                                                <Link to={`/blogs/${blog.slug}`} class="blog-img">
                                                    <img src={blog.image.source} alt={blog.title} title={blog.title} class="img-responsive object-cover" style={{height: "280px"}}/>
                                                </Link>
                                                <span class="block-date">
                                                    {moment(blog.CreatedAt).format("ll")}
                                                </span>        
                                            </div>
                                        </div>
                                        <div class="caption-blog caption blog-description">
                                            <div class="caption-thumb">		
                                                <h4 class="blog-title"><Link to={`/blogs/${blog.slug}`} className="limit-text-1line">{blog.title}</Link></h4>
                                                <div class="blog-text limit-text-1line">
                                                    {blog.summary.length > 40 ? blog.summary.substring(0,40) + '...' : blog.summary}
                                                </div>
                                                <div class="blog-group clearfix">	
                                                    <Link to={`/blogs/${blog.slug}`} class="blog-read btn" title="Read More">Read More</Link>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                                );
                            })}    
                        </div>

                        <div className="pro_pagination clearfix">
                          <div className="col-sm-6 text-left">
                            Showing 1 to {blogList.length} of {totalCount} ({total}{" "}
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
                    <aside id="column-right" className="col-sm-3">
                      <Aside 
                        filter={true} 
                        handleChange={onCategoryChange}
                        isCategory={true}
                      />
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default ListBlogByCategory;