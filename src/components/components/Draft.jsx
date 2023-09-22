import React, { useEffect, useState } from "react";
import SendIcon from "../../assets/icons/send.svg";
import CloseIcon from "../../assets/icons/close.svg";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import {
  chatRoomsCollectionRef,
  messagesCollectionRef,
  postsCollectionRef,
} from "./../Firestore/index";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { onSnapshot } from "firebase/firestore";
import Modal from "@mui/material/Modal";

import {
  ButtonWrapper,
  FormSubmitButtonIn,
  FormTitle,
  InputModalWrapper,
  ModalFx,
  PostImageWrapper,
  PostPaper,
  PostPaperContentWrapper,
  PostPaperFromTo,
  PostPaperMessage,
} from "../GlobalStyles";
import ChatPost from "./ChatPost";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { db } from "./../../firebase";

export default function GetPosts() {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedPost, setSelectedPost] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [postId, setPostId] = useState(null);
  const [chatExists, setChatExists] = useState(false);

  const navigate = useNavigate();

  const goTo = async (post) => {
    handleOpen();
    setSelectedId(post.id);
    setSelectedPost(post.data);
    if (!chatId || post.id !== postId) {
      const newChatId = uuidv4(); // Neue Chat-ID nur, wenn der Sender sich ändert
      setChatId(newChatId);
      setPostId(post.id);
      setChatExists(false);
    } else {
      setChatExists(true);
    }
  };

  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState([]);
  console.log("message", message);
  const messageData = message.map((item) => item.data);
  console.log("messageData", messageData);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (postId) {
      const chatRoomQuery = query(
        chatRoomsCollectionRef,
        where("participants", "array-contains", postId)
      );

      const unsubscribe = onSnapshot(chatRoomQuery, async (snapshot) => {
        if (snapshot.empty) {
          // Wenn es keine Chatrooms gibt, erstellen Sie einen neuen
          const newChatRoomId = await createChatRoom(postId);
          setChatId(newChatRoomId);
          setChatExists(true);
        } else {
          // Verwenden Sie den ersten gefundenen Chatroom (Annahme: Es gibt nur einen)
          const chatRoom = snapshot.docs[0];
          setChatId(chatRoom.id);
          setChatExists(true);
        }
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [postId]);

  console.log("Data", selectedPost);
  const { user } = UserAuth();
  const senderId = user.uid;
  console.log(senderId);
  const postCreatorId = selectedPost.postCreatorId;
  console.log("postCreatorId", postCreatorId);
  console.log("postId", postId);

  const createChatRoom = async (postId) => {
    const newChatRoomRef = await addDoc(chatRoomsCollectionRef, {
      participants: [postId, senderId],
      createdAt: serverTimestamp(),
    });
    return newChatRoomRef.id;
  };

  const sendMessage = async (chatId, messageContent) => {
    await addDoc(collection(messagesCollectionRef, chatId), {
      senderId,
      messageContent,
      createdAt: serverTimestamp(),
    });
  };

  const onSubmit = async (data) => {
    const { message } = data;

    if (!chatId || !postId) {
      console.error("chatId oder postId ist nicht gesetzt.");
      return;
    }

    try {
      // Sende die Nachricht
      await sendMessage(chatId, message);
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht: ", error);
    }
  };

  return (
    <Box
      container
      sx={{
        width: "100%",
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
        px: "80px",
      }}
    >
      <Box
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
          margin: "0 auto",
        }}
      >
        {posts.map((post) => (
          <PostPaper key={post.id} onClick={() => goTo(post)}>
            <PostPaperFromTo>
              <Avatar />
              <Box>
                <Typography>{post.data.from}</Typography>
                <Typography>{post.data.to}</Typography>
              </Box>
            </PostPaperFromTo>
            <PostPaperContentWrapper>
              <Typography sx={{ flexGrow: "1" }}>
                {post.data.postContent}
              </Typography>

              <PostPaperMessage>
                <Typography sx={{ opacity: "50%" }}>
                  Write your message...
                </Typography>
              </PostPaperMessage>
            </PostPaperContentWrapper>
          </PostPaper>
        ))}
      </Box>

      <Dialog open={open} PaperProps={{ width: "1000px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box></Box>
          <IconButton onClick={handleClose}>
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </Box>
        <DialogContent sx={{ width: "600px", height: "700px" }}>
          <Box
            sx={{
              px: "8px",
              py: "8px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar />
              <Box>
                <Typography>{selectedPost.postCreatorId}</Typography>
                <Typography>{selectedId.id}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: "40px",
                py: "8px",
                borderRadius: "8px",
                background: "#C5EAFF",
              }}
            >
              <Typography>{selectedPost.from}</Typography>
              <Typography>{selectedPost.to}</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                my: "4px",
              }}
            >
              {messageData.map((message) => {
                if (postId === message.postId) {
                  return (
                    <Box
                      key={message.id}
                      sx={{
                        mx: "8px",
                        my: "4px",
                        borderRadius: "16px",
                        background:
                          message.senderId === senderId ? "blue" : "red",
                      }}
                    >
                      <Box>
                        <Typography>{message.messageContent}</Typography>
                      </Box>
                    </Box>
                  );
                } else {
                  return null;
                }
              })}
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  {...register("message")}
                  multiline
                  rows={4}
                  sx={{ height: "125px", flexGrow: 1 }}
                />
                <Button
                  type="submit"
                  sx={{
                    width: "55px",
                    height: "125px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#E0E0E0",
                    borderRadius: "8px 24px 24px 8px",
                    ml: "8px",
                  }}
                >
                  <img src={SendIcon} alt="Post" />
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
