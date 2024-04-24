import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import adminReducer from './adminSlice';

// store.js

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    admin: adminReducer,
  },
});
