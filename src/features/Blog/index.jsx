import React from 'react'
import blogs from './Blogs'
import BlogItem from './BlogItem'
function BlogCart() {
    return (
        <div>
            <div className=" flex flex-wrap ">
                {blogs.map((blog)=>(
                    <BlogItem key={blog.id} blog={blog}/>
                ))}
            </div>
        </div>
    );
}

export default BlogCart
