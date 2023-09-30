// combinedResultsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  postsData: [],
  currentResult: "search", // Initialer Wert, um zwischen den Ergebnissen zu wechseln
};

const combinedResultsSlice = createSlice({
  name: "combinedResults",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state[action.payload.resultType] = action.payload.results;
    },
    switchResultType: (state, action) => {
      state.currentResult = action.payload;
    },
  },
});

export const { setResults, switchResultType } = combinedResultsSlice.actions;

export default combinedResultsSlice.reducer;
