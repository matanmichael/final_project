import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectcats,
  getcatsAsync,
  savecatAsync,
  removecatAsync,
  updatecatAsync,
} from "./categorySlice";
import { selectToken } from "../login/loginSlice";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectcats);
  const [desc, setdesc] = useState("");
  const myToken = useSelector(selectToken);
  const [newdesc, setnewdesc] = useState("");
  
  useEffect(() => {
    dispatch(getcatsAsync());
  }, [categories]);

  return (
    <div style={{ backgroundColor: "grey" }}>
      <h3>Store Categories: {categories.length}</h3>
      <br />
      {categories.map((cat) => (
        <>
          <NavLink
            className="btn btn-light"
            key={cat._id}
            to={`/categories/${cat._id}`}
          >
            {" "}
            {cat.desc}{" "}
          </NavLink>{" "}
          
          {myToken && (
            <input key={cat._id}
              value={newdesc}
              placeholder="desc update"
              onChange={(event) => setnewdesc(event.target.value)}
            ></input>
          )}
          {myToken && (
            <button key={cat._id}
              onClick={() =>
                dispatch(
                  updatecatAsync({
                    desc: newdesc,
                    userToken: myToken,
                    categoryId: cat._id,
                  })
                )
              }
            >
              Update
            </button>
          )}
          {myToken && (
            <button key={cat._id}
              onClick={() =>
                dispatch(
                  removecatAsync({
                    categoryId: cat._id,
                    userToken: myToken,
                  })
                )
              }
            >
              delete
            </button>
          )}
        </>
      ))}
      <br />

      <div>
        {myToken && (
          <input 
            value={desc}
            placeholder="desc name"
            onChange={(event) => setdesc(event.target.value)}
          ></input>
        )}
        {myToken && (
          <button
            onClick={() =>
              dispatch(savecatAsync({ desc: desc, userToken: myToken }))
            }
          >
            Add New Category
          </button>
        )}
      </div>
      <hr></hr>
      <Outlet></Outlet>
    </div>
  );
};

export default Category;
