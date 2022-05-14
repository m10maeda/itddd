import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { createApplloClient } from '../libs';
import './styles.css';

const client = createApplloClient();

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Head>
      <title>Welcome to frontend!</title>
    </Head>
    <main className="app">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </main>
  </ApolloProvider>
);

export default CustomApp;
