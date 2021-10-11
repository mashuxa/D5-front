import React, { useCallback, useState } from "react";
import { Button, TextField, Paper, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { Delete, Edit, RotateLeft, Save, Visibility } from "@material-ui/icons";
import styles from "./WishlistField.module.scss";
import { useMutation } from "@apollo/client";
import { CREATE_WISHLIST, DELETE_WISHLIST, UPDATE_WISHLIST } from "../../../queries/wishlist";
import { NavLink } from "react-router-dom";
import { paths } from "../../../constants/routes";
import { useTranslation } from "react-i18next";

export interface IWishlistProps {
  id?: string;
  name?: string;
  reset: () => void;
}

const WishlistField: React.FC<IWishlistProps> = ({ id, name = "", reset }) => {
  const { t } = useTranslation();
  const [createWishlist] = useMutation(CREATE_WISHLIST);
  const [updateWishlist] = useMutation(UPDATE_WISHLIST);
  const [deleteWishlist] = useMutation(DELETE_WISHLIST);
  const [isEditable, setIsEditable] = useState<boolean>(!id);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [value, setValue] = useState<string>(name);

  const toggleEditForm = useCallback(async () => {
    if (id) {
      await updateWishlist({ variables: { name: value, id } });
    } else {
      await createWishlist({ variables: { name: value } });
    }

    reset();
    setIsEditable((value) => !value);
  }, [createWishlist, updateWishlist, value, id, reset]);
  const toggleConfirmation = useCallback(() => setIsOpenConfirmation((value) => !value), []);
  const handleChange = useCallback(({ target }) => setValue(target.value), []);
  const handleDelete = useCallback(async () => {
    await deleteWishlist({ variables: { id } });
    reset();
    toggleConfirmation();
  }, [deleteWishlist, id, reset, toggleConfirmation]);

  return (
    <>
      <Dialog open={isOpenConfirmation} onClose={toggleConfirmation}>
        <DialogTitle>{t("pages.wishlists.deleteConfirmation", { name })}</DialogTitle>
        <DialogActions>
          <Button onClick={toggleConfirmation} startIcon={<RotateLeft />}>{t("btns.cancel")}</Button>
          <Button onClick={handleDelete} startIcon={<Delete />} color="error">{t("btns.delete")}</Button>
        </DialogActions>
      </Dialog>
      <Paper className={styles.wrapper}>
        <div className={styles.name}>
          {isEditable ? <TextField value={value} onChange={handleChange} variant="standard" /> : name}
        </div>
        <Button className={styles.btn} variant="outlined" startIcon={isEditable ? <Save /> : <Edit />} onClick={toggleEditForm}>
          {t(`btns.${isEditable ? "save" : "rename"}`)}
        </Button>
        <Button className={styles.btn}  variant="outlined" onClick={toggleConfirmation} startIcon={<Delete />} color="error">
          {t("btns.delete")}
        </Button>
        {id && (
          <Button
            className={styles.btn}
            variant="outlined"
            onClick={toggleConfirmation}
            startIcon={<Visibility />}
            component={NavLink}
            to={paths.wishlist.replace(":id", id.toString())}
          >
            {t("btns.showMore")}
          </Button>
        )}
      </Paper>
    </>
  );
}

export default WishlistField;
