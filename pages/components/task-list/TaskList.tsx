import { Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import contractAddress from '../../../contractAddress';
import LiliansList from '../../../abis/LiliansList.json';

import LoadingState from './LoadingState';
import TaskItem from './TaskItem';

const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  'https://kovan.infura.io/v3/0150f5b8462544b8acf6fc2e7b8dc290';
// TODO env file, lmao gotta add this to my todo list smdh

const KOVAN_WEBSOCKET =
  process.env.KOVAN_WEBSOCKET ||
  'wss://kovan.infura.io/ws/v3/0150f5b8462544b8acf6fc2e7b8dc290';
export type ToDoItem = {
  name: string;
  isDone: boolean;
};

export const refreshTaskList = async () => {
  const web3 = new Web3(KOVAN_WEBSOCKET);

  const liliansListContract = new web3.eth.Contract(
    LiliansList.abi as AbiItem[],
    contractAddress
  );

  const getLength = liliansListContract.methods.length;
  const getTask = liliansListContract.methods.getTask;
  /*
      using web3 here instead of moralis calls
      because moralis is high-key trash (or is it me thats trash?)
      and it crashes when the web3 provider isn't initialized
      but also has issues with the asynch part of enabling web3
  */

  let newTasks: ToDoItem[] = [];

  await (async () => {
    const length = await getLength().call();
    let index = 0;
    while (index < length) {
      const { 0: name, 1: isDone } = await getTask(index).call();
      newTasks.push({ name, isDone });
      index += 1;
    }
  })();
  return newTasks;
};
type Props = {
  setIsNotSubmitting: () => void;
};
const TaskList: React.FC<Props> = ({ setIsNotSubmitting }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ToDoItem[]>([]);

  const { isAuthenticated } = useMoralis();
  const isLoggedIn = isAuthenticated;

  useEffect(() => {
    setLoading(true);

    const updateList = () =>
      refreshTaskList().then((newTasks) => {
        setTasks(newTasks);
        setLoading(false);
      });

    updateList();

    const web3 = new Web3(KOVAN_WEBSOCKET);

    const liliansListContract = new web3.eth.Contract(
      LiliansList.abi as AbiItem[],
      contractAddress
    );
    (async () => {
      // TODO
      // delet duplicate code
      // optimize refresh to only get relevant updates
      // fix "any" types  😏
      const latest = await web3.eth.getBlockNumber();
      liliansListContract.events.allEvents(
        { fromBlock: latest },
        (error: any, event: any) => {
          switch (event.event) {
            case 'TaskCreated':
              setIsNotSubmitting();
            default:
              // all events should call updateList rn, but this should be optimized
              updateList();
          }
        }
      );
    })();
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
