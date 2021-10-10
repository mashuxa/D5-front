import { gql } from "@apollo/client";

export const GET_POPULAR_MOVIES = gql(`
    query($page: Int) {
      popularMovies(page: $page) {
        page
        results {
          id
          language
          poster_path
          adult
          overview
          release_date
          genre_ids
          original_title
          title
          popularity
          vote_count
          video
          vote_average
        }
        total_pages
        total_results
      }
    }
`);

export const GET_UPCOMING_MOVIES = gql(`
    query($page: Int) {
      upcomingMovies(page: $page) {
        page
        results {
          id
          language
          poster_path
          adult
          overview
          release_date
          genre_ids
          original_title
          title
          popularity
          vote_count
          video
          vote_average
        }
        total_pages
        total_results
      }
    }
`);

export const GET_MOVIES_BY_FILTER = gql(`
    query($filters: MovieFilters) {
      moviesByFilters(filters: $filters) {
        page
        results {
          id
          language
          poster_path
          adult
          overview
          release_date
          genre_ids
          original_title
          title
          popularity
          vote_count
          video
          vote_average
        }
        total_results
        total_pages
        }
      }
`);

export const GET_MOVIE_BY_ID = gql(`
    query($id: String) {
      movieById(id: $id) {
        id
        language
        poster_path
        adult
        overview
        release_date
        genre_ids
        original_title
        title
        popularity
        vote_count
        video
        vote_average
      }
    }
`);
