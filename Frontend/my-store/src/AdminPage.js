import React from 'react'
import Product from './features/product/Product'
import Category from './features/category/Category'
import Register from './features/login/Register'
import OrderAdmin from './features/order/OrderAdmin'
const AdminPage = () => {
  return (
    <div><Category></Category><Product></Product><Register></Register><OrderAdmin></OrderAdmin></div>
  )
}

export default AdminPage