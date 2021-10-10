import { gql } from "@apollo/client";

export const GET_WISHLIST = gql(`
    query($id: String) {
      wishlist(id: $id) {
        _id
        name
        movies
        }
      }
`);

export const GET_WISHLISTS = gql(`
    query{
      wishlists {
        _id
        name
        movies
        }
      }
`);

export const CREATE_WISHLIST = gql(`
    mutation($name: String) {
      wishlistCreate(name: $name) {
        _id
        name
        movies
        }
      }
`);

export const UPDATE_WISHLIST = gql(`
    mutation($id: String, $name: String) {
      wishlistUpdate(id: $id, name: $name) {
        _id
        name
        movies
        }
      }
`);

export const DELETE_WISHLIST = gql(`
    mutation($id: String) {
      wishlistDelete(id: $id) {
        _id
        name
        movies
        }
      }
`);

export const ADD_MOVIE_TO_WISHLIST = gql(`
    mutation($id: String, $movieId: String) {
      addMovieToWishlist(id: $id, movieId: $movieId) {
        _id
        name
        movies
        }
      }
`);

export const DELETE_MOVIE_FROM_WISHLIST = gql(`
    mutation($id: String, $movieId: String) {
      deleteMovieFromWishlist(id: $id, movieId: $movieId) {
        _id
        name
        movies
        }
      }
`);