import React from 'react';
import { styled, Box, Text } from '@chakra-ui/react';
import contractAddress from '../../contractAddress';

const Footer = () => (
  <Box
    as="footer"
    position={'absolute'}
    bottom={10}
    textAlign="center"
    left={0}
    right={0}
  >
    <Text fontSize="1.5em">Deployed on Kovan</Text>
    <a
      target="_blank"
      href={`https://kovan.etherscan.io/address/${contractAddress}#code`}
    >
      <Text fontSize="1.5em">view contract on etherscan </Text>
    </a>
  </Box>
);

export default Footer;
