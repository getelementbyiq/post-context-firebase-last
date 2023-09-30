// postsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import { getDoc, onSnapshot, orderBy, query } from "firebase/firestore";

// Thunk zum Abrufen von Posts
import { collection, getDocs } from "firebase/firestore";
import { addLocalPosts } from "./LocalPostsSlice";

// Funktion zur Umwandlung von Firebase Timestamp in Unix-Timestamp
const firebaseTimestampToUnixTimestamp = (firebaseTimestamp) => {
  return firebaseTimestamp.toMillis(); // Hier wird der Timestamp in Millisekunden umgewandelt
};

export const fetchPosts = createAsyncThunk("Posts/fetchPosts", async () => {
  const postsCollectionRef = collection(db, "Posts");
  console.log("Fetching posts...");

  try {
    const querySnapshot = await getDocs(postsCollectionRef);
    const posts = [];

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      // Umwandeln des Timestamps in einen Unix-Timestamp
      postData.createdAt = firebaseTimestampToUnixTimestamp(postData.createdAt);
      posts.push({ id: doc.id, data: postData });
    });

    console.log("Fetched posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error to be handled by Redux Toolkit
  }
});

// ... Der Rest Ihres postsSlice-Codes bleibt unverändert

export const watchPosts = () => (dispatch) => {
  const postsCollectionRef = collection(db, "Posts");

  const unsubscribe = onSnapshot(
    query(postsCollectionRef, orderBy("createdAt", "desc")),
    (snapshot) => {
      const posts = [];

      snapshot.forEach((doc) => {
        posts.push({ id: doc.id, data: doc.data() });
      });

      // dispatch(addLocalPosts(posts)); // Auslösen der Redux-Aktion mit den aktualisierten Daten
      dispatch(fetchPosts(posts)); // Auslösen der Redux-Aktion mit den aktualisierten Daten
    }
  );

  // Optional: Rückgabefunktion, um das Beobachten der Änderungen zu stoppen
  return unsubscribe;
};

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
