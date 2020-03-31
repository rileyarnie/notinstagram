import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import Auth from "./components/auth";

const client = new ApolloClient({
  uri: "https://nottheinsta.herokuapp.com/graphql/",

  request: operation => {
    const token = localStorage.getItem("authToken") || "";
    operation.setContext({
      headers: {
        Authorization: `JWT ${token} `
      }
    });
  },

  fetchOptions: {
    credentials: "include"
  },

  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("authToken")
    }
  },

  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const IS_LOGGEDIN_QUERY = gql`
  query {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGEDIN_QUERY}>
      {({ data }) => (data.isLoggedIn ? <App /> : <Auth />)}
    </Query>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
