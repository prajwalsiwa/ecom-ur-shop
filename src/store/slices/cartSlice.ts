import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as { id: string; quantity: number }[],
  },
  reducers: {
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
