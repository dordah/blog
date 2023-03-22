import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FormWrapper,
  InputWrapper,
  ButtonWrapper,
  FormHeader,
} from "../styles/global";
import { UserContext } from "../UserContext";
import { UserContextProps } from "../typings/userContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext<UserContextProps>(UserContext);

  const submitRegister = async (ev: { preventDefault: () => any }) => {
    ev.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      const userInfo = await res.json();
      setUserInfo(userInfo);
      setRedirect(true);
    } else {
      alert("Wrong Credentials");
    }
  };

  return redirect ? (
    <Navigate to={"/"} />
  ) : (
    <FormWrapper className="login" onSubmit={submitRegister}>
      <FormHeader>Login</FormHeader>
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
      <ButtonWrapper>Login</ButtonWrapper>
    </FormWrapper>
  );
};

export default Login;
