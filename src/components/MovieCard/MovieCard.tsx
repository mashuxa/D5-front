import { Card, Button, Typography, CardMedia, CardContent, CardActions } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import { THE_MOVIE_LINK } from "../../constants/common";
import styles from "./MovieCard.module.scss";
import { paths } from "../../constants/routes";
import { useTranslation } from "react-i18next";

export interface IMovieProps {
  id: number;
  language: string;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  original_title: string;
  title: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface IMoviesResult {
  results: IMovieProps[];
  total_pages: number;
}

const MovieCard: React.FC<IMovieProps> = ({ id, title, overview, poster_path}) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.wrapper}>
      <CardMedia
        component="img"
        image={`${THE_MOVIE_LINK}/t/p/w220_and_h330_face${poster_path}`}
        alt={title}
      />
      <CardContent>
        <Typography className={styles.title} variant="h6" title={title}>
          {title}
        </Typography>
        <Typography className={styles.text} variant="body2" color="text.secondary" title={overview}>
          {overview}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button size="small" component={NavLink} to={paths.movie.replace(":id", id.toString())} variant="outlined">
          {t("btns.showMore")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

