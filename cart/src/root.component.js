import React from "react";
import Cart from "./Cart";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://befe.microapp.tk/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function Root(props) {
  return <ApolloProvider client={client} ><Cart /></ApolloProvider>
}
