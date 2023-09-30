// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Importieren Sie Ihr Redux-Slice
import chatReducer from "./chatSlice";
import postsReducer from "./Slices/PostSlice";
import selectedPostReducer from "./Slices/SelectedPostSlice";
import chatRoomReducer from "./Slices/ChatRoomSlice";
import messagesReducer from "./Slices/MessagesSlice";
import ChatRoomIdReducer from "./Slices/ChatRoomIdSlice";
import chatRoomsOfUserReducer from "./Slices/ChatRoomParticipantSlice";
import searchReducer from "./Slices/SearchSlice";
import chatOpenReducer from "./Slices/ChatOpenSlice";
import combinedResultsReducer from "./Slices/CombineResultsSlice";
import localPostsReducer from "./Slices/LocalPostsSlice";
const store = configureStore(
  {
    reducer: {
      user: userReducer,
      chat: chatReducer,
      posts: postsReducer,
      //-------------------------------------------
      selectedPost: selectedPostReducer,
      chatRooms: chatRoomReducer,
      messages: messagesReducer,
      chatRoomId: ChatRoomIdReducer,
      chatRoomsOfUser: chatRoomsOfUserReducer,
      search: searchReducer,
      chatOpen: chatOpenReducer,
      combinedResults: combinedResultsReducer,
      localPosts: localPostsReducer,
      // Fügen Sie Ihr Redux-Slice hinzu
      // Fügen Sie hier weitere Slices hinzu, wenn erforderlich
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
