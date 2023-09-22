import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const ChatDialog = ({ chatRoom, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "ChatRooms", chatRoom.id, "Messages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => doc.data());
      setMessages(messageData);
    });

    return () => {
      unsubscribe();
    };
  }, [messagesRef]);
  console.log("Messages:", messages);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(messagesRef, {
      message,
      senderId: userId,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <Box>
      <Typography variant="h6">
        Chat with {chatRoom.data.participants}
      </Typography>
      <div>
        {messages.map((msg, index) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent:
                msg.senderId === userId ? "flex-end" : "flex-start",
            }}
          >
            <Typography>
              {msg.senderId === userId ? "You" : msg.senderId}: {msg.message}
            </Typography>
          </Box>
        ))}
      </div>
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
};

export default ChatDialog;
