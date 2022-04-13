import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createNewTask } from '../../contractInteractions/contract';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: () => void;
};
const AddToList: React.FC<Props> = ({ isSubmitting, setIsSubmitting }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitting();
        createNewTask(input).then((response) => {
          console.log(response);
          setIsLoading(false);
          setInput('');
        });
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
        <Input placeholder=" " onChange={() => {}} value={input} />
        <FormLabel padding="1.2rem 0px 0px">enter task</FormLabel>
      </FormControl>
      {isSubmitting && (
        <Flex
          borderRadius="0.1rem"
          padding="0.5rem"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xs" marginRight="0.5rem" />
          <Text fontSize="xs">submitting task...</Text>
        </Flex>
      )}
    </form>
  );
};

export default AddToList;
