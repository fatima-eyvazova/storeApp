import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: "",
    user: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logoutUser: (state) => {
            state.token = "";
            state.user = null;
        },
    },
});
export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
