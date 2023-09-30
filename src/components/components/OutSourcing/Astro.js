// Astrogo.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Astro from "../../../assets/images/astro.gif";

function Astrogo() {
  return (
    <Box className="floating">
      <img className="left-astro" src={Astro} alt="" />
    </Box>
  );
}

export default Astrogo;
