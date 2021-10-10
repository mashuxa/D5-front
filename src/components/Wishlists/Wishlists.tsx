import { useQuery } from "@apollo/client";
import { GET_WISHLISTS } from "../../queries/wishlist";
import WishlistField from "./WishlistField/WishlistField";
import React, { useCallback, useState } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Add, RotateLeft } from "@material-ui/icons";
import styles from "./Wishlists.module.scss";

export interface IWishlist {
  _id: string;
  name: string;
  movies: number[];
}

export interface IWishlistsQuery {
  wishlists: IWishlist[];
}

const Wishlists: React.FC = () => {
  const { data, refetch } = useQuery<IWishlistsQuery>(GET_WISHLISTS);
  const [isCreation, setIsCreation] = useState<boolean>(false);
  const toggleCreation = useCallback(() => setIsCreation((value) => !value), [])
  const reset = useCallback(async () => {
    await refetch();
    setIsCreation(false);
  }, [refetch]);

  return (
    <div>
      <Paper className={styles.header}>
        <Typography variant="h5">Wishlists</Typography>
        <Button variant="outlined" startIcon={isCreation ? <RotateLeft /> :  <Add />} onClick={toggleCreation} >
          {isCreation ? "Cancel" : "Add wishlist"}
        </Button>
      </Paper>
      <Grid container spacing={"10"}>
        {isCreation && (
          <Grid item xs={12} sm={6} md={4}>
            <WishlistField reset={reset} />
          </Grid>
        )}
        {data?.wishlists.map(({ _id, ...props }) => (
          <Grid key={_id} item xs={12} sm={6} md={4}>
            <WishlistField reset={reset} id={_id} {...props} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Wishlists;

