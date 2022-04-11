import React from 'react';
import { styled, Box, Text, Link } from '@chakra-ui/react';
import contractAddress from '../../contractAddress';

const Footer = () => (
  <Box
    as="footer"
    textAlign="center"
    borderTop="1px solid white"
    width="100%"
    padding="1rem 0"
    backgroundColor="rgba(255, 250, 250, 0.2)"
    zIndex={1000}
  >
    <Text fontSize="1.1rem">made with 💜 by lilian</Text>

    <Link
      target="_blank"
      href={`https://kovan.etherscan.io/address/${contractAddress}#code`}
      fontSize="0.7em"
    >
      view contract on etherscan
    </Link>
    <Text fontSize="0.7rem">deployed on kovan</Text>
  </Box>
);

export default Footer;
