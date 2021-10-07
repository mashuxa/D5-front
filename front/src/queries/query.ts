import { gql } from "@apollo/client";

export const GET_USER = gql(`
    query {
      user {
        email
        _id
      }
    }
`);

export const LOGOUT = gql(`
    query {
      logout {
        email
      }
    }
`);

export const GET_POPULAR_MOVIES = gql(`
    query Query($page: Int) {
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
    query Query($page: Int) {
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
    query Query($filters: MovieFilters) {
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

export const GET_GENRES = gql(`
    query {
      genres {
        genres {
          id
          name
        }
      }
    }
`);
