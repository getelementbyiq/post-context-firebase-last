// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Importieren Sie Ihr Redux-Slice

const store = configureStore({
  reducer: {
    user: userReducer, // Fügen Sie Ihr Redux-Slice hinzu
    // Fügen Sie hier weitere Slices hinzu, wenn erforderlich
  },
});

export default store;
