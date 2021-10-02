import React, { useCallback, useContext, useEffect } from "react";

import Header from "./Header/Header";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../queries/query";
import { STORAGE_KEY_ID } from "../../constants/common";
import { UserContext } from "../UserContext/UserContext";

const App: React.FC = ({ children }) => {
  const [getUserData, { data }] = useLazyQuery(GET_USER);
  const { setUser } = useContext(UserContext);
  const updateUserData = useCallback(() => {
    if (localStorage.getItem(STORAGE_KEY_ID)) {
      getUserData();
    }
  }, [getUserData]);

  useEffect(() => {
    updateUserData();
  }, [updateUserData]);

  useEffect(() => {
    if (data) {
      setUser(data.getUser);
    }
  }, [updateUserData, setUser, data]);

  return (
    <>
      <Header/>
      {children}
    </>
  );
};

export default App;