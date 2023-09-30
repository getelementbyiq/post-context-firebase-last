import React, { useState } from "react";
import Search from "../../assets/icons/search.svg";

import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../Redux/Slices/SearchSlice";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  PostPaper,
  PostPaperContentWrapper,
  PostPaperFromTo,
  PostPaperMessage,
} from "../GlobalStyles";
import { formatTimestamp } from "./FormatTimeStamp";
import postsSlice from "./../Redux/Slices/PostSlice";
import { setChatRoomId } from "../Redux/Slices/ChatRoomIdSlice";
import { styled } from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const SearchComponent = (handleOpen) => {
  const dispatch = useDispatch();
  const chatRoomId = useSelector((state) => state.chatRoomId);
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");
  const loading = useSelector((state) => state.search.loading);
  const searchResults = useSelector((state) => state.search.searchResults);
  const navigate = useNavigate();

  console.log("Result search", searchResults);

  const handleSearch = () => {
    navigate("/search");
    console.log("Point A:", pointA);
    console.log("Point B:", pointB);
    // Dispatch der Suchaktion mit den Suchkriterien pointA und pointB.
    dispatch(searchPosts(pointA, pointB));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      <input
        type="text"
        placeholder="Point A"
        value={pointA}
        onChange={(e) => setPointA(e.target.value)}
        style={{
          borderRadius: "16px",
          width: "250px",
          paddingLeft: "8px",
          height: "44px",
          border: "0.3px solid grey",
          fontSize: "18px",
        }}
      />
      <input
        type="text"
        placeholder="Point B"
        value={pointB}
        onChange={(e) => setPointB(e.target.value)}
        style={{
          borderRadius: "16px",
          width: "250px",
          paddingLeft: "8px",
          height: "44px",
          border: "0.3px solid grey",
          fontSize: "18px",
        }}
      />
      <IconButton onClick={handleSearch} disabled={loading}>
        <img
          src={Search}
          alt="Search"
          style={{ width: "32px", height: "32px" }}
        />
      </IconButton>
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <Box>
          {searchResults.map((post) => (
            <PostPaper key={post.id}>
              <PostPaperFromTo>
                <Box>
                  <Avatar src={post.data.avatarUrl} />
                  <Typography sx={{ mt: "4px" }}>{post.data.from}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography>
                    {formatTimestamp(post.data.createdAt)}
                  </Typography>
                  <Typography>{post.data.pointA}</Typography>
                  <Typography>{post.data.pointB}</Typography>
                </Box>
              </PostPaperFromTo>
              <PostPaperContentWrapper>
                <Typography sx={{ flexGrow: "1" }}>
                  {post.data.postContent}
                </Typography>

                <PostPaperMessage>
                  <Typography sx={{ opacity: "50%" }}>
                    Write your message...
                  </Typography>
                </PostPaperMessage>
              </PostPaperContentWrapper>
            </PostPaper>
          ))}
        </Box>
      )} */}
    </Box>
  );
};

export default SearchComponent;
