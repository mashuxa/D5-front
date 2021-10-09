import React, { ReactElement } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";

interface IMenuItemProps {
  hide?: boolean;
  path: string;
  icon?: ReactElement;
  onClick?: () => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({ children, hide, path, icon }) => hide ? null : (
  <ListItem button component={NavLink} to={path}>
    {icon && (<ListItemIcon>{icon}</ListItemIcon>)}
    <ListItemText primary={children} />
  </ListItem>
);

export default MenuItem;
