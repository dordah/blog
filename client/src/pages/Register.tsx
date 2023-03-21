import React, { useState } from "react";
import {
  FormWrapper,
  InputWrapper,
  ButtonWrapper,
  FormHeader,
} from "../styles/global";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitRegister = async (ev: { preventDefault: () => any }) => {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    response.status === 200
      ? alert("Registeration Succesful")
      : alert("Registeration Failed");
  };

  return (
    <FormWrapper className="register" onSubmit={submitRegister}>
      <FormHeader>Register</FormHeader>
      <InputWrapper
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputWrapper
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonWrapper>Register</ButtonWrapper>
    </FormWrapper>
  );
};

export default Register;
