import { useEffect, useState } from "react";
import SendIcon from "../../assets/icons/send.svg";
import CloseIcon from "../../assets/icons/close.svg";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  chatRoomsCollectionRef,
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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserAuth } from "../../context/AuthContext";
import { db } from "./../../firebase";
import ChatComponent from "./ChatComponent";
import PostMenu from "./ChatComponent";
import MenuPopupState from "./ChatComponent";
import DenseMenu from "./ChatComponent";
import BasicMenu from "./ChatComponent";
import Basic from "./ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { formatTimestamp } from "./FormatTimeStamp";
import { createChatRoom, sendMessage } from "../Firestore/ChatActions";

export default function GetPosts() {
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const [selectedId, setSelectedId] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [chatExists, setChatExists] = useState(false);
  const chatRooms = useSelector((state) => state.chat);
  console.log("ChatRoomsDaaataaaa", chatRooms);

  const { user } = UserAuth();
  const senderId = user.uid;
  const [chatRoomId, setChatRoomId] = useState();
  const dispatch = useDispatch();

  // const selectedPosd = useSelector((state) => state.setSelectedPost);

  const goTo = async (post) => {
    handleOpen();
    setSelectedId(post.id);
    setSelectedPost(post.data);
  };

  // const createChatRoom = async (participants) => {
  //   const newChatRoomRef = await addDoc(chatRoomsCollectionRef, {
  //     participants,
  //     createdAt: serverTimestamp(),
  //   });
  //   return newChatRoomRef.id;
  // };

  // const sendMessage = async (chatRoomId, messageContent) => {
  //   if (!chatRoomId) {
  //     console.error("chatRoomId ist nicht gesetzt.");
  //     return;
  //   }

  //   const messagesCollectionRef = collection(
  //     db,
  //     "ChatRooms",
  //     chatRoomId,
  //     "Messages" // Stellen Sie sicher, dass "Messages" auf dieser Ebene ist
  //   );

  //   await addDoc(messagesCollectionRef, {
  //     senderId,
  //     messageContent,
  //     createdAt: serverTimestamp(),
  //   });
  // };

  const onSubmit = async (data) => {
    const { message } = data;

    if (!selectedPost) {
      console.error("selectedPost ist nicht gesetzt.");
      return;
    }

    try {
      // Überprüfen, ob ein Chatroom bereits existiert
      if (!chatExists) {
        // Wenn kein Chatroom existiert, erstellen Sie einen neuen
        const postCreatorId = selectedPost.postCreatorId;
        const participants = [postCreatorId, senderId];
        const newChatRoomId = await createChatRoom(participants);
        setChatId(newChatRoomId);
        setChatRoomId(newChatRoomId);
        setChatExists(true);
      }
      await sendMessage(chatRoomId, message, senderId);

      //  handleClose();
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht: ", error);
    }
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(postsCollectionRef, orderBy("createdAt", "desc")),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

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
      {/* <YourComponent /> */}

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
          <PostPaper onClick={() => goTo(post)} key={post.id}>
            <PostPaperFromTo>
              <Box>
                <Avatar src={post.data.avatarUrl} />
                <Typography sx={{ mt: "4px" }}>{post.data.from}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Typography>{formatTimestamp(post.data.createdAt)}</Typography>
                <Typography>{post.data.pointA}</Typography>
                <Typography>{post.data.pointB}</Typography>
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
          {selectedPost && (
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
              ></Box>
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
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
