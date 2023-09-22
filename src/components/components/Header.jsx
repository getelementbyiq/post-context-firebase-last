import React from "react";

import { HeaderFX, HeaderTitle } from "../GlobalStyles";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import AddPost from "./AddPost";
import SideBar from "./SideBar";

const Header = (props) => {
  const { user, logout } = UserAuth();
  return user ? (
    <HeaderFX>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <HeaderTitle>getcour</HeaderTitle>
        </Box>
        <SideBar />
      </Toolbar>
    </HeaderFX>
  ) : (
    <HeaderFX>
      <Toolbar>
        <Box>
          <HeaderTitle>getcour</HeaderTitle>
        </Box>
      </Toolbar>
    </HeaderFX>
  );
};

Header.propTypes = {};

export default Header;
