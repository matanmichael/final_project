import { useDispatch, useSelector } from "react-redux";
import { getallprodsAsync, selectproducts } from "./productSlice";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Row, Col } from "react-bootstrap";
import {
  addItemToCart,
  selectMyCart,
 
} from "../cart/cartSlice";
import Button from "react-bootstrap/Button";
import MyCart from '../cart/MyCart'
const ProductsList = () => {
  const allProducts = useSelector(selectproducts);
  const myCart = useSelector(selectMyCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallprodsAsync());
  }, []);

  return (
    <div>
      <h3 className="w3-container w3-center">All Store Products</h3>
      <Row>
        {allProducts.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
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
      </Row>
      <hr></hr>
      <MyCart></MyCart>
    </div>
  );
};

export default ProductsList;
