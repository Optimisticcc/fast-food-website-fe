import React, { useState, useEffect } from 'react'
import BreadCrumb from "components/BreadCrumb";
import {useParams} from "react-router-dom";
import { getBlogBySlug } from "api/blogApi";
import { getAllImage } from "api/imageApi";
import Aside from "components/Aside/AsideBlogs";

function BlogDetail() {
    const {slug} = useParams();
    const [blog, setBlog] = useState({});
    const [source, setSource] = useState("");
    const [filter, setFilter] = useState({
        pageNo: 1,
        pageSize: 4,
    });

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const params = slug;
                console.log(slug);
                const response = await getBlogBySlug(params);
                setBlog(response.data);
                setSource(response.data.image.source);
            } 
            catch (error) {
                console.log('Failed to fetch blog: ', error);
            }
        }
        fetchBlog();
    }, []);

    const onCategoryChange = (value) => {
        setFilter({ ...filter, ProductCategory: value });
    };

    return (
        <div className="blog-detail-main">
            <div className="container">
                <BreadCrumb currentPage={blog.title} lastPage="blogs"/>
            </div>

            <div className="container">
                <div className="row">
                    <div id="content" className="col-sm-9">
                        <div className="row">
                            <div class="col-sm-12 clearfix">						
                                <div class="thumbnails">				            
                                    <img src={source ? source : ""} title={blog.title} alt={blog.title} style={{width: "100%"}}/>
                                </div>
				        	</div>

                            <div className="col-sm-12 clearfix">
                                <div class="caption-blog blog-block">
                                    <div class="date-comment">
                                        <i class="fa fa-calendar-o"></i>
                                        <span class="day">
                                        {(new Date(blog.createdAt)).toLocaleString()}
                                        </span>
                                    </div>					
                                    <div class="singblog-description blog-text" dangerouslySetInnerHTML={{__html: blog.content}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside id="column-right" className="col-sm-3">
                        <Aside filter={true} handleChange={onCategoryChange}/>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;