import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myCart: (JSON.parse(localStorage.getItem("myCart"))) ? (JSON.parse(localStorage.getItem("myCart"))) : ([]),
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemInCart = state.myCart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.myCart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("myCart", JSON.stringify(state.myCart))

    },
    incrementQuantity: (state, action) => {
      const item = state.myCart.find((item) => item._id === action.payload);
      item.amount++
      localStorage.setItem("myCart", JSON.stringify(state.myCart))
    },
    decrementQuantity: (state, action) => {
      const item = state.myCart.find((item) => item._id === action.payload);
      if (item.amount === 1) {
        item.amount = 1
      } else {
        item.amount--
        
      }
      localStorage.setItem("myCart", JSON.stringify(state.myCart))
    },
    deleteCart: (state, action) => {
      state.myCart = ([])
      localStorage.clear()
      

    },
    removeItemFromCart: (state, action) => {
      state.myCart = state.myCart.filter(x => x._id !== action.payload)
      localStorage.setItem("myCart", JSON.stringify(state.myCart))   

    },
    
  },

  extraReducers: (builder) => {

  },
});


export const {addItemToCart,incrementQuantity,decrementQuantity,deleteCart,removeItemFromCart } = cartSlice.actions;



export const selectMyCart = (state) => state.cart.myCart;


export default cartSlice.reducer;
