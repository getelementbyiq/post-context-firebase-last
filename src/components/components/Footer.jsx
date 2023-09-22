import React from "react";
import PropTypes from "prop-types";
import { Box, List, ListItem } from "@mui/material";
import { FooterFX } from "../GlobalStyles";

const Footer = (props) => {
  return (
    <FooterFX>
      <List>
        <ListItem>1</ListItem>
        <ListItem>2</ListItem>
        <ListItem>3</ListItem>
        <ListItem>4</ListItem>
      </List>
    </FooterFX>
  );
};

Footer.propTypes = {};

export default Footer;
