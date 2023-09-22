// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "./userApi";

// Annahme: Ein asynchrones Thunk, um Benutzerdaten abzurufen
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  try {
    const userData = await fetchUserData(userId);
    return userData;
  } catch (error) {
    // Fehler behandeln, z.B. Anzeige einer Fehlermeldung
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null, // Hier werden die Benutzerdaten gespeichert
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload; // Benutzerdaten speichern
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
