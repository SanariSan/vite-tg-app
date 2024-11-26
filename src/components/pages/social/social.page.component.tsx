import { memo, type FC } from 'react';
import { getRandomId } from 'src/helpers';
import { useTrackFirstMount } from 'src/hooks';

type TSocialComponent = {
  [key: string]: unknown;
};

const componentTag = getRandomId();
const SocialComponent: FC<TSocialComponent> = () => {
  const { isMounted } = useTrackFirstMount(componentTag);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#f1ff89',
        color: '#000',
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 300ms',
      }}
    >
      <h2 style={{ fontSize: '1.5rem' }}>Social screen</h2>
    </div>
  );
};

const SocialComponentMemo = memo(SocialComponent);

export { SocialComponentMemo };
