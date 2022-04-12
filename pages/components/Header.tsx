import { Flex, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      padding="1rem"
      width="100%"
      borderBottom="1px solid white"
      backgroundColor="rgba(255, 250, 250, 0.3)"
    >
      <Heading fontSize="lg" maxWidth="250px" color="white">
        lilian&#39;s really expensive, really public web3 to-do list
      </Heading>
    </Flex>
  );
};

export default Header;
