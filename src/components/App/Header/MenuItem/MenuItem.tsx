import React, { ReactElement } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IMenuItemProps {
  hide?: boolean;
  path: string;
  name: string;
  icon?: ReactElement;
  onClick?: () => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({ name, hide, path, icon }) => {
  const { t } = useTranslation();

  return hide ? null : (
    <ListItem button component={NavLink} to={path}>
      {icon && (<ListItemIcon>{icon}</ListItemIcon>)}
      <ListItemText primary={t(`menu.${name}`)} />
    </ListItem>
  );
};

export default MenuItem;
