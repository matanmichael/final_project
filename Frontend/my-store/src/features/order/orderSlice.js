import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendorder, getorder,getdetails,getorders,removeorder } from "./orderAPI";

// State - data (init)
const initialState = {
  myOrder: [],
  orderDetail:[],
};

export const sendorderAsync = createAsyncThunk(
  "order/sendorder",
  async (newOrder) => {
    const response = await sendorder(newOrder);
    return response.data;
  }
);
export const getOrderAsync = createAsyncThunk(
  "order/getorder",
  async (token) => {
    const response = await getorder(token);
    // console.log(response.data);
    return response.data;
  }
);
export const getOrderDetailAsync = createAsyncThunk(
  "order/getdetails",
  async (payloud) => {
    const response = await getdetails(payloud.id, payloud.token);
    // console.log(response.data);
    return response.data;
  }
);
export const getOrdersAsync = createAsyncThunk(
  "order/getorders",
  async (token) => {
    const response = await getorders(token);
    return response.data;
  }
);
export const delDataAsync = createAsyncThunk('order/removeorder',async (id) => {
  const response = await removeorder(id);
  return id;
}
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  //  async  (3)
  //   happens when async done - callback
  extraReducers: (builder) => {
    builder.addCase(sendorderAsync.fulfilled, (state, action) => {
      state.myCart = [...state.myCart, action.payload];
    })
    .addCase(getOrderAsync.fulfilled, (state, action) => {
      state.status = "Done";
      console.log(action.payload);
      state.myOrder = action.payload;
    })
    .addCase(getOrderDetailAsync.fulfilled, (state, action) => {
      state.status = "Done";
      console.log(action.payload);
      state.orderDetail = action.payload;
    })
    .addCase(getOrdersAsync.fulfilled, (state, action) => {
      state.status = "Done";
      state.myOrder = action.payload;
    })
    .addCase(delDataAsync.fulfilled, (state, action) => {
      state.myOrder = state.myOrder.filter((x) => x.id !== action.payload);
      state.status = "idle";
    })
    
  },
});

// export sync method
export const {} = orderSlice.actions;

// export any part of the state
export const selectorders = (state) => state.order.myOrder;
export const selectOrderDetail = (state) => state.order.orderDetail;
// export the reducer to the applicaion
export default orderSlice.reducer;
