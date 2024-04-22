import { createSlice } from "@reduxjs/toolkit";

//it is used to store the data on the localstorage because when the page is refresh then the cart data will empty
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
// const initialState = [];

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      // if item id is not equal to action.payload then that item will delete
      return state.filter((item) => item.id != action.payload.id);
    },
    incrementQuantity: (state, action) => {
      state = state.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },
    decrementQuantity: (state, action) => {
      state = state.map((item) => {
        //if item id is not eual to one
        if (item.quantity !== 1) {
          // if item id is equal to action.payload
          if (item.id === action.payload) {
            //then item quantity will increase
            item.quantity--;
          }
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
