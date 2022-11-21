import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyCart from "./features/cart/MyCart";
import Login from "./features/login/Login";
import About from "./About";
import ProductsList from "./features/product/ProductsList";
import ProductByCat from "./features/product/ProductByCat";
import CategoryClient from "./features/category/CategoryClient";
import AdminPage from "./AdminPage";
import HomePage from "./HomePage";
import Register from "./features/login/Register";
import Order from "./features/order/Order";
import OrderDetails from "./features/order/OrderDetails";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
          <Route path="/" element={<HomePage />}/>
            <Route path="/productlist" element={<ProductsList />} >
            <Route path="/productlist/cart" element={<MyCart />} />
            </Route>
            <Route path="/about" element={<About />} />
            
            <Route path="/categories" element={<CategoryClient />}>
              <Route path=":id" element={<ProductByCat />} />
            </Route>
            <Route path="/login" element={<Login />} >
              <Route path="/login/register" element={<Register/>}/>
            </Route>

            <Route path="/cart" element={<MyCart />} />
            <Route path="/order" element={<Order />} >
            <Route path=":id" element={<OrderDetails />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
