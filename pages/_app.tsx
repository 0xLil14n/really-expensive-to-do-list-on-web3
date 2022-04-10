import '../styles/globals.css';

import type { AppProps } from 'next/app';

import React from 'react';
import { Box, ChakraProvider, CSSReset, Flex, Stack } from '@chakra-ui/react';

import List from './components/List';
import Header from './components/Header';

import Footer from './components/Footer';
import theme from './theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Flex
        flexDirection="column"
        alignItems="center"
        minWidth="300px"
        backgroundColor={'tomato'}
        height="100vh"
        position="relative"
      >
        <Header />
        <Stack
          justifyContent="center"
          as="section"
          margin="5rem 0rem"
          maxWidth="500px"
        >
          <List />
        </Stack>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
