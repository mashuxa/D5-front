import React, { useCallback, useContext, useMemo } from "react";
import { AppBar, List, ListItem, ListItemText, Toolbar } from "@material-ui/core";
import { paths, routes } from "../../../constants/routes";
import MenuItem from "./MenuItem/MenuItem";
import { UserContext } from "../../UserContext/UserContext";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { STORAGE_KEY_ID } from "../../../constants/common";
import { useLazyQuery } from "@apollo/client";
import { LOGOUT } from "../../../queries/user";

const Header: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [logOut] = useLazyQuery(LOGOUT);

  const onClick = useCallback(() => {
    logOut();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_ID);
  }, [setUser, logOut]);
  const authLinkProps = useMemo(() => user ? { onClick } : { component: NavLink, to: paths.login }, [user, onClick]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <List className={styles.list}>
          {routes.map(({ hide, authorizedOnly, path, key, icon }) =>
            <MenuItem key={key} hide={hide || (authorizedOnly && !user)} path={path} icon={icon}>{key}</MenuItem>)}
          <ListItem button {...authLinkProps}>
            <ListItemText primary={user ? 'Logout' : 'Login'}/>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
};


export default Header;