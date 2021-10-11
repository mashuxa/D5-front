import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_MOVIE_BY_ID } from "../../queries/movie";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Typography,
  CardMedia,
  Card,
  CardContent,
  MenuItem,
  Button,
  Select,
  CardActions
} from "@material-ui/core";
import { ADD_MOVIE_TO_WISHLIST, GET_WISHLISTS } from "../../queries/wishlist";
import { useParams } from "react-router-dom";
import { IMovieProps } from "../MovieCard/MovieCard";
import { IWishlistsQuery } from "../Wishlists/Wishlists";
import { THE_MOVIE_LINK } from "../../constants/common";
import styles from "./Movie.module.scss";
import { Favorite } from "@material-ui/icons";
import { UserContext } from "../UserContext/UserContext";
import { useTranslation } from "react-i18next";

export interface IParams {
  id: string;
}

interface IMovieQuery {
  movieById: IMovieProps;
}

interface IMovieQuery {
  movieById: IMovieProps;
}

const Movie: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<IParams>();
  const { user } = useContext(UserContext);
  const { data } = useQuery<IMovieQuery>(GET_MOVIE_BY_ID, { variables: { id } });
  const { title, overview, poster_path, vote_average, vote_count, release_date } = data?.movieById || {};
  const [getWishlists, { data: dataWishlists }] = useLazyQuery<IWishlistsQuery>(GET_WISHLISTS);
  const [addMovieToWishlist] = useMutation(ADD_MOVIE_TO_WISHLIST);
  const [wishlistId, setWishlistId] = useState<string>("");
  const handleChange = useCallback(({ target }) => setWishlistId(target.value), []);
  const handleClick = useCallback(async () => {
    if (wishlistId && id) {
      await addMovieToWishlist({ variables: { id: wishlistId, movieId: id } });
      setWishlistId("");
    }
  }, [addMovieToWishlist, id, wishlistId]);

  useEffect(() => {
    if (user) {
      getWishlists();
    }
  }, [getWishlists, user]);

  return (
    <Card className={styles.wrapper}>
      <CardMedia className={styles.image} image={`${THE_MOVIE_LINK}/t/p/w220_and_h330_face${poster_path}`} component="img" alt={title} />
      <CardContent className={styles.overview}>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        <Typography gutterBottom>{overview}</Typography>
        <Typography>
          <b>{t('pages.movie.releaseDate')}: </b>
          {release_date}
        </Typography>
        <Typography>
          <b>{t('pages.movie.rating')}: </b>
          {`${vote_average} (${vote_count})`}
        </Typography>
        {dataWishlists?.wishlists && (
          <CardActions className={styles.actions}>
            <Select className={styles.select} value={wishlistId} onChange={handleChange} variant="standard">
              {dataWishlists.wishlists.map(({ name, _id }) =>
                <MenuItem key={_id} value={_id}>{name}</MenuItem>
              )}
            </Select>
            <Button className={styles.btn} variant="outlined" startIcon={<Favorite />} onClick={handleClick} disabled={!wishlistId}>
              {t('btns.addToWishlist')}
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
}

export default Movie;

