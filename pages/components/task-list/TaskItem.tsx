import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { setIsDone } from '../../contractInteractions/contract';

type ToDoItem = {
  name: string;
  isDone: boolean;
};
type Props = {
  tasks: ToDoItem[];
  isLoggedIn: boolean;
};

const TaskItem: React.FC<Props> = ({ tasks, isLoggedIn }) => (
  <>
    {tasks.map(({ name, isDone }) => (
      <Checkbox
        color="white"
        name={name}
        isChecked={isDone}
        isDisabled={!isLoggedIn}
        onChange={(e) => {
          e.preventDefault();
          setIsDone(e.target.name, isDone);
        }}
        key={name}
      >
        {name}
      </Checkbox>
    ))}
  </>
);

export default TaskItem;
