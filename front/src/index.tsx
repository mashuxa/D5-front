import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import App from './components/App/App';

import './styles/common.scss';
import { routes } from "./constants/routes";
import { UserProvider } from "./components/UserContext/UserContext";

const link = createHttpLink({
  uri: "http://localhost:4000/",
  credentials: "include",
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <UserProvider>
        <App>
          <Switch>
            {routes.map(({ hide, ...props }) => <Route {...props} />)}
          </Switch>
        </App>
      </UserProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
