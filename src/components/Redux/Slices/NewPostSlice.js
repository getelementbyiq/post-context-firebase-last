// newPostsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const newPostsSlice = createSlice({
  name: "newPosts",
  initialState: [],
  reducers: {
    addNewPost: (state, action) => {
      // Hier fügen Sie den neuen Post zum Zustand hinzu
      state.push(action.payload);
    },
  },
});

export const { addNewPost } = newPostsSlice.actions;
export default newPostsSlice.reducer;
