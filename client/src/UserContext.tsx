import { createContext, ReactNode, useEffect, useState } from "react";
import { UserContextProps } from "./typings/userContext";
import { USER_INFO_KEY } from "./consts";

export const UserContext = createContext<UserContextProps>({
  userInfo: null,
  setUserInfo: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem(USER_INFO_KEY);
    return storedUserInfo ? JSON.parse(storedUserInfo) : {};
  });

  useEffect(() => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
