import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const chatRoomIdSlice = createSlice({
  name: "chatRoomId",
  initialState,
  reducers: {
    setChatRoomId: (state, action) => {
      return action.payload;
    },
    clearChatRoomId: (state) => {
      return null;
    },
  },
});

export const { setChatRoomId, clearChatRoomId } = chatRoomIdSlice.actions;
export default chatRoomIdSlice.reducer;
