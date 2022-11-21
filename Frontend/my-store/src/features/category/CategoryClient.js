import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectcats, getcatsAsync } from "./categorySlice";
import { selectToken } from "../login/loginSlice";

const CategoryClient = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectcats);
  const myToken = useSelector(selectToken);

  useEffect(() => {
    dispatch(getcatsAsync());
  }, []);

  return (
    <div>
      <h3>Store Categories</h3>
      <br />
      {categories.map((cat) => (
        <NavLink
          className="btn btn-dark"
          key={cat._id}
          to={`/categories/${cat._id}`}
        >
          {cat.desc}
        </NavLink>
      ))}
      <hr></hr>
      <Outlet></Outlet>
    </div>
  );
};
export default CategoryClient;
