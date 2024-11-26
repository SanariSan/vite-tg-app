import { getRandomId } from 'src/helpers';
import { useTrackFirstMount } from 'src/hooks';

const componentTag = getRandomId();
const Screen1 = () => {
  const { isMounted } = useTrackFirstMount(componentTag);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#dbeafe',
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 300ms',
      }}
    >
      <h2 style={{ fontSize: '1.5rem' }}>Screen 1</h2>
    </div>
  );
};

export default Screen1;
