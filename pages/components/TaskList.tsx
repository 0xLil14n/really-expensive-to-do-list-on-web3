import { Checkbox, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Web3 from 'web3';
import contractAddress from '../../contractAddress';
import LiliansList from '../../abis/LiliansList.json';
import setToDone from '../contractInteractions/setToDone';
const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  'https://kovan.infura.io/v3/0150f5b8462544b8acf6fc2e7b8dc290';
// TODO env file, lmao gotta add this to my todo list smdh

type ToDoItem = {
  name: string;
  isDone: boolean;
};
const TaskList = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const {
    account,
    isWeb3Enabled,
    isAuthenticated,
    enableWeb3,
    authenticate,
    logout,
    isAuthenticating,
    isWeb3EnableLoading,
    chainId,
    Moralis,
  } = useMoralis();
  const isLoggedIn = isAuthenticated;

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated) {
      enableWeb3();
    }

    const web3 = new Web3(KOVAN_RPC_URL);

    const liliansListContract = new web3.eth.Contract(
      LiliansList.abi as AbiItem[],
      contractAddress
    );

    const taskNamesMethod = liliansListContract.methods.taskNames;
    const getIsDone = liliansListContract.methods.getIsDone;

    let newTasks: ToDoItem[] = [];

    (async () => {
      const length = await liliansListContract.methods.length().call();
      let index = 0;
      while (index < length) {
        const name = await taskNamesMethod(index).call();
        const isDone = await getIsDone(name).call();

        newTasks.push({ name, isDone });
        index += 1;
      }
    })().then(() => {
      setTasks(newTasks);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Text color="white" fontSize={'2xl'}>
        to do:
      </Text>

      <Stack
        minHeight="100px"
        backgroundColor="rgba(255, 250, 250, 0.3)"
        borderRadius="0.5rem"
        padding="1rem"
      >
        {loading && (
          <Flex alignItems="center" justifyContent="center">
            <Text>loading on chain tasks...</Text>
            <Spinner size="md" color="white" />
          </Flex>
        )}

        {!loading &&
          tasks.map(({ name, isDone }) => (
            <Checkbox
              color="white"
              name={name}
              isChecked={isDone}
              isDisabled={!isLoggedIn}
              onChange={(e) => {
                e.preventDefault();
                console.log('name isdfae', e.target.name);
                setToDone(e.target.name);
              }}
              key={name}
            >
              {name}
            </Checkbox>
          ))}
      </Stack>
    </>
  );
};

export default TaskList;
