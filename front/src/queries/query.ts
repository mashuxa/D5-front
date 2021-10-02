import { gql } from "@apollo/client";

export const GET_USER = gql(`
    query {
      getUser {
        email
        _id
      }
    }
`);

export const LOGOUT = gql(`
    query {
      logOut {
        email
      }
    }
`);
