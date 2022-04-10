import React from 'react';
import { styled, Box, Text, Link } from '@chakra-ui/react';
import contractAddress from '../../contractAddress';

const Footer = () => (
  <Box
    as="footer"
    position={'absolute'}
    bottom={10}
    textAlign="center"
    left={0}
    right={0}
    borderTop="1px solid purple"
    padding="20px 0px 0px"
  >
    <Text fontSize="1.4em">made with 💜 by lilian</Text>
    {/* <Text fontSize="1em">deployed on kovan</Text> */}
    <Link
      target="_blank"
      href={`https://kovan.etherscan.io/address/${contractAddress}#code`}
      fontSize="0.9em"
    >
      {/* <Text fontSize="1em">view contract on etherscan </Text> */}
      view contract on etherscan
    </Link>
  </Box>
);

export default Footer;
