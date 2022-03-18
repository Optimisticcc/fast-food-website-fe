import React, { useEffect, useState } from "react";
import moment from "moment";
import BreadCrumb from "components/BreadCrumb";
import AsideAccount from "components/Aside/AsideAccountInside"
import { getAllOrder, getFilterOrder } from "api/orderApi";
import { formatCurrency } from "app/format";
import { Collapse } from "react-collapse";
import { getMe } from "../Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";

HistoryPurchase.propTypes = {};

function DropDownItem( {order} ) {

    const [isExpanded, setExpanded] = useState(false);

    return (
        <div className="order-item" style={{marginBottom: "15px"}}>
            <div className="rounded-t mb-0 px-4 py-3 border-0" style={{border: "1px dashed #dddddd"}}>
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 
                        className="font-semibold text-base text-blueGray-700"
                        style={{display: "flex", justifyContent: "space-between", fontWeight: "lighter"}}
                        >
                            <span>ID: {order.id} </span>
                            <span>Day: {moment(order.createdAt).format('DD/MM/YYYY')}</span>
                            <span>Total: {formatCurrency(order.total)}</span>
                            <span>Status: {order.orderStatus && order.orderStatus == 1 ? "Completed" : "Pending"}</span>
                            <span
                            className="cursor-pointer" 
                            style={{color: "blue", textDecoration: "underline"}} 
                            onClick= {() => setExpanded((prevExpanded) => !prevExpanded)}
                            >
                                Detail
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
            <Collapse isOpened={isExpanded} expandStyles={{transition: "all 0.5s ease"}}>
                <div className="block w-full overflow-x-auto" style={{border: "1px dashed #dddddd", borderTop: "none"}}>
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Image
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Name product
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Price
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Quantity
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Total
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {order.orderItems.map((item, index) => (
                            <tr key={index}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                <img
                                    src={item.Product.images[0].source}
                                    style={{ width: "100px" }}
                                />
                                </th>
                                <td className="capitalize-first border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                {item.Product.name}
                                </td>
                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {formatCurrency(item.Product.price)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {item.quantity}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {formatCurrency(
                                    item.quantity * item.Product.price
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Collapse>
        </div>
    );
}

function HistoryPurchase() {
    const [orderList,setOrderList] = useState([]);
    const user = useSelector((state) => state.me.user);

    useEffect(() => {
        async function fetchOrderList() {
          try {
              console.log(user.id)
            const params = {
                customerId: user.id
            }
            const actionMe = await getFilterOrder(params)
            .then(response => {
            console.log("🚀 ~ file: index.jsx ~ line 110 ~ fetchOrderList ~ response", response)
                setOrderList(response.data);
            });
          } 
          catch (error) {
            console.log("Failed to fetch order list: ", error);
          }
        };
    
        fetchOrderList();
    }, [user]);
    return (
        <div className="history-purchase-main">
            <div className="container">
                <BreadCrumb currentPage="history purchase"/>
            </div>

            <div className="container">
                <div className="row">
                    <aside id="column-left" className="col-sm-3">
                        <AsideAccount />
                    </aside>
                    <div id="content" className="col-sm-9">
                        <div class="row category-row">
                            <div className="col-sm-12" style={{maxHeight: "600px", overflow: "auto"}}>
                                <div className="well" style={{overflow: "auto"}}>
                                    <h2 style={{marginLeft: "15px"}}>History orders</h2>
                                    <div className="form-horizontal">
                                        {orderList.map((order)=>{
                                            return (
                                                <DropDownItem order={order} />
                                            );
                                        })}
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

export default HistoryPurchase;
