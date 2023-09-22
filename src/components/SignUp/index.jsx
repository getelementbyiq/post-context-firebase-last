import React, { useState } from "react";
import Fly from "../../assets/images/fly.gif";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  ButtonWrapper,
  FlexCenterCenter,
  FormSubTitle,
  FormSubmitButtonUp,
  FormTitle,
  ImageWrapper,
  InputWrapper,
  Wrapper,
} from "../GlobalStyles";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Neues Feld für den Benutzernamen
  const [avatarUrl, setAvatarUrl] = useState(""); // Neues Feld für die Avatar-URL
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleReg = async (data) => {
    const { email, password, username, avatarUrl } = data; // Änderungen hier

    setError("");

    try {
      // Schritt 1: Registrieren Sie den Benutzer in Firebase Auth
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Schritt 2: Fügen Sie Benutzerdaten zu Firebase Firestore hinzu
      const usersCollectionRef = collection(db, "users"); // Ändern Sie "users" in den Namen Ihrer Firestore-Sammlung

      await addDoc(usersCollectionRef, {
        uid: user.uid,
        email,
        username, // Hinzufügen des Benutzernamens
        avatarUrl, // Hinzufügen der Avatar-URL
      });

      navigate("/main");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <FlexCenterCenter>
      <Wrapper>
        <ImageWrapper>
          <img src={Fly} alt="fly" style={{ width: "300px" }} />
        </ImageWrapper>
        <FormTitle variant="h3">Sign up for a free account</FormTitle>
      </Wrapper>
      <form onSubmit={handleSubmit(handleReg)}>
        <InputWrapper>
          <TextField
            fullWidth
            type="email"
            label="Email"
            {...register("email")}
          />
        </InputWrapper>
        <InputWrapper>
          <TextField
            fullWidth
            type="password"
            label="Password"
            {...register("password")}
          />
        </InputWrapper>
        <InputWrapper>
          {" "}
          {/* Neues Eingabefeld für den Benutzernamen */}
          <TextField
            fullWidth
            label="Username"
            {...register("username")}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          {" "}
          {/* Neues Eingabefeld für die Avatar-URL */}
          <TextField
            fullWidth
            label="Avatar URL"
            {...register("avatarUrl")}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </InputWrapper>
        <ButtonWrapper>
          <FormSubmitButtonUp
            sx={{ background: "#FD540B" }}
            fullWidth
            variant="contained"
            type="submit"
          >
            Sign Up
          </FormSubmitButtonUp>
          <FormSubTitle variant="p">
            Already have an account yet?{" "}
            <Link to="/" className="underline">
              Sign in.
            </Link>
          </FormSubTitle>
        </ButtonWrapper>
      </form>
    </FlexCenterCenter>
  );
};

export default Signup;

// import React, { useState } from "react";
// import Fly from "../../assets/images/fly.gif";

// import { Link, useNavigate } from "react-router-dom";
// import { UserAuth } from "../../context/AuthContext";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { useForm } from "react-hook-form";
// import {
//   ButtonWrapper,
//   FlexCenterCenter,
//   FormSubTitle,
//   FormSubmitButtonUp,
//   FormTitle,
//   ImageWrapper,
//   InputWrapper,
//   Wrapper,
// } from "../GlobalStyles";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { createUser } = UserAuth();
//   const navigate = useNavigate();

//   const { register, handleSubmit } = useForm();

//   const handleReg = async (data) => {
//     const { email, password } = data;
//     setError("");
//     try {
//       await createUser(email, password);
//       navigate("/main");
//     } catch (error) {
//       setError(error.message);
//       console.log(error.message);
//     }
//   };

//   return (
//     <FlexCenterCenter>
//       <Wrapper>
//         <ImageWrapper>
//           <img src={Fly} alt="fly" style={{ width: "300px" }} />
//         </ImageWrapper>
//         <FormTitle variant="h3">Sign up for a free account</FormTitle>
//       </Wrapper>
//       <form onSubmit={handleSubmit(handleReg)}>
//         <InputWrapper>
//           <TextField
//             fullWidth
//             type="email"
//             label="Email"
//             {...register("email")}
//           />
//         </InputWrapper>
//         <InputWrapper>
//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             {...register("password")}
//           />
//         </InputWrapper>
//         <ButtonWrapper>
//           <FormSubmitButtonUp
//             sx={{ background: "#FD540B" }}
//             fullWidth
//             variant="contained"
//             type="submit"
//           >
//             Sign Up
//           </FormSubmitButtonUp>
//           <FormSubTitle variant="p">
//             Already have an account yet?{" "}
//             <Link to="/" className="underline">
//               Sign in.
//             </Link>
//           </FormSubTitle>
//         </ButtonWrapper>
//       </form>
//     </FlexCenterCenter>
//   );
// };

// export default Signup;
