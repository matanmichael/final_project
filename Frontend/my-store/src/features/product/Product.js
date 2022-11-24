import { useDispatch, useSelector } from "react-redux";
import {
  getallprodsAsync,
  selectproducts,
  saveprodAsync,
  removeprodAsync,
  updateprodAsync,
} from "./productSlice";
import React, { useEffect, useState } from "react";
import { selectToken } from "../login/loginSlice";
import Button from "react-bootstrap/Button";

const Product = () => {
  const allProducts = useSelector(selectproducts);
  const dispatch = useDispatch();
  const myToken = useSelector(selectToken);
  const [desc, setdesc] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [cat_id, setcat_id] = useState();
  const [price, setprice] = useState();
  const [newprice, setnewprice] = useState()
  
  useEffect(() => {
    dispatch(getallprodsAsync());
  }, [allProducts]);
  
  
  return (
    <div>
      <h3 className="w3-container w3-center">Store Products: {allProducts.length}</h3>
      
      <div style={{ display: "flex" }}>
        {allProducts.map((prod) => (
          <div
            className="card"
            key={prod._id}
            style={{
              backgroundColor: "RoyalBlue",
              width: "200px",
            }}
          >
            <img src={`http://127.0.0.1:8000/static${prod.image}`} />

            <div className="card-body">
              <h5 className="card-title">{prod.desc}</h5>
              <p>Prodduct ID:{prod._id}</p>
              <p>Category ID:{prod.cat_id}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"> PRICE: {prod.price}</li>
             
            </ul>
            <div className="card-body"></div>
            {myToken && (
              <input
                key={prod._id}
                value={newdesc}
                placeholder="desc update"
                onChange={(event) => setnewdesc(event.target.value)}
              ></input>
            )}
             {myToken && (
              <input
                key={prod._id}
                value={newprice}
                placeholder="price update"
                onChange={(event) => setnewprice(event.target.value)}
              ></input>
            )}
            {myToken && (
              <Button
              variant="success"
                key={prod._id}
                onClick={() =>
                  dispatch(
                    updateprodAsync({
                      price:newprice,
                      desc: newdesc,
                      userToken: myToken,
                      id: prod._id,
                      cat_id:prod.cat_id
                    
                    
                    })
                  )
                }
              >
                Update
              </Button>
              
            )}
            {myToken && (
              <Button
              variant="danger"
                key={prod._id}
                onClick={() =>
                  dispatch(
                    removeprodAsync({
                      productId: prod._id,
                      userToken: myToken,
                    })
                  )
                }
              >
                delete
              </Button>
            )}
          </div>
        ))}
      </div>
      <div>
        <h3>add new product</h3>
        {myToken && (
          <input
            value={desc}
            placeholder="desc name"
            onChange={(event) => setdesc(event.target.value)}
          ></input>
        )}
        {myToken && (
          <input
            value={cat_id}
            placeholder="category id"
            onChange={(event) => setcat_id(event.target.value)}
          ></input>
        )}
        {myToken && (
          <input
            value={price}
            placeholder="price"
            onChange={(event) => setprice(event.target.value)}
          ></input>
        )}
      
        {myToken && (
          <button
            onClick={() =>
              dispatch(
                saveprodAsync({
                  desc: desc,
                  cat_id_id: cat_id,
                  price: price,
                  userToken: myToken,
                  
                })
              )
            }
          >
            Add New Product
          </button>
        )}
      </div>
  
     
     
    </div>
  );
};
export default Product;
