import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, watchMessages } from "../Redux/Slices/MessagesSlice";
import { Box, Typography } from "@mui/material";
import {
  fetchChatRoomsAndParticipants,
  setChatRooms,
} from "../Redux/Slices/ChatRoomParticipantSlice";
import { UserAuth } from "../../context/AuthContext";
import { fetchUserData } from "../Redux/userApi";

const MessageComponent = ({ chatRoomId }) => {
  const { user } = UserAuth();
  const userId = user.uid;
  const dispatch = useDispatch();
  const [participantData, setParticipantData] = useState();
  const messages = useSelector((state) => state.messages.data);
  const messagesStatus = useSelector((state) => state.messages.status);
  console.log("Nachtichten aus dem Messages", messages);

  useEffect(() => {
    if (chatRoomId) {
      // Starten Sie das Abhören der Nachrichten im Chatroom
      const unsubscribeMessages = dispatch(watchMessages(chatRoomId));

      // Abrufen der Benutzerdaten des Gesprächspartners

      // Laden Sie die Nachrichten für den ausgewählten Chatroom
      dispatch(fetchMessages(chatRoomId));

      return () => {
        // Beim Verlassen der Komponente das Abhören beenden
        unsubscribeMessages();
      };
    }
  }, [userId, chatRoomId, dispatch]);
  const participId = messages.map((item) => item.data);
  // const particip = fetchUserData(participId.senderId);

  console.log(
    "participants Data from Messages",
    participId.map((item) => item.senderId)
  );
  if (messagesStatus === "loading") {
    return <div>Loading messages...</div>;
  }

  if (messagesStatus === "failed") {
    return <div>Error: {messages.error}</div>;
  }

  return (
    <Box flexGrow={1} sx={{ pt: "12px", overflow: "auto" }}>
      {messages.map((message) => (
        <Box
          sx={{
            display: "flex",
            px: "16px",
            justifyContent:
              message.data.senderId === userId ? "flex-end" : "flex-start",
          }}
          key={message.id}
        >
          <Typography
            sx={{
              px: "16px",
              py: "8px",
              background: message.data.senderId === userId ? "#00C2FF" : "#fff",
              borderRadius: "32px",
              mt: "4px",
            }}
          >
            {message.data.message}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MessageComponent;
