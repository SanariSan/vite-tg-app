import type { FC } from 'react';
import { memo } from 'react';
import { ShopComponentMemo } from 'src/components/pages/shop';

type TShopContainer = {
  [key: string]: unknown;
};

const ShopContainer: FC<TShopContainer> = () => {
  return <ShopComponentMemo />;
};

const ShopContainerMemo = memo(ShopContainer);

export default ShopContainerMemo;
