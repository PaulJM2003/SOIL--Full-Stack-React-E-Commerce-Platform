// admin-dashboard/src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  // Verify this URI is correct and CORS is allowed on backend
  cache: new InMemoryCache(),
});

export default client;

