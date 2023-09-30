import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, watchPosts } from "../Redux/Slices/PostSlice";
import Down from "../../assets/icons/down.svg";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { setSelectedPost } from "../Redux/Slices/SelectedPostSlice";
import {
  Participants,
  createChatRoom,
  sendMessage,
} from "../Firestore/ChatActions";
import { UserAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { watchChatRooms } from "../Redux/Slices/ChatRoomSlice";
import {
  PostPaper,
  PostPaperContentWrapper,
  PostPaperFromTo,
  PostPaperMessage,
} from "../GlobalStyles";
import { formatTimestamp, formatUnixTimestamp } from "./FormatTimeStamp";
import { setChatRoomId } from "../Redux/Slices/ChatRoomIdSlice";
import { motion } from "framer-motion";
import MenuPopupState from "./ChatMenuComponent";
import ChatRooms from "./ChatRooms";
import ChatCom from "./ChatCom";
import { fetchChatRoomss } from "./../Redux/Slices/ChatRoomParticipantSlice";
import { fetchUserData } from "../Redux/userApi";
import {
  onSnapshot,
  query as firestoreQuery,
  where as firestoreWhere,
  orderBy,
  query,
} from "firebase/firestore";
import { chatRoomsCollectionRef, postsCollectionRef } from "../Firestore";
import { fetchUser } from "../Redux/userSlice";
import SearchComponent from "./SearchComponent";
import { addLocalPosts } from "../Redux/Slices/LocalPostsSlice";
import { db } from "../../firebase";

const MainPage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  //#################################################################
  // const posts = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState([]);
  console.log("posts aus state", posts);
  const postsStatus = useSelector((state) => state.posts.status);
  const postsError = useSelector((state) => state.posts.error);
  const selectedPost = useSelector((state) => state.selectedPost);
  const [chatRoomsOfUser, setChatRoomsOfUser] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false);
  const chatRoomId = useSelector((state) => state.chatRoomId);
  const chatRooms = useSelector((state) => state.chatRooms.data);
  //#################################################################
  //--------------------------------function/state-------start---------Search-State
  const [isSearch, setIsSearch] = useState(false);
  const toggleSearch = () => {
    setIsSearch(true);
  };
  //------------------------------------------------------end----------Search-State
  //-------------------------------------------------------------------EMTY
  //-------------------------------------------------------------------EMTY
  //#################################################################
  //-------------------------------------------------------------------LOGS
  // console.log("UserData of Current User", userData);
  // console.log("ChatRoomsOfUser", chatRoomsOfUser);
  // console.log("chatRooms-Redux", chatRooms);
  // console.log("selecterPOst-Redux", selectedPost);
  // console.log("ChatRoom-Id GLOBAL", chatRoomId);
  //-------------------------------------------------------------------LOGS
  //#################################################################
  //---------------------UserAuth------start-----------UserId-Data
  const userData = useSelector((state) => state.user.userData);
  const { user } = UserAuth();
  const userId = user ? user.uid : null;
  const senderId = user ? user.uid : null;
  //---------------------UserAuth------end-------------UserId-Data

  //-----------------function/state-----start--------Chat-Open/Close
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  //------------------function/state-----end-----------Chat-Open/Close

  //---------------------loader-------start------------UserId-Loader
  useEffect(() => {
    if (userId) {
      setUserLoaded(true);
    }
  }, userId);
  //---------------------loader-------end--------------UserId-loader

  //---------------------dispatch-------start----------UserId
  useEffect(() => {
    // Annahme: userId ist die ID des aktuellen Benutzers
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);
  //---------------------dispatch-------end------------UserId

  //------------------------------------start----------ChatRooms+ParticipantData
  useEffect(() => {
    if (userId && userLoaded) {
      const fetchChatRooms = async () => {
        const chatRoomQuery = firestoreQuery(
          chatRoomsCollectionRef,
          firestoreWhere("participants", "array-contains", userId)
        );

        const unsubscribe = onSnapshot(chatRoomQuery, async (snapshot) => {
          const chatRoomData = snapshot.docs.map(async (doc) => {
            const chatRoom = doc.data();
            const otherParticipantId = chatRoom.participants.find(
              (participantId) => participantId !== userId
            );

            const participantData = await fetchUserData(otherParticipantId);

            return {
              id: doc.id,
              data: chatRoom,
              participantData: participantData,
            };
          });
          const chatRoomsWithParticipants = await Promise.all(
            chatRoomData
          ).catch((error) => {
            console.error(
              "Fehler beim Abrufen von Chatrooms mit Teilnehmerdaten:",
              error
            );
            return [];
          });

          setChatRoomsOfUser(chatRoomsWithParticipants);
        });
      };
      fetchChatRooms();
    }
    console.log("------------------------------");

    return () => {
      // Aufräumen beim Verlassen der Komponente
      // unsubscribe();
    };
  }, [userId, userLoaded]);
  //-------------------------------------end-----------ChatRooms+ParticipantData

  //---------------------dispatch-------start----------WatchPosts/WatchChatRooms
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

  // ...

  // Scroll-Handler, um die nächsten Posts abzurufen, wenn das Ende der Seite erreicht wird

  useEffect(() => {
    // if (postsStatus === "idle") {
    //   // dispatch(watchPosts());
    // }
    dispatch(watchChatRooms());
  }, [postsStatus, dispatch]);
  //---------------------dispatch-------end------------WatchPosts/WatchChatRooms Commented

  //---------------------loader--------start-----------PostStatus
  // if (postsStatus === "loading") {
  //   return <div>Loading...</div>;
  // }
  // if (postsStatus === "failed") {
  //   return <div>Error: {postsError}</div>;
  // }
  //---------------------loader--------end-------------PostStatus

  //---------------------function------start-----------ChatOpen/CreateNewChatRoom
  const goTo = async (post) => {
    handleOpen();

    await dispatch(setSelectedPost(post.data.postCreatorId));
    const postCreatorId = post.data.postCreatorId;
    const participants = await Participants(postCreatorId, senderId);
    const chatRoomExists = chatRooms.find(
      (room) =>
        room.data.participants.includes(senderId) &&
        room.data.participants.includes(postCreatorId)
    );

    if (chatRoomExists) {
      dispatch(setChatRoomId(chatRoomExists.id));
      // console.log(alert("existiert"));
    } else {
      const newChatRoomId = await createChatRoom(participants);
      await dispatch(setChatRoomId(newChatRoomId));
      // console.log("chatrooooooooomId existiert niiiiicht");
    }
  };
  //---------------------function------end-------------ChatOpen/CreateNewChatRoom

  //---------------------function------start-----------SendMessage
  const onSubmit = (data) => {
    const { message } = data;
    try {
      sendMessage(chatRoomId, message, senderId);
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht: ", error);
    }
    reset();
  };
  //---------------------function------end-------------SendMessage

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <SearchComponent handleOpen={handleOpen} toggleSearch={toggleSearch} /> */}
      <Box
        sx={{
          display: "flex",
          px: "80px",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          xs={3}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            margin: "0 auto",
            justifyContent: "center",
            mb: "150px",
          }}
        >
          {posts &&
            posts.map((post) => (
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
                    <Typography>
                      {formatTimestamp(post.data.createdAt)}
                      {console.log("creaaaaaaated at", post.data.createdAt)}
                    </Typography>
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
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ position: "fixed", right: "110px", bottom: "0px" }}>
          <Box
            sx={{
              px: "32px",
              py: "16px",
              borderRadius: "16px 16px 0 0",
              background: "#BABABA",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: open ? "row-reverse" : "row",
              transition: "300ms",
              cursor: "pointer",
            }}
          >
            <Avatar src={userData?.avatarUrl} />
            {!open && (
              <Box sx={{ gap: "16px", display: "flex" }}>
                <ChatRooms
                  open={open}
                  chatRoomsOfUser={chatRoomsOfUser}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  register={register}
                  handleOpen={handleOpen}
                />
              </Box>
            )}
            {open && (
              <IconButton onClick={onClose}>
                <img src={Down} alt="" />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: "flex" }}>
            <ChatCom
              open={open}
              chatRoomId={chatRoomId}
              selectedPost={selectedPost}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
            />
          </Box>
        </Box>
        <Box sx={{ position: "fixed", right: "50px", bottom: "24px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {open && (
              <ChatRooms
                open={open}
                chatRoomsOfUser={chatRoomsOfUser}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                handleOpen={handleOpen}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
