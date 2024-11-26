import { memo, type FC } from 'react';
import { getRandomId } from 'src/helpers';
import { useTrackFirstMount } from 'src/hooks';

type TTasksComponent = {
  [key: string]: unknown;
};

const componentTag = getRandomId();
const TasksComponent: FC<TTasksComponent> = () => {
  const { isMounted } = useTrackFirstMount(componentTag);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#ffacdf',
        color: '#000',
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 300ms',
      }}
    >
      <h2 style={{ fontSize: '1.5rem' }}>Tasks screen</h2>
    </div>
  );
};

const TasksComponentMemo = memo(TasksComponent);

export { TasksComponentMemo };
