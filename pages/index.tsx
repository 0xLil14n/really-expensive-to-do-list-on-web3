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
  >
    <Flex
      flexDirection="column"
      alignItems="center"
      minWidth="250px"
      minHeight="480px"
      width="100%"
      maxWidth="500px"
      height="100vh"
      position="relative"
      border="1px solid rgba(255,255,255,0.6)"
      borderRadius="0.5em"
    >
      <Header />
      <Stack
        justifyContent="center"
        height="60%"
        minHeight="200px"
        as="section"
        margin="5rem 0rem"
        maxWidth="500px"
      >
        <ToDoList />
      </Stack>
    </Flex>
    <Footer />
  </Flex>
);
export default Home;
