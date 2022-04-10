import '../styles/globals.css';

import type { AppProps } from 'next/app';
import styled from 'styled-components';

import React from 'react';
import { ChakraProvider, CSSReset, Flex, Stack } from '@chakra-ui/react';

import List from './components/List';
import Header from './components/Header';
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Stack spacing={5} margin="12rem">
        <Header />
        <List />
      </Stack>
    </ChakraProvider>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 80vh;
  background: red;

  & > * {
    width: 23rem;
  }
`;

export default MyApp;
