import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadedFiles: [],
};

export const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFiles: (state, action) => {
      state.uploadedFiles = [...state.uploadedFiles, ...action.payload];
    },
    removeFile: (state, action) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        (file) => file.name !== action.payload
      );
    },
    clearFiles: (state) => {
      state.uploadedFiles = [];
    },
  },
});

// Export actions
export const { addFiles, removeFile, clearFiles } = fileSlice.actions;

// Export reducer
export default fileSlice.reducer;
