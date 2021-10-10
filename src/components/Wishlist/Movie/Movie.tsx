import { useMutation } from "@apollo/client";
import React, { useCallback } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { DELETE_MOVIE_FROM_WISHLIST } from "../../../queries/wishlist";
import { NavLink } from "react-router-dom";
import { paths } from "../../../constants/routes";
import styles from "./Movie.module.scss";

interface IWishlistItemProps {
  id: number;
  wishlistId: string;
  refetch: () => void;
}

const Movie: React.FC<IWishlistItemProps> = ({ id, wishlistId, refetch }) => {
  const [deleteMovieFromWishlist] = useMutation(DELETE_MOVIE_FROM_WISHLIST);
  const handleDelete = useCallback(async () => {
    await deleteMovieFromWishlist({ variables: { id: wishlistId, movieId: id } });
    refetch();
  }, [deleteMovieFromWishlist, id, refetch, wishlistId]);

  return (
    <Card className={styles.wrapper}>
      <CardContent>
        <Typography variant="h6" title={id.toString()}>
          {id}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button size="small" onClick={handleDelete} startIcon={<Delete />} color="error" variant="outlined">Delete</Button>
        <Button className={styles.btn} size="small" component={NavLink} to={paths.movie.replace(':id', id.toString())} variant="outlined">Show More</Button>
      </CardActions>
    </Card>
  );
}

export default Movie;

