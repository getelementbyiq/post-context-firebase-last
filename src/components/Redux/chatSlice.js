// chatSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatRooms: [],
  selectedChatRoom: null,
  chatParticipants: [], // Neues Feld für Chat-Teilnehmer hinzufügen
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatRooms: (state, action) => {
      // Konvertieren Sie die Timestamps in serialisierbare Werte
      state.chatRooms = action.payload.map((room) => ({
        id: room.id,
        data: {
          ...room.data,
          createdAt: room.data.createdAt, // Konvertieren Sie den Firestore Timestamp in Millisekunden
        },
      }));
    },
    selectChatRoom: (state, action) => {
      state.selectedChatRoom = action.payload;
    },
    setChatParticipants: (state, action) => {
      state.chatParticipants = action.payload;
    },
  },
});

export const { setChatRooms, selectChatRoom, setChatParticipants } =
  chatSlice.actions;
export default chatSlice.reducer;
