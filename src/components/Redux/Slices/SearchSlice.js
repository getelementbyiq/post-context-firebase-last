import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "../userApi";
import { getDocs } from "firebase/firestore";
import { postsCollectionRef } from "../../Firestore";

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    },
    searchError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchLoading, searchSuccess, searchError } =
  searchSlice.actions;
export default searchSlice.reducer;

// Die Suchaktion, die die fetchPosts-Funktion aufruft
export const searchPosts = (pointA, pointB) => async (dispatch) => {
  dispatch(searchLoading());

  console.log("Starte die Suche mit Point A:", pointA, "und Point B:", pointB);

  const postsQuerySnapshot = await getDocs(postsCollectionRef);
  console.log("Abgerufene Firestore-Daten:", postsQuerySnapshot.docs);

  const postsData = [];

  for (const doc of postsQuerySnapshot.docs) {
    const postData = doc.data();

    // Konsolenausgabe, um zu überprüfen, welche Daten in den Firestore-Dokumenten sind
    console.log("Firestore-Dokument:", postData);

    if (
      postData.pointA.toLowerCase().includes(pointA.toLowerCase()) &&
      postData.pointB.toLowerCase().includes(pointB.toLowerCase())
    ) {
      const userData = await fetchUserData(postData.postCreatorId);

      if (userData) {
        postData.from = userData.from;
        postData.avatarUrl = userData.avatarUrl;
      } else {
        postData.from = "Unknown User";
        postData.avatarUrl = "";
      }

      postsData.push({ id: doc.id, data: postData });
    }
  }

  console.log("Gefundene Suchergebnisse:", postsData);

  dispatch(searchSuccess(postsData));
};
