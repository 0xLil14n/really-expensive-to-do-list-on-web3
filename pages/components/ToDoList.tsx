import { Stack } from '@chakra-ui/react';

import React from 'react';

import { useMoralis } from 'react-moralis';
import MetamaskLogin from './MetamaskLogin';
import AddToList from './AddToList';
import TaskList from './TaskList';

// TODO:
// empty state
// loading state for transactions
// fix vercel build
// support state reload after creatingNewTask
// After:
// support task deletion/archiving

const ToDoList: React.FC = () => {
  const { isWeb3Enabled, isAuthenticated } = useMoralis();

  const isLoggedIn = isAuthenticated || isWeb3Enabled;

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
