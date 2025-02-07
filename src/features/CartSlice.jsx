import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], //each one has name, image, cost, quantity
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const item = state.items.find(i => i.name === name);
      if(item) {
        item.quantity++;
      }
      else {
        state.items.push({name, image, cost, quantity: 1}); //{ name, image, cost, quantity: 1 }
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(i => i.name === name);
      if(item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
