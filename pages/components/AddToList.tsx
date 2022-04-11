import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';
import contractAddress from '../../contractAddress';
import LiliansList from '../../abis/LiliansList.json';

const AddToList: React.FC = () => {
  const { Moralis } = useMoralis();
  const [input, setInput] = useState('');
  const createNewTask = async () => {
    const txn = await Moralis.Web3.executeFunction({
      contractAddress,
      abi: LiliansList.abi,
      functionName: 'addToList',
      params: { name: input },
    });
    await txn.wait();
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitting for', input);
        createNewTask();
      }}
    >
      <Input color="white" type="submit" display={'none'} />
      <FormControl
        color="white"
        padding="1.2rem 0px 0px"
        variant="floating"
        id="task-name"
        onChange={(e: React.FormEvent) => setInput(e.target.value)}
      >
        <Input placeholder=" " value={input} />
        <FormLabel padding="1.2rem 0px 0px">enter task</FormLabel>
      </FormControl>
    </form>
  );
};

export default AddToList;
