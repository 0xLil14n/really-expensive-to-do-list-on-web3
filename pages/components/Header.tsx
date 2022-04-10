import { Heading, Text } from '@chakra-ui/react';

import React from 'react';
import contractAddress from '../../contractAddress';

const Header = () => {
  return (
    <>
      <Heading fontSize="2em">
        Lilian's Really Expensive, Really Public Web3 To-Do List
      </Heading>
      <Text fontSize="1.5em">because lol</Text>
    </>
  );
};

export default Header;
