import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderAsync, selectorders } from "./orderSlice";
import { selectToken } from "../login/loginSlice";
import { Outlet, Link } from "react-router-dom";

export function Order() {
  const orders = useSelector(selectorders);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getOrderAsync(token));
  }, []);

  return (
    <div>
      <h3>My last orders</h3>
      {orders.map((order) => (
        <div>
          <Link key={order._id} to={`/order/${order._id}`}>
            Order ID Number : {order._id} Order Date : {order.created_time}{" "}
          </Link>
        </div>
      ))}
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default Order;
