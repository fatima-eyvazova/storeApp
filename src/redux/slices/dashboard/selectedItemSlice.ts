import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { selectItem } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;
