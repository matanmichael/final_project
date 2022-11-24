import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn,signUp,signOut } from './loginAPI';
import jwt_decode from "jwt-decode";

// State - data (init)
const initialState = {
    userName: "",
    email: "",
    token: "",
    logged: false,
    admin: false,
    staff: false,
};
// async (1)
// simple async method (component can call it...)
export const doSigninAsync = createAsyncThunk(
    'login/signIn',
    async (request) => {
        const response = await signIn(request);
        return response.data;
    }
);

export const doSignupAsync = createAsyncThunk(
    'login/signUp',
    async (request) => {
        const response = await signUp(request);
        return response.data;
    }
);
export const doSignOutAsync = createAsyncThunk(
    'login/signOut',
    async (token) => {
        const response = await signOut(token);
        return response.data;
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        
    },
  
    extraReducers: (builder) => {
        builder
            .addCase(doSigninAsync.fulfilled, (state, action) => {
                if (action.payload.access) {
                    state.token = action.payload.access
                    state.logged = true;
                    state.userName= jwt_decode(action.payload.access).username
                    state.email=jwt_decode(action.payload.access).email
                    state.admin = jwt_decode(action.payload.access).admin
                    state.staff = jwt_decode(action.payload.access).staff
                }
            }).addCase(doSignupAsync.fulfilled, (state, action) => {
                if (action.payload.access) {
                    
                }
            }).addCase(doSignOutAsync.fulfilled, (state, action) => {
                state.token = ""
                state.logged = false
                state.userName = ""
                state.email = ""
                state.admin= false
                state.staff= false
                    
            });
    },
});


export const { logout,setFullScreen } = loginSlice.actions;
export const selectLogged = (state) => state.login.logged;
export const selectEmail = (state) => state.login.email;
export const selectUserName = (state) => state.login.userName;
export const selectToken = (state) => state.login.token;
export const selectAdmin = (state) => state.login.admin;
export const selectStaff = (state) => state.login.staff;
export default loginSlice.reducer;
