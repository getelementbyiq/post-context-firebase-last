import React, { useState } from "react";
import MessageIcon from "../../assets/icons/message.svg";

import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import AddPost from "../components/AddPost";
import LogoutFunc from "../components/Logout";
import GetPosts from "../components/GetPosts";
import MainPage from "../components/MainPage";
import MessageComponent from "../components/Messages";
import { useSelector } from "react-redux";

const Main = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRoomId = useSelector((state) => state.chatRoomId);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <Box
      container
      sx={{
        display: "flexs",
        justifyContent: "center",
      }}
    >
      {/* <GetPosts /> */}

      <MainPage />
    </Box>
  );
};

Main.propTypes = {};

export default Main;
