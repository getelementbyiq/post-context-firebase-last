// localPostsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const localPostsSlice = createSlice({
  name: "localPosts",
  initialState: [],
  reducers: {
    addLocalPosts: (state, action) => {
      // Füge neue Posts zu den vorhandenen lokalen Posts hinzu
      return [...state, ...action.payload];
    },
  },
});

export const { addLocalPosts } = localPostsSlice.actions;
export default localPostsSlice.reducer;
