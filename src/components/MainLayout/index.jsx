import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar, Typography } from "@mui/material";
import Header from "./../components/Header";
import Footer from "../components/Footer";

const MainLayout = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
