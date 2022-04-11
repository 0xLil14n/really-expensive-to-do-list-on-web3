import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useMoralis } from 'react-moralis';

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
    if (isAuthenticated) {
      enableWeb3();
    }
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
