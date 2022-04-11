import {
  Checkbox,
  Spinner,
  Input,
  Text,
  Stack,
  FormLabel,
  FormControl,
  Flex,
  Button,
} from '@chakra-ui/react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import React, { useEffect, useState } from 'react';
import LiliansList from '../../abis/LiliansList.json';
import contractAddress from '../../contractAddress';
import { MoralisProvider, useMoralis } from 'react-moralis';
import MetamaskLogin from './MetamaskLogin';

type ToDoItem = {
  name: string;
  isDone: boolen;
};

// TODO:
// empty state
// on submit, enter task
// loading state for transactions

const NODE_URL =
  'https://speedy-nodes-nyc.moralis.io/72216de496ff399faf1f925a/avalanche/testnet';

// const provider = new ethers.providers.JsonRpcProvider(NODE_URL);

const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  'https://kovan.infura.io/v3/0150f5b8462544b8acf6fc2e7b8dc290';
// TODO env file, lmao gotta add this to my todo list smdh

const ToDoList: React.FC = () => {
  const {
    account,
    isWeb3Enabled,
    isAuthenticated,
    enableWeb3,
    authenticate,
    logout,
    isAuthenticating,
    isWeb3EnableLoading,
    network,
    chainId,
    Moralis,
  } = useMoralis();
  const isLoading = isAuthenticating || isWeb3EnableLoading;
  const isLoggedIn = isAuthenticated || isWeb3Enabled;
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<Web3.Contract | null>(null);
  const [input, setInput] = useState('');

  const [setIsDoneFn, setSetIsDoneFn] = useState<() => any>(() => undefined);
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const setToDone = async (name: string) => {
    await (async () => {
      console.log('setting 2 done for', input);
      console.log('account', account);
      if (isLoggedIn) {
        console.log('is authed?', isAuthenticated);
        console.log('is enbled?', isWeb3Enabled);
        console.log('chainId?', chainId);
        console.log('setting 2 done for', name);
        const txn = await Moralis.Web3.executeFunction({
          contractAddress,
          abi: LiliansList.abi,
          functionName: 'setToDone',
          params: { name },
        });
        await txn.wait();
      }
    })();
  };
  const createNewTask = async () => {
    const txn = await Moralis.Web3.executeFunction({
      contractAddress,
      abi: LiliansList.abi,
      functionName: 'addToList',
      params: { name: input },
    });
    await txn.wait();
  };
  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3();
    }
  }, [isAuthenticated]);
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

    setContract(liliansListContract);

    const taskNamesMethod = liliansListContract.methods.taskNames;
    const getIsDone = liliansListContract.methods.getIsDone;

    let newTasks: ToDoItem[] = [];

    (async () => {
      const length = await liliansListContract.methods.length().call();
      let index = 0;
      console.log('index', index);
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
      <Stack justifyContent="center" margin="0px">
        <Text fontSize={32}>to do:</Text>

        <Stack
          minHeight="100px"
          backgroundColor="rgba(255, 250, 250, 0.3)"
          borderRadius="0.5rem"
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
                name={name}
                isChecked={isDone}
                isDisabled={!isLoggedIn}
                onChange={(e) => {
                  e.preventDefault();
                  setToDone(e.target.name);
                  console.log('e is', e.target.name);
                }}
                key={name}
                padding="1rem"
              >
                {name}
              </Checkbox>
            ))}
        </Stack>

        {isLoggedIn && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submitting for', input);
              createNewTask();
            }}
          >
            <Input type="submit" display={'none'} />
            <FormControl
              padding="1.2rem 0px 0px"
              variant="floating"
              id="task-name"
              onChange={(e: React.FormEvent) => setInput(e.target.value)}
            >
              <Input placeholder=" " value={input} />
              <FormLabel padding="1.2rem 0px 0px">enter task</FormLabel>
            </FormControl>
          </form>
        )}
        {!isLoggedIn && <MetamaskLogin />}
      </Stack>
    </>
  );
};

export default ToDoList;
