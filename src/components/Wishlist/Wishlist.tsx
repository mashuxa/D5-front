import { useQuery } from "@apollo/client";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { GET_WISHLIST } from "../../queries/wishlist";
import { useParams } from "react-router-dom";
import { IParams } from "../Movie/Movie";
import { IWishlist } from "../Wishlists/Wishlists";
import Movie from "./Movie/Movie";
import styles from "./Wishlist.module.scss";

interface IWishlistQuery {
  wishlist: IWishlist;
}

const Wishlists: React.FC = () => {
  // @todo: request movies by IDs does not exist yet
  const { id } = useParams<IParams>();
  const { data, refetch } = useQuery<IWishlistQuery>(GET_WISHLIST, { variables: { id } });
  const { name, movies } = data?.wishlist || { movies: [] };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" gutterBottom>{name}</Typography>
      <Grid container spacing={1}>
        {movies.map((movieId) => (
          <Grid item key={movieId} xs={3}>
            <Movie id={movieId} wishlistId={id} refetch={refetch}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Wishlists;

