import React, { useEffect, useState } from "react";
import NewPostImg from "../../assets/images/getpaid.gif";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "../../assets/icons/add.svg";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { postsCollectionRef, userCollectionRef } from "./../Firestore/index";
import {
  ButtonWrapper,
  FormSubmitButtonIn,
  FormTitle,
  InputModalWrapper,
  InputWrapper,
  ModalFx,
  PostImageWrapper,
} from "../GlobalStyles";
import { UserAuth } from "../../context/AuthContext";
import { FormSubmitButtonUp } from "./../GlobalStyles";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit } = useForm();
  const { user } = UserAuth();
  const postCreatorId = user.uid;
  const createdAt = serverTimestamp();
  const [posts, setPosts] = useState();
  const [postId, setPostId] = useState();
  const [userData, setUserData] = useState({
    from: "Unknown User",
    avatarUrl: "",
  });

  const handleSetOpen = async () => {
    setPostId(uuidv4());
    setOpen(true);
    const fetchedUserData = await fetchUserData(postCreatorId);
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  };

  const fetchUserData = async (userId) => {
    const usersCollectionRef = collection(db, "users"); // Stellen Sie sicher, dass "users" der Name Ihrer Firestore-Sammlung für Benutzer ist.
    const q = query(usersCollectionRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Wenn ein Benutzer mit der angegebenen UID gefunden wurde
      const userData = querySnapshot.docs[0].data();
      return { from: userData.username, avatarUrl: userData.avatarUrl }; // Die Benutzerdaten zurückgeben
    } else {
      return null; // Wenn kein Benutzer gefunden wurde
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuerySnapshot = await getDocs(postsCollectionRef);
      const postsData = [];

      for (const doc of postsQuerySnapshot.docs) {
        const postData = doc.data();
        const userData = await fetchUserData(postData.postCreatorId);

        if (userData) {
          // Benutzerdaten gefunden
          postData.from = userData.from; // Benutzername aus Benutzerdaten
          postData.avatarUrl = userData.avatarUrl; // Avatar-URL aus Benutzerdaten
        } else {
          // Benutzerdaten nicht gefunden, fallback verwenden
          postData.from = "Unknown User";
          postData.avatarUrl = ""; // Hier können Sie einen Standard-Avatar-URL setzen
        }

        postsData.push({ id: doc.id, data: postData });
      }

      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const onSubmit = async (data) => {
    const { pointA, pointB, postContent } = data;
    await setDoc(doc(db, "Posts", `${postId}`), {
      pointA,
      pointB,
      postContent,
      postCreatorId,
      createdAt,
      ...userData, // Fügen Sie Benutzerdaten (from und avatarUrl) hinzu
    });

    handleClose();
  };

  return (
    <Box>
      <IconButton
        sx={{
          cursor: "pointer",
          transition: "300ms",
          "&:hover": {
            transform: "scale(1.2)",
          },
        }}
        onClick={handleSetOpen}
      >
        <img src={AddIcon} alt="Add" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalFx>
          <PostImageWrapper>
            <img src={NewPostImg} alt="newPost" style={{ height: "150px" }} />
            <FormTitle>Get paid for your flight</FormTitle>
          </PostImageWrapper>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputModalWrapper>
                <TextField fullWidth label="From" {...register("pointA")} />
              </InputModalWrapper>
              <InputModalWrapper>
                <TextField fullWidth label="to" {...register("pointB")} />
              </InputModalWrapper>
              <InputModalWrapper>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="Write your message"
                  {...register("postContent")}
                />
              </InputModalWrapper>
              <ButtonWrapper>
                <FormSubmitButtonIn fullWidth variant="contained" type="submit">
                  Post
                </FormSubmitButtonIn>
              </ButtonWrapper>
            </form>
          </Box>
        </ModalFx>
      </Modal>
    </Box>
  );
}
