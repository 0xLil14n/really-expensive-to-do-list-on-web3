import {
  Checkbox,
  Spinner,
  Input,
  Text,
  Stack,
  FormLabel,
  FormControl,
  Flex,
} from '@chakra-ui/react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import React, { useEffect, useState } from 'react';
import LiliansList from '../../abis/LiliansList.json';
import contractAddress from '../../contractAddress';
import { useMoralis } from 'react-moralis';

type ToDoItem = {
  name: string;
  isDone: boolen;
};

// TODO:
// empty state
// on submit, enter task

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
    Moralis,
  } = useMoralis();
  const isLoading = isAuthenticating || isWeb3EnableLoading;
  const isLoggedIn = isAuthenticated;
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<Web3.Contract | null>(null);

  const [setIsDoneFn, setSetIsDoneFn] = useState<() => any>(
    () => (_: string) => undefined
  );
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const updateIsDone = async (name: string) => {
    const isDone = await setIsDoneFn(name);

    // const isDone = await contract.methods.setToDone(name).call();
    alert('getisdone:' + isDone);
  };

  useEffect(() => {
    setLoading(true);
    Moralis.enableWeb3();
    authenticate();
    const web3 = new Web3(KOVAN_RPC_URL);

    const liliansListContract = new web3.eth.Contract(
      LiliansList.abi as AbiItem[],
      contractAddress
    );

    setContract(liliansListContract);

    const taskNamesMethod = liliansListContract.methods.taskNames;
    const getIsDone = liliansListContract.methods.getIsDone;
    const setToDone = liliansListContract.methods.setToDone;
    setSetIsDoneFn(() => async (x: string) => {
      console.log('setting 2 done for', x);
      console.log('account', account);

      Moralis.executeFunction({
        contractAddress,
        abi: LiliansList.abi,
        functionName: 'setIsDone',
        params: { name: x },
      });

      // setToDone(x).send({ from: account });
    });

    let index = 3; // || liliansListContract.methods.length.call() - 1; // TODO fix

    let newTasks: ToDoItem[] = [];

    (async () => {
      while (index >= 0) {
        const name = await taskNamesMethod(index).call();
        const isDone = await getIsDone(name).call();

        newTasks.push({ name, isDone });
        index -= 1;
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
          <div>account:{account}</div>
          {!loading &&
            tasks.map(({ name, isDone }) => (
              <Checkbox
                name={name}
                isChecked={isDone}
                onChange={(e) => {
                  e.preventDefault();
                  updateIsDone(e.target.name);
                  console.log('e is', e.target.name);
                }}
                key={name}
                padding="1rem"
              >
                {name}
              </Checkbox>
            ))}
        </Stack>

        <FormControl padding="1.2rem 0px 0px" variant="floating" id="task-name">
          <Input placeholder=" " />
          <FormLabel padding="1.2rem 0px 0px">enter task</FormLabel>
        </FormControl>
      </Stack>
    </>
  );
};

export default ToDoList;
