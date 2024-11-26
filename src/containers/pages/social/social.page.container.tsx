import type { FC } from 'react';
import { memo } from 'react';
import { SocialComponentMemo } from 'src/components/pages/social';

type TSocialContainer = {
  [key: string]: unknown;
};

const SocialContainer: FC<TSocialContainer> = () => {
  return <SocialComponentMemo />;
};

const SocialContainerMemo = memo(SocialContainer);

export default SocialContainerMemo;
