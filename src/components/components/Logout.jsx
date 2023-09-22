import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import Logout from "./Logout";
import { UserAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Redux/userSlice";

const LogoutFunc = (props) => {
  const { user, logout } = UserAuth();
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

  return (
    <Box>
      <IconButton onClick={logout}>
        <Avatar
          sx={{
            cursor: "pointer",
            transition: "300ms",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
          src={userData.avatarUrl}
        />
      </IconButton>
    </Box>
  );
};

LogoutFunc.propTypes = {};

export default LogoutFunc;
