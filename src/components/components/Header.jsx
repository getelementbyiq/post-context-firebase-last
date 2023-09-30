import React from "react";

import { HeaderFX, HeaderTitle } from "../GlobalStyles";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import Search from "../../assets/icons/search.svg";
import AddPost from "./AddPost";
import SideBar from "./SideBar";
import SearchComponent from "./SearchComponent";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const goTo = () => {
    navigate("/main");
  };
  return user ? (
    <HeaderFX>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <HeaderTitle onClick={goTo}>getcour</HeaderTitle>
        </Box>
        <Box
          sx={{
            transition: "300ms",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <SearchComponent />
        </Box>
        <Box>
          <SideBar />
        </Box>
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
