import { Stack } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import contractAddress from '../../contractAddress';
import { useMoralis } from 'react-moralis';
import MetamaskLogin from './MetamaskLogin';
import AddToList from './AddToList';
import TaskList from './TaskList';

// TODO:
// empty state
// loading state for transactions
// support unchecking items

const ToDoList: React.FC = () => {
  const { isWeb3Enabled, isAuthenticated, enableWeb3, Moralis } = useMoralis();

  const isLoggedIn = isAuthenticated || isWeb3Enabled;

  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Stack justifyContent="center" margin="0px" padding="1rem">
        <TaskList />

        {isLoggedIn ? <AddToList /> : <MetamaskLogin />}
      </Stack>
    </>
  );
};

export default ToDoList;
