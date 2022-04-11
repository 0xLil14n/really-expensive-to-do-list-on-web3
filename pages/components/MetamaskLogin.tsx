import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useMoralis } from 'react-moralis';
import styled from 'styled-components';

const MetamaskLogin = () => {
  const {
    isWeb3Enabled,
    isAuthenticated,
    enableWeb3,
    authenticate,
    logout,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();
  const isLoading = isAuthenticating || isWeb3EnableLoading;
  const isLoggedIn = isAuthenticated;
  const enableAndAuthenticate = async () => {
    await enableWeb3();
    await authenticate().then(() => console.log('authenticated'));
  };
  const signInOrSignOut = () => {
    if (!isWeb3Enabled || !isAuthenticated) {
      enableAndAuthenticate();
    } else {
      logout();
    }
  };

  useEffect(() => {
    console.log('here1 authed', isAuthenticated);
    if (isAuthenticated) {
      enableWeb3();
      console.log('enablingweb3');
    }
    console.log('here2 authed', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={isAuthenticating}
        onClick={signInOrSignOut}
      >
        {isLoading
          ? 'Loading...'
          : isLoggedIn || isWeb3Enabled
          ? 'Disconnect'
          : `Connect${'\u00A0'}Wallet`}
      </Button>
    </>
  );
};

export default MetamaskLogin;
