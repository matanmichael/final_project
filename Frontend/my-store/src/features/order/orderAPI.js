import axios from "axios";

const URL_Add_Order = "http://127.0.0.1:8000/addorder/";
const SERVER_URL_GET_ORDER = "http://127.0.0.1:8000/getordersforuser/";
const SERVER_URL_GET_ORDER_DETAILS = "http://127.0.0.1:8000/getorderdetails/";
const URL_ALL_ORDERS = "http://127.0.0.1:8000/getorders/";
const SERVER_URL_DELETE = "http://127.0.0.1:8000/deleteorder/";

export function sendorder(newOrder) {
  return new Promise((resolve) =>
    axios
      .post(URL_Add_Order, newOrder.myCart, {
        headers: {
          Authorization: `Bearer ${newOrder.userToken}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
export function getorder(token) {
  return new Promise((resolve) =>
    axios(SERVER_URL_GET_ORDER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function getdetails(id, token) {
  return new Promise((resolve) =>
    axios(SERVER_URL_GET_ORDER_DETAILS + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function getorders(token) {
  return new Promise((resolve) =>
    axios(URL_ALL_ORDERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function removeorder(id) {
  return new Promise((resolve) =>
    axios.delete(SERVER_URL_DELETE + id.Id,{
      headers:{
        'Authorization':`Bearer ${id.userToken}`
    
      }  
    }).then((res) => resolve({ data: res.data }))
  );
} 
