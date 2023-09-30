import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import {
  PostPaper,
  PostPaperContentWrapper,
  PostPaperFromTo,
  PostPaperMessage,
} from "./../GlobalStyles";
import { formatTimestamp } from "./FormatTimeStamp";
import { useDispatch, useSelector } from "react-redux";

const SearchPage = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.search.loading);
  const searchResults = useSelector((state) => state.search.searchResults);

  return (
    <Box
      sx={{
        display: "flex",
        px: "80px",
        flexWrap: "wrap",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {loading ? (
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
      )}
    </Box>
  );
};

SearchPage.propTypes = {};

export default SearchPage;
