import { ApolloClient, InMemoryCache } from '@apollo/client';

const createApplloClient = () =>
  new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    connectToDevTools: process.env.NODE_ENV === 'development',
  });

export default createApplloClient;
