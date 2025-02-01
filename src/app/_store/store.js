import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileSlice"; // Import the file slice

export const store = configureStore({
  reducer: {
    files: fileReducer, // Register the file reducer
  },
});

export default store;
