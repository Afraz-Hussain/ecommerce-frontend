import { createSlice } from "@reduxjs/toolkit";
//load cart from  localStorage
const loadCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : null;
};

const saveCartToStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = loadCartFromStorage() || {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cart.find(
        (product) => product.productId === item.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: 1,
          image: item.image
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += item.price;
      saveCartToStorage(state)
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.cart.find(
        (product) => product.productId === id
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;

        state.cart = state.cart.filter(
          (product) => product.productId !== id
        );
      }
      saveCartToStorage(state)
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.find(
        (product) => product.productId === id
      );

      if (existingItem.quantity === 1) {
        state.cart = state.cart.filter(
          (product) => product.productId !== id
        );
      } else {
        existingItem.quantity -= 1;
      }

      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;
      saveCartToStorage(state)
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cart.find(
        (product) => product.productId === id
      );
    
      if (existingItem) {
        existingItem.quantity += 1; 
        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;
      }
      saveCartToStorage(state)
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToStorage(state)
    }
    
  }
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
