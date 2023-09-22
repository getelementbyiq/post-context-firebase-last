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

const Main = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <GetPosts />
    </Box>
  );
};

Main.propTypes = {};

export default Main;
