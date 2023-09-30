import { useState } from "react";
import Fly from "../../assets/images/fly.gif";

import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import {
  ButtonWrapper,
  FlexCenterCenter,
  FormSubTitle,
  FormSubmitButtonIn,
  FormTitle,
  ImageWrapper,
  InputWrapper,
  Wrapper,
} from "../GlobalStyles";
import Iframe from "react-iframe";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [userName, setUserName] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { register, handleSubmit } = useForm();

  const handleLog = async (data) => {
    const { email, password } = data;
    setError("");
    try {
      await signIn(email, password);
      navigate("/main");
    } catch (error) {
      setError(error.message);
      console.log("error-index-file-submit:", error.message);
    }
  };
  return (
    <FlexCenterCenter>
      <Wrapper>
        <ImageWrapper>
          <img src={Fly} alt="fly" style={{ width: "300px" }} />
        </ImageWrapper>
        <FormTitle variant="h3">Sign in to find a courier. </FormTitle>
      </Wrapper>
      <form onSubmit={handleSubmit(handleLog)}>
        <InputWrapper>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </InputWrapper>
        <InputWrapper>
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </InputWrapper>
        <ButtonWrapper>
          <FormSubmitButtonIn variant="contained" fullWidth type="submit">
            Sign In
          </FormSubmitButtonIn>
          <FormSubTitle>
            Don't have an account yet?{" "}
            <Link to="/signup" className="underline">
              Sign up.
            </Link>
          </FormSubTitle>
        </ButtonWrapper>
      </form>
    </FlexCenterCenter>
  );
};

export default SignIn;
