import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POPULAR_MOVIES, GET_UPCOMING_MOVIES } from "../../queries/movie";
import Section from "./Section/Section";
import { IMoviesResult } from "../MovieCard/MovieCard";

interface IPopularQuery {
  popularMovies: IMoviesResult;
}
interface IUpcomingQuery {
  upcomingMovies: IMoviesResult;
}

const Main: React.FC = () => {
  const [popularPage, setPopularPage] = useState<number>(1);
  const [upcomingPage, setUpcomingPage] = useState<number>(1);
  const { data: popular } = useQuery<IPopularQuery>(GET_POPULAR_MOVIES, {
    variables: { page: popularPage }
  });
  const { data: upcoming } = useQuery<IUpcomingQuery>(GET_UPCOMING_MOVIES, {
    variables: { page: upcomingPage }
  });

  return (
    <Grid container spacing="20">
      <Section
        title={"MOST POPULAR"}
        data={popular?.popularMovies.results}
        page={popularPage}
        setPage={setPopularPage}
        totalPages={popular?.popularMovies.total_pages}
      />
      <Section
        title={"MOST UPCOMING"}
        data={upcoming?.upcomingMovies.results}
        page={upcomingPage}
        setPage={setUpcomingPage}
        totalPages={popular?.popularMovies.total_pages}
      />
    </Grid>
  );
}

export default Main;

