import { Grid, Typography, Paper, Divider, Pagination } from "@material-ui/core";
import React, { useCallback } from "react";
import MovieCard, { IMovieProps } from "./MovieCard/MovieCard";
import styles from "./Section.module.scss";

interface ISectionProps {
  title: string;
  data?: IMovieProps[];
  totalPages?: number;
  page: number;
  setPage: (value: number) => void;
}

const Section: React.FC<ISectionProps> = ({ title, page, setPage, data = [], totalPages = 0 }) => {
  const onChangePage = useCallback((_, page: number) => setPage(page), [setPage]);

  return (
    <Grid item xs={12}>
      <Paper>
        <Typography className={styles.title}>{title}</Typography>
        <Divider/>
        <Grid className={styles.grid} container spacing="20">
          {data.map(({ id, ...props }) => (
            <Grid key={id} item xs={6} sm={3} md={"auto"}>
              <MovieCard id={id} {...props} />
            </Grid>
          ))}
        </Grid>
        <Pagination className={styles.pagination} page={page} count={totalPages} onChange={onChangePage} shape="rounded"/>
      </Paper>
    </Grid>
  );
}

export default Section;

