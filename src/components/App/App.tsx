import React, { useCallback, useContext, useEffect } from "react";

import Header from "./Header/Header";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../queries/user";
import { STORAGE_KEY_ID } from "../../constants/common";
import { UserContext } from "../UserContext/UserContext";
import "resources/i18n";

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
      setUser(data.user);
    }
  }, [updateUserData, setUser, data]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default App;