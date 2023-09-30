// selectedPostSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = null; // Initialer Zustand für selectedPost

const selectedPostSlice = createSlice({
  name: "selectedPost",
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      return action.payload; // Setzen Sie den ausgewählten Beitrag auf den neuen Wert
    },
    clearSelectedPost: () => {
      return null; // Löschen Sie den ausgewählten Beitrag (auf null setzen)
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
