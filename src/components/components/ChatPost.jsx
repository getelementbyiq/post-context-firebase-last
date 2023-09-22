import React from "react";
import NewPostImg from "../../assets/images/getpaid.gif";

import { Box, Modal, TextField } from "@mui/material";
import {
  ButtonWrapper,
  FormSubmitButtonIn,
  FormTitle,
  InputModalWrapper,
  ModalFx,
  PostImageWrapper,
} from "../GlobalStyles";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ChatPost(props) {
  const { open, handleOpen, handleClose } = props;
  const { register, handleSubmit } = useForm();
  const { postId } = useParams;

  return (
    <Box>
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
            <form onSubmit={handleSubmit()}>
              <InputModalWrapper>
                <TextField fullWidth label="From" {...register("from")} />
              </InputModalWrapper>
              <InputModalWrapper>
                <TextField fullWidth label="to" {...register("to")} />
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
