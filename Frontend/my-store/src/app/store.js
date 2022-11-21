import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/category/categorySlice';
import loginReducer from '../features/login/loginSlice';
import productReducer from '../features/product/productSlice';
import orderReducer from '../features/order/orderSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    category:categoryReducer,
    product:productReducer,
    order:orderReducer,
    cart:cartReducer,
  },
});
