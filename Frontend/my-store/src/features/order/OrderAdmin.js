import React, { useEffect } from "react";
import {getOrdersAsync,selectorders,delDataAsync} from './orderSlice'
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../login/loginSlice";
const OrderAdmin = () => {
    const orders = useSelector(selectorders)
    const dispatch= useDispatch()
    const token = useSelector(selectToken)

    useEffect(() => {
        dispatch(getOrdersAsync(token));
      }, []);
  return (
    <div>{orders.map(orders=><div>order id:{" "}{orders._id} user id:{" "}{orders.user_id}  <button onClick={() => dispatch(delDataAsync({
      Id: orders._id,
      userToken: token
    }))}>
    Remove
  </button></div>)}</div>
  )
}

export default OrderAdmin