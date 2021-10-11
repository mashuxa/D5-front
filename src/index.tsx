import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, from } from "@apollo/client";
import App from "./components/App/App";
import { onError } from "@apollo/client/link/error";

import "./styles/common.scss";
import { routes } from "./constants/routes";
import { UserProvider } from "./components/UserContext/UserContext";
import { commonErrorHandler } from "./utils/errorHandlers";

export const history = createBrowserHistory();
const link = createHttpLink({
  uri: "http://localhost:4000/",
  credentials: "include",
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
     graphQLErrors.forEach(commonErrorHandler);
   }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
 });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, link])
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <UserProvider>
        <App>
          <Switch>
            {routes.map(({ hide, ...props }) => <Route {...props} />)}
          </Switch>
        </App>
      </UserProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
