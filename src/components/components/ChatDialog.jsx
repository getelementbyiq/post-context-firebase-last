import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Avatar } from "@mui/material";
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
import { useSelector } from "react-redux";
import { formatTimestamp } from "./FormatTimeStamp";
import { sendMessage } from "../Firestore/ChatActions";

const ChatDialog = ({ chatRoom, userId, userAvatar }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatRoomId = chatRoom.id;

  const currentUser = useSelector((state) => state.user);
  console.log("currentUserAvatar", currentUser);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

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
  console.log("Messagesdsdsdsds:", messages);
  console.log("PPPPPPPPPPPPPPPPPPPPPPPPP");

  // const handleSendMessage = async () => {
  //   if (message.trim() === "") return;

  //   await addDoc(messagesRef, {
  //     message,
  //     senderId: userId,
  //     createdAt: serverTimestamp(),
  //   });

  //   setMessage("");
  // };

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
            {/* {msg.senderId === userId()} */}
            <Box
              sx={{
                display: "flex",
                flexDirection: msg.senderId === userId ? "row" : "row-reverse",
              }}
            >
              <Box
                sx={{
                  py: "8px",
                  px: "32px",
                  background: msg.senderId === userId ? "#A3EEFF" : "#EAFAAB",
                  borderRadius: "32px",
                  mt: "4px",
                }}
              >
                <Typography>{msg.message}</Typography>
              </Box>
              <Avatar
                sx={{ width: "24px", height: "24px" }}
                src={
                  msg.senderId === userId
                    ? currentUser.userData.avatarUrl
                    : userAvatar
                }
              />
            </Box>
            {/* <Typography>{formatTimestamp(msg.createdAt)}</Typography> */}
          </Box>
        ))}
      </div>
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        // onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => sendMessage(chatRoomId, message, userId)}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatDialog;
