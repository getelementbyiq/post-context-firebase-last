import styled from "@emotion/styled";
import { AppBar, Box, Button, Typography } from "@mui/material";

export const FlexCenterCenter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "20px",
  height: "80vh",
}));

export const ImageWrapper = styled(Box)(() => ({
  // border: "1px solid black",
}));

export const Wrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "500px",
}));

export const InputWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "16px",
  width: "400px",
  fontFamily: "Quicksand",
}));

export const ButtonWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "16px",
  width: "400px",
}));

export const FormSubmitButtonIn = styled(Button)(() => ({
  height: "60px",
  background: "#0BB1FD",
  fontSize: "24px",
  fontFamily: "Quicksand",
}));

export const FormSubmitButtonUp = styled(Button)(() => ({
  height: "60px",
  background: "#FD540B",
  fontSize: "24px",
  fontFamily: "Quicksand",
  "&:hover": {
    background: "black",
  },
}));

export const HeaderFX = styled(AppBar)(() => ({
  display: "flex",
  justifyContent: "center",
  position: "sticky",
  height: "80px",
  background: "#fff",
  fontFamily: "Quicksand",
  paddingRight: "20px",
  paddingLeft: "60px",
  boxShadow: "none",
}));

export const FormTitle = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "row",
  alignItems: "center",
  fontSize: "32px",
  color: "#0BB1FD",
  marginBottom: "24px",
  fontFamily: "Quicksand",
}));

export const FormSubTitle = styled(Typography)(() => ({
  fontSize: "18px",
  color: "#0BB1FD",
  marginBottom: 20,
  marginTop: 20,
  fontFamily: "Quicksand",
}));

export const HeaderTitle = styled(Typography)(() => ({
  fontSize: "32px",
  color: "#1b1b1b",
  fontFamily: "Quicksand",
}));

export const FooterFX = styled(Typography)(() => ({
  width: "100%",
  height: "100%",
  background: "#014CAC",
  fontSize: "32px",
  color: "#fff",
  fontFamily: "Quicksand",
}));

export const ModalFx = styled(Typography)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "#fff",
  borderRadius: "32px",
  padding: "32px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export const ModalWrapper = styled(Typography)(() => ({
  width: "100%",
  height: "100%",
  background: "#014CAC",
  fontSize: "32px",
  color: "#fff",
  fontFamily: "Quicksand",
}));

export const InputModalWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginBottom: "16px",
  width: "100%",
  fontFamily: "Quicksand",
  border: "1px solid black",
}));

export const PostImageWrapper = styled(Box)(() => ({
  width: "100%",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export const PostPaper = styled(Box)(() => ({
  width: "313px",
  height: "300px",
  background: "#F4F4F4",
  borderRadius: "32px",
  display: "flex",
  flexDirection: "column",
}));

export const PostPaperFromTo = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  height: "110px",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "16px",
}));

export const PostPaperContentWrapper = styled(Box)(() => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  background: "#fff",
  marginLeft: "8px",
  marginRight: "8px",
  marginBottom: "8px",
  borderRadius: "5px 5px 29px 29px",
}));

export const PostPaperMessage = styled(Box)(() => ({
  width: "100%",
  background: "#C5EAFF",
  height: "39px",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  paddingRight: "8px",
  paddingLeft: "8px",
}));
