import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
} from "@mui/material";
import MessageComponent from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContext";
import { fetchUser, setUser } from "../Redux/userSlice";
import { fetchUserData } from "../Redux/userApi";

const ChatCom = ({
  open,
  chatRoomId,
  selectedPost,
  handleSubmit,
  onSubmit,
  register,
}) => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const userId = user.uid;
  console.log("userId", userId);

  console.log("fetchuser", fetchUser(userId));

  useEffect(() => {
    // Annahme: userId ist die ID des aktuellen Benutzers
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  // Benutzerdaten aus dem Redux-Store abrufen
  const userData = useSelector((state) => state.user.userData);
  console.log("userData", userData);
  const status = useSelector((state) => state.user.status);

  if (status === "loading") {
    // Wenn die Daten geladen werden, zeige eine Ladeanzeige
    return <div>Loading...</div>;
  }

  if (!userData) {
    // Wenn keine Benutzerdaten vorhanden sind, handle dies hier
    return <div>No user data available.</div>;
  }

  const userAvatarUrl = userData.avatarUrl;
  console.log("avatarUrls", userAvatarUrl);
  console.log(
    "äääääääääääääääääääääääääääääääääääääääääääääääääääääääääääääää"
  );

  return (
    <Collapse in={open}>
      <Box
        sx={{
          height: "500px",
          width: "450px",
          background:
            "linear-gradient(180deg, rgba(128, 128, 128, 0.90) 0%, rgba(69, 69, 69, 0.90) 100%)",
          backdropFilter: "blur(7.5px)",
          opacity: "95%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MessageComponent chatRoomId={chatRoomId} />
        <Box flexGrow={1} sx={{ mb: "16px" }}></Box>

        {/* <Typography>{selectedPost}</Typography> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("message")}
            fullWidth
            multiline
            placeholder="Write your message"
            rows={4}
            sx={{
              background: "rgba(255, 255, 255, 1)",
              borderRadius: "0",
            }}
            inputProps={{
              style: {
                borderRadius: "0",
                "&:hover": {
                  borderRadius: "0",
                  border: "none",
                },
              },
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              height: "60px",
              background: "#00C2FF",
              borderRadius: 0,
              color: "black",
              "&:hover": {
                background: "#4BD4FF",
              },
            }}
            //   onClick={() => sendMessage(chatRoomId, message, senderId)}
          >
            Send
          </Button>
        </form>
      </Box>
    </Collapse>
  );
};

ChatCom.propTypes = {};

export default ChatCom;
