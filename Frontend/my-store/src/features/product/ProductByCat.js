import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getprodsAsync, selectproducts } from "./productSlice";
import React, { useEffect } from "react";
import ProductCardByCat from "./ProductCardByCat";
import { Row, Col } from "react-bootstrap";
import {
  addItemToCart,
  selectMyCart,
  incrementQuantity,
  decrementQuantity,
  deleteCart,
  removeItemFromCart,
} from "../cart/cartSlice";
import Button from "react-bootstrap/Button";

const ProductByCat = () => {
  let params = useParams();
  let catID = params.id;
  const allProducts = useSelector(selectproducts);
  const dispatch = useDispatch();
  const myCart = useSelector(selectMyCart);
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    myCart.forEach((item) => {
      totalQuantity += item.amount;
      totalPrice += item.price * item.amount;
    });
    return { totalPrice, totalQuantity };
  };

  useEffect(() => {
    dispatch(getprodsAsync(catID));
  }, [dispatch, catID]);

  return (
    <div>
      <Row>
        {allProducts.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCardByCat product={product} />
              <Button
                onClick={() =>
                  dispatch(
                    addItemToCart({
                      _id: product._id,
                      desc: product.desc,
                      amount: 1,
                      price: product.price,
                      image: product.image,
                    })
                  )
                }
              >
                ADD TO CART
              </Button>
            </Col>
          );
        })}
        <hr></hr>
        {myCart &&
          myCart.map((product) => (
            <div>
              DESC: {product.desc} PRICE: ₪
              {product.price}
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
            </div>
          ))}
      </Row>
      <p className="total__p">
        total ({getTotal().totalQuantity} items) :{" "}
        <strong>₪ {getTotal().totalPrice}</strong>
      </p>
      <Button variant="danger" onClick={() => dispatch(deleteCart())}>
        clear cart
      </Button>
      <Link to="/cart">
        <Button variant="primary">Go To Cart</Button>
      </Link>
    </div>
  );
};

export default ProductByCat;
