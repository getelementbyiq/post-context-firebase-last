import React, { useEffect, useState } from "react";
import { Avatar, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatRoomss } from "../Redux/Slices/ChatRoomParticipantSlice";
import { UserAuth } from "../../context/AuthContext";
import { setSelectedPost } from "../Redux/Slices/SelectedPostSlice";
import ChatCom from "./ChatCom";
import { setChatRoomId } from "../Redux/Slices/ChatRoomIdSlice";

const ChatRooms = ({
  open,
  chatRoomsOfUser,
  handleSubmit,
  onSubmit,
  register,
  handleOpen,
}) => {
  const { user } = UserAuth();
  const userId = user.uid;
  const dispatch = useDispatch();
  const selectedPost = useSelector((state) => state.selectedPost);
  const chatRoomId = useSelector((state) => state.chatRoomId);

  const userAvatarUrl = useSelector((state) => state.user.avatarUrl);

  const chatrooms = chatRoomsOfUser;
  console.log("from Chatroom", chatrooms);
  const goTo = (item) => {
    handleOpen();
    dispatch(setChatRoomId(item.id));
  };
  return (
    <>
      {chatrooms.map((item) => (
        <Avatar
          sx={{
            cursor: "pointer",
            transition: "300ms",
            "&:hover": {
              transform: "scale(1.2)",
              border: "3px solid #fff",
            },
          }}
          key={item.id}
          src={item.participantData?.avatarUrl || userAvatarUrl} // Verwenden Sie den Avatar des Gesprächspartners, falls verfügbar, sonst den eigenen Avatar
          onClick={() => goTo(item)}
        />
      ))}
    </>
  );
};

export default ChatRooms;
