import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: false,
  reducers: {
    setAdmin: (state, action) => action.payload,
    clearAdmin: (state) => false,
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;

export default adminSlice.reducer;