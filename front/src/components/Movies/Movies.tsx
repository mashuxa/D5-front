import React, { useCallback, useMemo, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { useFormik } from 'formik';
import { useQuery } from "@apollo/client";
import { GET_MOVIES_BY_FILTER } from "../../queries/movie";
import { GET_GENRES } from "../../queries/genres";
import { OLDEST_YEAR } from "../../constants/common";
import { getRangeYear } from "../../utils/dates";
import sortValues from "../../constants/sortValues";
import MovieCard, { IMoviesResult } from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import styles from "./Movies.module.scss";

interface IGenre {
  id: number;
  name: string;
}

interface IGenresQuery {
  genres: {
    genres: IGenre[];
  };
}

interface IMoviesByFilterQuery {
  moviesByFilters: IMoviesResult;
}

const initialValues = {
  year: undefined,
  withGenres: [],
  withoutGenres: [],
  voteAverage: 5,
  sortBy: sortValues[0]
};
const years = getRangeYear(new Date().getFullYear(), OLDEST_YEAR);

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { data: genresData } = useQuery<IGenresQuery>(GET_GENRES);
  const genres = useMemo(() => genresData?.genres.genres || [], [genresData?.genres.genres]);
  const formik = useFormik({ initialValues, onSubmit: console.warn });
  const handleSliderChange = useCallback((_, value) => formik.setFieldValue('voteAverage', value), [formik]);
  const { data: moviesData } = useQuery<IMoviesByFilterQuery>(GET_MOVIES_BY_FILTER, {
    variables: {
      filters: {
        page,
        sort_by: formik.values.sortBy,
        year: formik.values.year,
        with_genres: formik.values.withGenres.join(','),
        without_genres: formik.values.withoutGenres.join(','),
        vote_average: {
          gte: formik.values.voteAverage,
        }
      }
    }
  });
  const movies = useMemo(() => moviesData?.moviesByFilters.results || [], [moviesData?.moviesByFilters.results]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid className={styles.wrapper} item xs={12} sm={3}>
          <FormControl className={styles.item} fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              name="year"
              value={formik.values.year || ''}
              label="Year"
              onChange={formik.handleChange}
            >
              {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={styles.item} fullWidth>
            <InputLabel>With genres</InputLabel>
            <Select
              disabled={!genres.length}
              multiple
              name="withGenres"
              value={formik.values.withGenres}
              label="With genres"
              onChange={formik.handleChange}
            >
              {genres.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={styles.item} fullWidth>
            <InputLabel>Without genres</InputLabel>
            <Select
              disabled={!genres.length}
              multiple
              name="withoutGenres"
              value={formik.values.withoutGenres}
              label="Without genres"
              onChange={formik.handleChange}
            >
              {genres.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={styles.item} fullWidth>
            <Typography>Vote average more then:</Typography>
            <Slider
              value={formik.values.voteAverage}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={10}
              marks
            />
          </FormControl>
          <FormControl className={styles.item} fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              name="sortBy"
              value={formik.values.sortBy}
              label="Sort by"
              onChange={formik.handleChange}
            >
              {sortValues.map((value, i) => (
                <MenuItem key={value} value={value}>
                  {value}
                  {i % 2 ? <ArrowDropUp/> : <ArrowDropDown/>}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid className={styles.wrapper} container spacing={1}>
            {movies.map(({ id, ...props }) => (
              <Grid key={id} item xs={12} sm={2}>
                <MovieCard id={id} {...props} />
              </Grid>
            ))}
          </Grid>
          <Pagination page={page} count={moviesData?.moviesByFilters.total_pages} onChange={setPage} />
        </Grid>
      </Grid>
    </form>
  );
}

export default Movies;
