import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { MainWarapper } from "./styles/layout";

const Layout: React.FC = () => {
  return (
    <MainWarapper>
      <Header />
      <Outlet />
    </MainWarapper>
  );
};

export default Layout;
