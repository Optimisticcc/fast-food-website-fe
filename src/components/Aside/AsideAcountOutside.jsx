import React from "react";
import { Link } from "react-router-dom";

function AsideAccountOutside() {
	return (
		<div className="category-list">
            <div className="box-category">
                <h3 className="toggled relative">ACCOUNT</h3>
                <ul className="list-unstyled parent" id="selectMe-desk">
                    <li className="">
                        <Link to="/account/login" className="list-group-item">
                            login
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/account/register" className="list-group-item">
                            register
                        </Link>
                    </li>
                </ul>
	        </div>
        </div>
	);
}

export default AsideAccountOutside;