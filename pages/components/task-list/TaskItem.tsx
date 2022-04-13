import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { setIsDone } from '../../../contractInteractions/contract';
import { ToDoItem } from './TaskList';

type Props = {
  tasks: ToDoItem[];
  isLoggedIn: boolean;
};

const TaskItem: React.FC<Props> = ({ tasks, isLoggedIn }) => (
  <>
    {tasks &&
      tasks.map(({ name, isDone }, index) => (
        <Checkbox
          color="white"
          name={name}
          isChecked={isDone}
          isDisabled={!isLoggedIn}
          onChange={(e) => {
            e.preventDefault();
            setIsDone(e.target.name, isDone);
          }}
          key={name + index}
        >
          {name}
        </Checkbox>
      ))}
  </>
);

export default TaskItem;
