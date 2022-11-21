import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getcats,savecat,removecat,updatecat} from './categoryAPI';

// State - data (init)
const initialState = {
    myCats: []
};

export const getcatsAsync = createAsyncThunk(
    'category/getcats',
    async () => {
        const response = await getcats();
        return response.data;
    }
);
export const savecatAsync = createAsyncThunk(
    'category/savecat',
    async (newCategory) => {
        const response = await savecat(newCategory);
        return response.data;
        
    }
);
export const removecatAsync = createAsyncThunk(
    "category/removecat",
    async (id) => {
    const response = removecat(id);
    return id;
    }
  );
export const updatecatAsync = createAsyncThunk(
    'category/updatecat',
    async (updateCategory) => {
    const response = await updatecat(updateCategory, updateCategory.id);
    return response.data;
  }
  );

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
     
    extraReducers: (builder) => {
        builder
            .addCase(getcatsAsync.fulfilled, (state, action) => {
                state.myCats= action.payload
                state.status = "idle";
            })
            .addCase(savecatAsync.fulfilled, (state, action) => {
                state.myCats.push(action.payload);
                state.status = "idle";
            })
            .addCase(removecatAsync.fulfilled, (state, action) => {
                state.myCats = state.myCats.filter(
                (cat) => cat._id !== action.payload);
                state.status = "idle";
            })
            .addCase(updatecatAsync.fulfilled, (state, action) => {
                let updDesc = state.myCats.find((cat) => cat._id === action.payload);
                updDesc.desc = action.payload;
                state.status = 'idle';
                
              },);
    },
});


export const {  } = categorySlice.actions;

export const selectcats = (state) => state.category.myCats;

export default categorySlice.reducer;
