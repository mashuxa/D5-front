import { gql } from "@apollo/client";

export const REGISTRATION = gql(`
    mutation($record: CreateOneUserInput!) {
      registration(record: $record) {
        record {
          email
        }
      }
    }
`);

export const LOGIN = gql(`
    mutation($password: String, $email: String) {
        login(password: $password, email: $email) {
            email
            _id
        }
    }
`);
