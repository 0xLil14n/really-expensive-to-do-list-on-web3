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
    height={'100%'}
    minHeight="100vh"
    color="white"
  >
    <Flex
      flexDirection="column"
      alignItems="center"
      minWidth="200px"
      minHeight="100vh"
      height="100%"
      width="100%"
      maxWidth="500px"
      position="relative"
      border="1px solid rgba(255,255,255,0.6)"
      borderRadius={['0', '0.5rem']}
    >
      <Header />
      <Stack
        position="relative"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        width="100%"
        as="section"
        maxWidth="500px"
      >
        <ToDoList />
      </Stack>
      <Footer />
    </Flex>
  </Flex>
);
export default Home;
