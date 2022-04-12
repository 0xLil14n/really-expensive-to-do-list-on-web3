import { Checkbox, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Web3 from 'web3';
import contractAddress from '../../../contractAddress';
import LiliansList from '../../../abis/LiliansList.json';
import { setIsDone } from '../../contractInteractions/contract';
import LoadingState from './LoadingState';
import TaskItem from './TaskItem';
const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  'https://kovan.infura.io/v3/0150f5b8462544b8acf6fc2e7b8dc290';
// TODO env file, lmao gotta add this to my todo list smdh

const TaskList = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ToDoItem[]>([]);

  const { isAuthenticated } = useMoralis();
  const isLoggedIn = isAuthenticated;

  useEffect(() => {
    setLoading(true);

    const web3 = new Web3(KOVAN_RPC_URL);

    const liliansListContract = new web3.eth.Contract(
      LiliansList.abi as AbiItem[],
      contractAddress
    );

    const getLength = liliansListContract.methods.length;
    const getTask = liliansListContract.methods.getTask;
    /*
        using web3 here instead of moralis calls
        because moralis is high-key trash
        and it crashes when the web3 provider isn't initialized
        but also has issues with the asynch part of enabling web3
    */

    let newTasks: ToDoItem[] = [];

    (async () => {
      const length = await getLength().call();
      let index = 0;
      while (index < length) {
        const { 0: name, 1: isDone } = await getTask(index).call();
        newTasks.push({ name, isDone });
        index += 1;
      }
    })().then(() => {
      console.log('setting tasks', newTasks);
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
        <TaskItem tasks={tasks} isLoggedIn={isLoggedIn} />
        <LoadingState isLoading={loading} />
      </Stack>
    </>
  );
};

export default TaskList;
