import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SelectedItemDashboard } from "../../types";

const initialState: SelectedItemDashboard = {
  itemData: {
    item: null,
    status: "",
  },
};

export const selectedItemSlice = createSlice({
  name: "selectedItem",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<SelectedItemDashboard>) => {
      state.itemData = action.payload.itemData;
    },
    clearItemData: (state) => {
      state.itemData = initialState.itemData;
    },
  },
});

export const { selectItem } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;
