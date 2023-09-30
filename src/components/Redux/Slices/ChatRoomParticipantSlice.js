// chatRoomsSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onSnapshot, query, where } from "firebase/firestore";
import { chatRoomsCollectionRef } from "../../Firestore";
import { fetchUserData } from "../userApi";

// AsyncThunk für das Fetchen von Chatrooms
export const fetchChatRoomss = createAsyncThunk(
  "chatRooms/fetchChatRoomss",
  async (userId, { dispatch, getState }) => {
    try {
      const chatRoomQuery = query(
        chatRoomsCollectionRef,
        where("participants", "array-contains", userId)
      );

      const snapshot = await onSnapshot(chatRoomQuery);

      const chatRoomData = snapshot.docs.map((doc) => {
        const chatRoom = doc.data();
        const otherParticipantId = chatRoom.participants.find(
          (participantId) => participantId !== userId
        );

        // Abrufen der Benutzerdaten des Gesprächspartners und als Promise zurückgeben
        const participantDataPromise = fetchUserData(otherParticipantId);

        return {
          id: doc.id,
          data: chatRoom,
          participantDataPromise: participantDataPromise,
        };
      });

      // Warten Sie auf das Abschließen aller asynchronen Operationen, bevor Sie die Ergebnisse zurückgeben
      const chatRooms = await Promise.all(
        chatRoomData.map(async (chatRoomItem) => {
          const participantData = await chatRoomItem.participantDataPromise;
          return {
            id: chatRoomItem.id,
            data: chatRoomItem.data,
            participantData: participantData,
          };
        })
      );

      // Überprüfen, ob die Daten erfolgreich abgerufen wurden
      console.log("ChatRooms abgerufen:", chatRooms);

      // Hier können Sie die Daten im Redux-Store speichern
      // dispatch(setChatRooms(chatRooms)); // Stellen Sie sicher, dass dies der richtige Action Creator ist
    } catch (error) {
      // Bei einem Fehler können Sie eine Fehlermeldung ausgeben
      console.error("Fehler beim Abrufen der Chatrooms:", error);

      // Sie können den Fehler an den Redux-Store weitergeben, wenn Sie möchten
      // dispatch(setChatRoomsError(error.message)); // Stellen Sie sicher, dass dies der richtige Action Creator ist
    }
  }
);

const chatRoomsOfUserSlice = createSlice({
  name: "chatRoomss",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChatRoomss.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default chatRoomsOfUserSlice.reducer;
