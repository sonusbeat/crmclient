import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "node-fetch";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: HttpLink({
    uri: "http://localhost:4000/",
    fetch
  }),
});

export default client;