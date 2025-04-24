import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    assets: [],
    status: "idle",
  },
  reducers: {
    addData: (state, action) => {
      state.assets = action.payload;
      state.status = "fulfilled";
    },
    updateData: (state, action) => {
      state.assets = action.payload;
      state.status = "fulfilled";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state) => {
      state.status = "Error loading data";
    },
  },
});

export const { setError, setLoading, addData, updateData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
