import React from 'react'
import { useHistory } from "react-router-dom";

function CustomATag({page}) {
    let history = useHistory();
    return (
        <>
            <i className="fa fa-angle-double-right" aria-hidden="true" style={{paddingLeft:"10px", paddingRight:"10px", opacity: "0.8"}}></i>
            <li>
                <a style={{cursor: "pointer"}} onClick={()=>{history.push(`/${page == "food" ? "products" : page}`);}}>
                    {page}
                </a>
            </li>
        </>
    );
}

function BreadCrumb({currentPage, lastPage}) {
    let history = useHistory();
    return (
        <div className="breadcrumb-back">
            <h2 className="page_title">{currentPage}</h2>
            <ul className="breadcrumb">
				<li>
                    <a style={{cursor: "pointer"}} onClick={()=>{history.push("/");}}>
                        Home
                    </a>
                </li>
                {lastPage ? <CustomATag page={lastPage} /> : null}
                <i className="fa fa-angle-double-right" aria-hidden="true" style={{paddingLeft:"10px", paddingRight:"10px", opacity: "0.8"}}></i>
				<li><a>{currentPage}</a></li>
			</ul>
        </div>
    );
}

export default BreadCrumb;