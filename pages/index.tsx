import { Box, Flex, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Footer from './components/Footer';
import Header from './components/Header';
import ToDoList from './components/ToDoList';

const Home: NextPage = () => (
  <Flex
    backgroundColor="tomato"
    alignItems="center"
    justifyContent="center"
    width="100%"
    height="100vh"
    minHeight="100vh"
    color="white"
  >
    <Flex
      flexDirection="column"
      alignItems="center"
      minWidth="200px"
      minHeight="100vh"
      width="100%"
      maxWidth="500px"
      height="100%"
      position="relative"
      border="1px solid rgba(255,255,255,0.6)"
      borderRadius="0.5em"
    >
      <Header />
      <Stack
        justifyContent="center"
        height="100%"
        as="section"
        marginBottom="0.7rem"
        maxWidth="500px"
      >
        <ToDoList />
      </Stack>
      <Footer />
    </Flex>
  </Flex>
);
export default Home;
