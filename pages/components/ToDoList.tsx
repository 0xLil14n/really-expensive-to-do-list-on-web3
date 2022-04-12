import { Stack, Text } from '@chakra-ui/react';

import React from 'react';

import { useMoralis } from 'react-moralis';
import MetamaskLogin from './MetamaskLogin';
import AddToList from './AddToList';
import TaskList from './task-list/TaskList';

// TODO:
// empty state
// loading state for transactions
// fix vercel build
// support state reload after creatingNewTask
// After:
// support task deletion/archiving

const ToDoList: React.FC = () => {
  const { isAuthenticated } = useMoralis();

  const isLoggedIn = isAuthenticated;

  return (
    <>
      <Stack width="370px" justifyContent="center" padding="1rem">
        <TaskList />

        {isLoggedIn && <AddToList />}
        <MetamaskLogin />
      </Stack>
    </>
  );
};

export default ToDoList;
