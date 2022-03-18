import React from 'react'

function BlogItem({blog}) {
    return (
        <div className="bg-white relative" >
            <div className=" overflow-hidden" >
               <img className="transform hover:scale-105 transition-transform duration-1000 w-full" style={{height:"250px"}}  src={blog.image} alt="#"/>
               <div className="absolute top-0 left-0 flex items-center justify-center text-white bg-yellow-400 w-40 h-12 rounded-tr-full rounded-br-full ">{blog.createdAt}</div>
            </div>
            <div className="py-5 px-5 border-dashed border border-gray-300" >
                <div className="py-3 hover:text-yellow-400 text-xl">{blog.title}</div>
                <div className="py-3 w-full">{blog.content}</div>
                <button className="bg-black text-xs hover:bg-yellow-400 w-30 h-10 text-white flex items-center justify-center rounded-full py-3 px-6 ">READ MORE</button>
            </div>
        </div>
    )
}

export default BlogItem
