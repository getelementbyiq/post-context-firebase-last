import React from "react";
import Astro from "../../assets/images/astro.gif";
import PropTypes from "prop-types";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { FooterFX, SubTitleFooter, TypographyFX } from "../GlobalStyles";
import Staars from "./OutSourcing/Stars";
import Astrogo from "./OutSourcing/Astro";

const Footer = (props) => {
  return (
    <FooterFX>
      <Box
        container
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          className="astrogos-box"
          sx={{
            width: "96%",
            height: "400px",
            background: "black",
            borderRadius: "0 0 44px 44px",
          }}
        >
          <Box
            className="astro"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Astro}
              alt=""
              style={{ width: "350px", height: "100%" }}
            />
          </Box>
        </Box>
        <Box
          container
          sx={{
            height: "499px",
            width: "100%",
            backgroundColor: "#014CAC",
            pt: "180px",
          }}
        >
          <Grid container sx={{ justifyContent: "space-between", px: "100px" }}>
            <Box sx={{ maxWidth: "248px" }}>
              <TypographyFX
                sx={{
                  fontFamily: "Integral CF Regular",
                  fontSize: "33px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                getcour
              </TypographyFX>
              <TypographyFX>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </TypographyFX>
              <TypographyFX>2</TypographyFX>
            </Box>
            <Box>
              <SubTitleFooter>Company</SubTitleFooter>
              <TypographyFX>About</TypographyFX>
              <TypographyFX>Features</TypographyFX>
              <TypographyFX>Works</TypographyFX>
              <TypographyFX>Career</TypographyFX>
            </Box>
            <Box>
              <SubTitleFooter>Help</SubTitleFooter>
              <TypographyFX>Customer Support</TypographyFX>
              <TypographyFX>Delivery Details</TypographyFX>
              <TypographyFX>Term & Conditions</TypographyFX>
              <TypographyFX>Privacy Policy</TypographyFX>
            </Box>
            <Box>
              <SubTitleFooter>FAQ</SubTitleFooter>
              <TypographyFX>Account</TypographyFX>
              <TypographyFX>Manage Deliveries</TypographyFX>
              <TypographyFX>Orders</TypographyFX>
              <TypographyFX>Payments</TypographyFX>
            </Box>
            <Box>
              <SubTitleFooter>Resources</SubTitleFooter>
              <TypographyFX>Free eBooks</TypographyFX>
              <TypographyFX>Development Tutorial</TypographyFX>
              <TypographyFX>How to - Blog</TypographyFX>
              <TypographyFX>Youtube Playlist</TypographyFX>
            </Box>
          </Grid>
        </Box>
      </Box>
    </FooterFX>
  );
};

Footer.propTypes = {};

export default Footer;
