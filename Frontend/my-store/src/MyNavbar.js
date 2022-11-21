import React from "react";
import { Link } from "react-router-dom";
import {
  doSigninAsync,
  selectEmail,
  selectUserName,
  selectToken,
  doSignupAsync,
  doSignOutAsync,
  selectAdmin,
} from "./features/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";
const MyNavbar = () => {
  const isAdmin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/productlist">All Store Products</Link>
              </li>
              <li>
                <Link to="/categories">Products By Category</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">
                  <span className="glyphicon glyphicon-user"></span> Your
                  Account
                </Link>
              </li>
              <li>
                <Link to="cart">
                  <span className="glyphicon glyphicon-shopping-cart"></span>{" "}
                  Cart
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="admin">
                    <span></span> Admin
                  </Link>
                </li>
              )}
              {token && (
                <li>
                  <Link to="order">
                    <span></span> my orders
                  </Link>
                </li>
              )}
              {token && (
                <li>
                  <button className="btn btn-info btn-lg" onClick={() => dispatch(doSignOutAsync({ token }))}>
                  <span class="glyphicon glyphicon-log-out"></span>Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MyNavbar;
