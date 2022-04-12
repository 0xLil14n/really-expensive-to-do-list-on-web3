import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import styled from 'styled-components';

type Props = {
  isLoading: boolean;
};

const LoadingState: React.FC<Props> = ({ isLoading }) =>
  isLoading ? (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      height="100%"
      width="100%"
      borderRadius={'0.5rem'}
      margin="0 !important"
      display="flex"
      flexDirection="column"
      left={0}
      right={0}
      backgroundColor="rgba(0,0,0,0.7)"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner marginBottom="1rem" size="md" color="white" />
      <Text>loading on chain tasks...</Text>
    </Box>
  ) : null;

export default LoadingState;
