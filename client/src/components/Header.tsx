import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { UserContextProps } from "../typings/userContext";
import {
  HeaderWrapper,
  LogoWrapper,
  NavBar,
  LinkWrapper,
  AnchorWrapper,
} from "../styles/header";

const Header: React.FC = () => {
  const { setUserInfo, userInfo } = useContext<UserContextProps>(UserContext);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });

      const userInfo = await response.json();

      setUserInfo(userInfo);
    })();
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <HeaderWrapper>
      <LogoWrapper to="/" className="logo">
        Shira's Blog
      </LogoWrapper>
      <NavBar>
        {username && (
          <>
            <span>Hello, {username}</span>
            <LinkWrapper to="/create">Create new post</LinkWrapper>
            <AnchorWrapper onClick={logout}>Logout</AnchorWrapper>
          </>
        )}
        {!username && (
          <>
            <LinkWrapper to="/login">Login</LinkWrapper>
            <LinkWrapper to="/register">Register</LinkWrapper>
          </>
        )}
      </NavBar>
    </HeaderWrapper>
  );
};

export default Header;
