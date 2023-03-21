import React from "react";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

const theme = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }
  #root {
    margin: 0 auto;
  }
`;

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/post/:id"} element={<Post />} />
            <Route path={"/edit/:id"} element={<EditPost />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default App;
