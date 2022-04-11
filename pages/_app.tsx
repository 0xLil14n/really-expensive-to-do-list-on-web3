import '../styles/globals.css';

import type { AppProps } from 'next/app';

import React from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import theme from './theme';
import { MoralisProvider } from 'react-moralis';
import MetamaskLogin from './components/MetamaskLogin';

// defaults to lilian's moralis App ID and server URL
// TODO: configure the defaults in the nginx config and/or if we move to nextjs, in vercel
const APP_ID =
  (process.env.REACT_APP_MORALIS_APP_ID as string) ??
  'DBofksEwejwcrHGi5N32hSsPKniOy46jV4aeIIOO';
const SERVER_URL =
  (process.env.REACT_APP_MORALIS_SERVER_URL as string) ??
  'https://ww8ofdl0e4tg.usemoralis.com:2053/server';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId="DBofksEwejwcrHGi5N32hSsPKniOy46jV4aeIIOO"
      serverUrl="https://ww8ofdl0e4tg.usemoralis.com:2053/server"
    >
      <ChakraProvider theme={theme}>
        <CSSReset />
        {/* <MetamaskLogin /> */}
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default MyApp;
