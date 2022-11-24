import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getprods,saveprod,removeprod, updateprod, getallprods } from './productAPI';

// State - data (init)
const initialState = {
    myProds: []
};
// async (1)
// simple async method (component can call it...)
export const getprodsAsync = createAsyncThunk(
    'product/getprods',
    async (catId) => {
        const response = await getprods(catId);
        return response.data;
        
    }
);
export const getallprodsAsync = createAsyncThunk(
    'product/getallprods',
    async () => {
        const response = await getallprods();
        return response.data;
        
    }
);
export const saveprodAsync = createAsyncThunk(
    'product/saveprod',
    async (newProduct) => {
        const response = await saveprod(newProduct);
        return response.data;
        
    }
);
export const removeprodAsync = createAsyncThunk(
    "product/removeprod",
    async (id) => {
    const response = removeprod(id);
    return id;
    }
  );
export const updateprodAsync = createAsyncThunk(
    'product/updateprod',
    async (updateProduct) => {
    console.log(updateProduct)
    const response = await updateprod(updateProduct);
    return response.data;
  }
  );

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
       
    },
    //  async  (3)
    //   happens when async done - callback
    extraReducers: (builder) => {
        builder
            .addCase(getprodsAsync.fulfilled, (state, action) => {
                state.myProds= action.payload
                state.status = "idle";
            })
            .addCase(getallprodsAsync.fulfilled, (state, action) => {
                state.myProds= action.payload
                state.status = "idle";
            })
            .addCase(saveprodAsync.fulfilled, (state, action) => {
                state.myProds.push(action.payload);
                state.status = "idle";
            })
            .addCase(removeprodAsync.fulfilled, (state, action) => {
                state.myProds = state.myProds.filter(
                (prod) => prod._id !== action.payload);
                state.status = "idle";
            })
            .addCase(updateprodAsync.fulfilled, (state, action) => {
                state.myProds.find((x) => x.id === action.payload.id);
                state.status = 'Done';
              },);
    },
});

// export sync method
export const {  } = productSlice.actions;

// export any part of the state
export const selectproducts = (state) => state.product.myProds;
// export the reducer to the applicaion
export default productSlice.reducer;
