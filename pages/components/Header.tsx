import { Flex, Heading } from '@chakra-ui/react';

import React from 'react';

const Header = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt="1rem"
      maxWidth="320px"
      position="absolute"
      left="2rem"
    >
      <Heading fontSize="1.5em">
        lilian's really expensive, really public web3 to-do list
      </Heading>
    </Flex>
  );
};

export default Header;
