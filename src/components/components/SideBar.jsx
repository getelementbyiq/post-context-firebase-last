import React, { useEffect, useState } from "react";
import MessageIcon from "../../assets/icons/message.svg";
import CloseIcon from "../../assets/icons/close.svg";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddPost from "../components/AddPost";
import LogoutFunc from "../components/Logout";
import { onSnapshot, query, where } from "firebase/firestore";
import { chatRoomsCollectionRef } from "../Firestore";
import { UserAuth } from "../../context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  query as firestoreQuery,
  where as firestoreWhere,
} from "firebase/firestore";
import { db } from "../../firebase";
import ChatDialog from "./ChatDialog";
import { useSelector } from "react-redux";
import { fetchUserData } from "../Redux/userApi";

const SideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [openChatDialog, setOpenChatDialog] = useState(false);

  const { user } = UserAuth();
  const userId = user ? user.uid : null;

  const userAvatarUrl = useSelector((state) => state.user.avatarUrl);

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (!userId) {
        return;
      }

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

          // Abrufen der Benutzerdaten des Gesprächspartners
          const participantData = await fetchUserData(otherParticipantId);

          return {
            id: doc.id,
            data: chatRoom,
            participantData: participantData,
          };
        });
        const chatRoomsWithParticipants = await Promise.all(chatRoomData);
        setChatRooms(chatRoomsWithParticipants);
      });
    };

    fetchChatRooms();

    return () => {
      // Aufräumen beim Verlassen der Komponente
      // unsubscribe();
    };
  }, [userId]);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  const handleChatRoomClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
    setOpenChatDialog(true);
  };

  const handleCloseChatDialog = () => {
    setOpenChatDialog(false);
  };

  return (
    <Box
      container
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: "0",
          top: "-20px",
        }}
      >
        <LogoutFunc />
        <AddPost />
        <Badge badgeContent={4}>
          <IconButton
            onClick={toggleOpen}
            sx={{
              width: "50px",
              height: "50px",
              background: isOpen
                ? "linear-gradient(128deg, #9700F4 10.4%, #0BB1FD 90.32%)"
                : "standard",
              cursor: "pointer",
              transition: "300ms",
              "&:hover": {
                transform: "scale(1.2)",
                background: isOpen
                  ? "linear-gradient(128deg, #9700F4 10.4%, #0BB1FD 90.32%)"
                  : "standard",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke={isOpen ? "white" : "black"} // Ändern Sie die Farbe hier
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11.3333 25.3334H10.6666C5.33329 25.3334 2.66663 24 2.66663 17.3334V10.6667C2.66663 5.33335 5.33329 2.66669 10.6666 2.66669H21.3333C26.6666 2.66669 29.3333 5.33335 29.3333 10.6667V17.3334C29.3333 22.6667 26.6666 25.3334 21.3333 25.3334H20.6666C20.2533 25.3334 19.8533 25.5334 19.6 25.8667L17.6 28.5334C16.72 29.7067 15.28 29.7067 14.4 28.5334L12.4 25.8667C12.1866 25.5734 11.6933 25.3334 11.3333 25.3334Z" />
                <path d="M21.3287 14.6667H21.3406" strokeWidth="2" />
                <path d="M15.9939 14.6667H16.0059" strokeWidth="2" />
                <path d="M10.6593 14.6667H10.6713" strokeWidth="2" />
              </svg>
            </Box>
          </IconButton>
        </Badge>
        <Collapse
          in={isOpen}
          sx={{
            borderRadius: "30px",
            padding: "4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {chatRooms.map((chatRoom) => (
              <Avatar
                sx={{
                  cursor: "pointer",
                  transition: "300ms",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                key={chatRoom.id}
                src={chatRoom.participantData?.avatarUrl || userAvatarUrl} // Verwenden Sie den Avatar des Gesprächspartners, falls verfügbar, sonst den eigenen Avatar
                onClick={() => handleChatRoomClick(chatRoom)}
              />
            ))}
          </Box>
        </Collapse>
      </Box>

      <Dialog
        open={openChatDialog}
        onClose={handleCloseChatDialog}
        PaperProps={{ width: "1000px" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box></Box>
          <IconButton onClick={handleCloseChatDialog}>
            <img src={CloseIcon} alt="close" />
          </IconButton>
        </Box>
        <DialogContent sx={{ width: "600px", height: "700px" }}>
          {selectedChatRoom ? (
            <ChatDialog chatRoom={selectedChatRoom} userId={userId} />
          ) : (
            <div>Loading...</div>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SideBar;
