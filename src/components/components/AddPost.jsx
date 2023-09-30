import React, { useEffect, useState } from "react";
import NewPostImg from "../../assets/images/getpaid.gif";
import Courier from "../../assets/images/courier.png";
import Sender from "../../assets/images/sender.png";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
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
  MaterialUISwitch,
  ModalFx,
  PostImageWrapper,
} from "../GlobalStyles";
import { UserAuth } from "../../context/AuthContext";
import { FormSubmitButtonUp } from "./../GlobalStyles";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import ImCourier from "./OutSourcing/ImCourier";

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

  const [checked, setChecked] = useState(true);

  console.log("checked", checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
        <img
          src={AddIcon}
          alt="Add"
          style={{ width: "40px", height: "40px" }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalFx>
          <Box>
            <Box
              sx={{
                height: "200px",
                width: "100%",
                // border: "1px solid red",
                mb: "8px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                transition: "150ms",
                backgroundImage: checked ? `url(${Courier})` : `url(${Sender})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // backgroundPositionY: "",
              }}
            >
              <img src="" alt="" />
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputModalWrapper>
                <TextField
                  type="number"
                  fullWidth
                  label="Price"
                  InputProps={{ style: { borderRadius: "16px" } }}
                  {...register("price")}
                />
              </InputModalWrapper>
              <InputModalWrapper>
                <TextField
                  fullWidth
                  label="From"
                  InputProps={{ style: { borderRadius: "16px" } }}
                  {...register("pointA")}
                />
              </InputModalWrapper>
              <InputModalWrapper>
                <TextField
                  fullWidth
                  label="to"
                  InputProps={{ style: { borderRadius: "16px" } }}
                  {...register("pointB")}
                />
              </InputModalWrapper>
              <InputModalWrapper>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="Write your message"
                  InputProps={{ style: { borderRadius: "16px" } }}
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
