import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import Movies from "../components/Movies/Movies";
import Movie from "../components/Movie/Movie";
import Wishlists from "../components/Wishlists/Wishlists";
import Wishlist from "../components/Wishlist/Wishlist";
import { Dashboard, Favorite, LocalMovies } from "@material-ui/icons";

export const paths = {
  login: "/login",
  signup: "/signup",
  main: "/",
  movies: "/movies",
  movie: "/movies/:id",
  wishlists: "/wishlists",
  wishlist: "/wishlists/:id",
};

export const routes = [
  {
    component: Login,
    exact: true,
    hide: true,
    key: "login",
    path: paths.login,
    authorizedOnly: false,
  },
  {
    component: Main,
    exact: true,
    hide: false,
    key: "main",
    path: paths.main,
    icon: <Dashboard />,
    authorizedOnly: false,
  },
  {
    component: Movies,
    exact: true,
    hide: false,
    key: "movies",
    path: paths.movies,
    icon: <LocalMovies />,
    authorizedOnly: false,
  },
  {
    component: Movie,
    exact: true,
    hide: true,
    key: "movie",
    path: paths.movie,
    authorizedOnly: false,
  },
  {
    component: Wishlists,
    exact: true,
    hide: false,
    key: "wishlists",
    path: paths.wishlists,
    icon: <Favorite color="action" />,
    authorizedOnly: true,
  },
  {
    component: Wishlist,
    exact: true,
    hide: true,
    key: "wishlist",
    path: paths.wishlist,
    authorizedOnly: true,
  },
];