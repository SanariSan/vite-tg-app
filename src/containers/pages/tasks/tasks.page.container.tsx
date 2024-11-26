import type { FC } from 'react';
import { memo } from 'react';
import { TasksComponentMemo } from 'src/components/pages/tasks';

type TTasksContainer = {
  [key: string]: unknown;
};

const TasksContainer: FC<TTasksContainer> = () => {
  return <TasksComponentMemo />;
};

const TasksContainerMemo = memo(TasksContainer);

export default TasksContainerMemo;
