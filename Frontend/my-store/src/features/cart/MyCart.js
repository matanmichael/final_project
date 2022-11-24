import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  deleteCart,
  selectMyCart,
  removeItemFromCart,
} from "../cart/cartSlice";
import Button from "react-bootstrap/Button";
import { sendorderAsync } from "../order/orderSlice";
import { selectToken } from "../login/loginSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
const MyCart = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = useSelector(selectToken);
  const myCart = useSelector(selectMyCart);
  const dispatch = useDispatch();
  const notify = () => toast("Thank you, your order will be delivered");
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    myCart.forEach((item) => {
      totalQuantity += item.amount;
      totalPrice += item.price * item.amount;
    });
    return { totalPrice, totalQuantity };
  };
  
  return (
    
      <div>
        <h3>CART</h3>
        {myCart &&
          myCart.map((product) => (
            <div>
              <Col key={product._id} sm={2} md={2} lg={2} xl={2} >
              <Card style={{ width: "20rem" }} >
                <Card.Img src={`http://127.0.0.1:8000/static${product.image}`} />
                <Card.Body>
                  <Card.Title>{product.desc}</Card.Title>
                  <Card.Title>₪{product.price}</Card.Title>
                  <Card.Text>
                  <Button onClick={() => dispatch(decrementQuantity(product._id))}>
                -
              </Button>
               AMOUNT: {product.amount}
          
              <Button onClick={() => dispatch(incrementQuantity(product._id))}>
                +
              </Button>
              <Button
                variant="danger"
                onClick={() => dispatch(removeItemFromCart(product._id))}
              >
                x
              </Button>
                  </Card.Text>
              
                </Card.Body>
              </Card>
              </Col>
            </div>
          ))}
          <hr></hr>
        <div className="w3-container w3-center">
          total ({getTotal().totalQuantity} items) :{" "}
          <strong> ₪ {getTotal().totalPrice}</strong>
        
        
        <Button variant="primary" onClick={handleShow}>
          Go To Check Out{" "}
        </Button>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {myCart &&
              myCart.map((product) => (
                <div>
                  <Button
                    onClick={() => dispatch(decrementQuantity(product._id))}
                  >
                    -
                  </Button>
                  DESC: {product.desc} AMOUNT: {product.amount} PRICE: ₪{" "}
                  {product.price}
                  <Button
                    onClick={() => dispatch(incrementQuantity(product._id))}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(removeItemFromCart(product._id))}
                  >
                    x
                  </Button>
                </div>
              ))}
            <p className="total__p">
              total ({getTotal().totalQuantity} items) :{" "}
              <strong> ₪ {getTotal().totalPrice}</strong>
            </p>
            <br></br>
            <Button
              variant="success"
              onClick={() => {
                {
                  notify();
                }
                dispatch(
                  sendorderAsync({ myCart, userToken: token }),
                  dispatch(deleteCart())
                );
              }}
            >
              send order <ToastContainer />
            </Button>
            <Button variant="danger" onClick={() => dispatch(deleteCart())}>
              CLEAR CART
            </Button>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    
  );
};

export default MyCart;
