import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { fetchPosts } from "./PostSlice";

export const fetchChatRooms = createAsyncThunk(
  "chatrooms/fetchChatRooms",
  async () => {
    const chatRoomsCollectionRef = collection(db, "ChatRooms");
    try {
      const querySnapshot = await getDocs(chatRoomsCollectionRef);
      const chatRooms = [];

      querySnapshot.forEach((doc) => {
        const chatRoomsData = doc.data();
        chatRooms.push({ id: doc.id, data: chatRoomsData });
      });

      return chatRooms;
    } catch (error) {
      console.log("error fetching ChatRooms", error);
      throw error;
    }
  }
);

export const watchChatRooms = () => (dispatch) => {
  const chatRoomsCollectionRef = collection(db, "ChatRooms");
  const unsubscribe = onSnapshot(
    query(chatRoomsCollectionRef, orderBy("createdAt", "desc")),
    (snapshot) => {
      const chatRooms = [];

      snapshot.forEach((doc) => {
        chatRooms.push({ id: doc.id, data: doc.data() });
      });

      dispatch(fetchChatRooms(chatRooms)); // Auslösen der Redux-Aktion mit den aktualisierten Daten
    }
  );

  // Optional: Rückgabefunktion, um das Beobachten der Änderungen zu stoppen
  return unsubscribe;
};

const chatRoomSlice = createSlice({
  name: "chatRooms",
  initialState: {
    data: [],
    status: "idle",
    eroor: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default chatRoomSlice.reducer;
