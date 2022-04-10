import { Checkbox, Input, Stack } from '@chakra-ui/react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import React, { useEffect, useState } from 'react';
import LiliansList from '../../abis/LiliansList.json';
import contractAddress from '../../contractAddress';

type ToDoItem = {
  name: string;
  isDone: boolen;
};

const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  'https://kovan.infura.io/v3/0150f5b8462544b8acf6fc2e7b8dc290';
// TODO env file, lmao gotta add this to my todo list smdh

const List: React.FC = () => {
  const [contract, setContract] = useState<Web3.Contract | null>(null);
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  useEffect(() => {
    const web3 = new Web3(KOVAN_RPC_URL);
    const liliansListContract = new web3.eth.Contract(
      LiliansList.abi as AbiItem[],

      contractAddress
    );
    setContract(liliansListContract);

    const mthod = liliansListContract.methods.taskNames;
    let index = 3 || liliansListContract.methods.length.call() - 1; // TODO fix

    let newTasks: ToDoItem[] = [];

    (async () => {
      while (index >= 0) {
        const name = await mthod(index).call();

        newTasks.push({ name, isDone: true });
        index -= 1;
      }
    })().then(() => setTasks(newTasks));
  }, []);
  return (
    <>
      <Input placeholder="enter task" />

      <Stack margin="0px">
        {tasks.map(({ name, isDone }) => (
          <Checkbox name={name} checked={isDone} key={name} padding="1rem 0">
            {name}
          </Checkbox>
        ))}
      </Stack>
    </>
  );
};

export default List;
