import { memo, type FC } from 'react';
import { getRandomId } from 'src/helpers';
import { useTrackFirstMount } from 'src/hooks';

type TShopComponent = {
  [key: string]: unknown;
};

const componentTag = getRandomId();
const ShopComponent: FC<TShopComponent> = () => {
  const { isMounted } = useTrackFirstMount(componentTag);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#89ffa2',
        color: '#000',
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 300ms',
      }}
    >
      <h2 style={{ fontSize: '1.5rem' }}>Shop screen</h2>
    </div>
  );
};

const ShopComponentMemo = memo(ShopComponent);

export { ShopComponentMemo };
