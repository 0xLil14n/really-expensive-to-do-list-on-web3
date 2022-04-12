import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createNewTask } from '../../contractInteractions/contract';

const AddToList: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createNewTask(input);
      }}
    >
      <Input color="white" type="submit" display={'none'} />
      <FormControl
        color="white"
        padding="1.2rem 0px 0px"
        variant="floating"
        id="task-name"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setInput(target.value);
        }}
      >
        <Input placeholder=" " />
        <FormLabel padding="1.2rem 0px 0px">enter task</FormLabel>
      </FormControl>
    </form>
  );
};

export default AddToList;
