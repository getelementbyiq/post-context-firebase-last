// messagesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (chatRoomId) => {
    const messagesCollectionRef = collection(
      db,
      "ChatRooms",
      chatRoomId,
      "Messages"
    );
    console.log("Fetching Messages...");

    try {
      const querySnapshot = await getDocs(messagesCollectionRef);
      const messages = [];

      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messages.push({ id: doc.id, data: messageData });
      });

      console.log("Fetched messages:", messages);

      return messages;
    } catch (error) {
      console.error("Error fetching messages", error);
      throw error;
    }
  }
);

export const watchMessages = (chatRoomId) => (dispatch) => {
  const messagesCollectionRef = collection(
    db,
    "ChatRooms",
    chatRoomId,
    "Messages"
  );

  const unsubscribe = onSnapshot(
    query(messagesCollectionRef, orderBy("createdAt")),
    (snapshot) => {
      const messages = [];

      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, data: doc.data() });
      });

      dispatch(updateMessages(messages)); // Hier verwenden wir eine separate Aktion zum Aktualisieren der Nachrichten im Redux-Store
    }
  );

  return unsubscribe;
};

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateMessages: (state, action) => {
      // Diese Aktion wird verwendet, um die Nachrichten im Redux-Store zu aktualisieren
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateMessages } = messageSlice.actions;

export default messageSlice.reducer;
