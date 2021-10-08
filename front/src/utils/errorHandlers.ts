import { GraphQLError } from "graphql";
import { AuthErrors } from "../constants/errors";
import { history } from "../index";

export const commonErrorHandler = ({ extensions }: GraphQLError) => {
  if (extensions && Object.values(AuthErrors).includes(extensions.code)) {
    history.replace('/login');
  }
};
