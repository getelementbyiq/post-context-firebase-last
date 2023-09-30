// uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatOpen: false,
};

const chatOpenSlice = createSlice({
  name: "chatOpen",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    },
  },
});

export const { openChat, closeChat } = chatOpenSlice.actions;

export default chatOpenSlice.reducer;
