import { createContext, ReactNode, useState } from "react";
import { UserContextProps } from "./typings/userContext";

export const UserContext = createContext<UserContextProps>({
  userInfo: {},
  setUserInfo: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
