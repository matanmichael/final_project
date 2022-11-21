import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderDetailAsync,
  
  selectOrderDetail,
} from "./orderSlice";
import { selectToken } from "../login/loginSlice";
import {  useParams } from "react-router-dom";

export function OrderDetails() {
  const orderDetail = useSelector(selectOrderDetail);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  let params = useParams();
  let order_id = params.id;

  useEffect(() => {
    dispatch(getOrderDetailAsync({ id: order_id, token: token }));
  }, [order_id]);

  return (
    <div>
      <h3>Order detail</h3>
      {orderDetail.map((order) => (
        <div>
          Product: {" "}{order.prod_id}{" "} Amount:{" "}{order.amount}{" "} Total:{" "} {order.total}
        </div>
      ))}

    </div>
  );
}
export default OrderDetails;
