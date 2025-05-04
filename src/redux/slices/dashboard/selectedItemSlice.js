import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    itemData: {
        item: null,
        status: "",
    },
};
export const selectedItemSlice = createSlice({
    name: "selectedItem",
    initialState,
    reducers: {
        selectItem: (state, action) => {
            state.itemData = action.payload.itemData;
        },
        clearItemData: (state) => {
            state.itemData = initialState.itemData;
        },
    },
});
export const { selectItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
